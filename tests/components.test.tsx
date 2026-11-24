import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TonalButton } from "@registry/tonal/button";
import { TonalAccordion } from "@registry/tonal/accordion";
import { TonalDialog } from "@registry/tonal/dialog";
import { TonalInput, TonalSelect } from "@registry/tonal/input";
import { TonalSegmentedControl } from "@registry/tonal/segmented-control";
import { TonalToastProvider, useTonalToast } from "@registry/tonal/toast";
import { TonalCommand } from "@registry/tonal/command";
import { EditorialHero } from "@registry/tonal/blocks/editorial-hero";
import { TonalTable } from "@registry/tonal/blocks/tonal-table";
import { CapabilityTabs } from "@registry/tonal/blocks/capability-tabs";
import { TonalAreaChart } from "@registry/tonal/blocks/tonal-area-chart";
import { PricingGrid } from "@registry/tonal/blocks/pricing-grid";
import { SpecsTable } from "@registry/tonal/blocks/specs-table";

describe("Tonal primitives & blocks", () => {
  it("renders TonalButton and handles clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<TonalButton onClick={onClick}>Ship it</TonalButton>);
    await user.click(screen.getByRole("button", { name: "Ship it" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("toggles TonalAccordion items with aria-expanded", async () => {
    const user = userEvent.setup();
    render(
      <TonalAccordion
        items={[
          { question: "Q1", answer: "A1" },
          { question: "Q2", answer: "A2" },
        ]}
      />
    );
    const q1 = screen.getByRole("button", { name: "Q1" });
    const q2 = screen.getByRole("button", { name: "Q2" });
    expect(q1).toHaveAttribute("aria-expanded", "true");
    expect(q2).toHaveAttribute("aria-expanded", "false");

    await user.click(q2);
    expect(q1).toHaveAttribute("aria-expanded", "false");
    expect(q2).toHaveAttribute("aria-expanded", "true");
  });

  it("opens TonalDialog, prioritizes data-autofocus, stays stable on re-render, and dismisses on Escape", async () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    function Wrapper() {
      const [val, setVal] = React.useState("");
      return (
        <TonalDialog
          open={true}
          onOpenChange={(next) => onOpenChange(next)}
          title="Confirm deploy"
          description="This pushes to edge."
        >
          <input
            aria-label="Release name"
            data-autofocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </TonalDialog>
      );
    }

    render(<Wrapper />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    vi.runAllTimers();
    const input = screen.getByLabelText("Release name");
    expect(document.activeElement).toBe(input);

    fireEvent.change(input, { target: { value: "v0.2" } });
    expect(document.activeElement).toBe(input);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });

  it("links TonalInput & TonalSelect labels and semantic errors", () => {
    render(
      <>
        <TonalInput label="Service name" error="Required field" />
        <TonalSelect
          label="Region"
          options={[
            { value: "us", label: "US" },
            { value: "eu", label: "EU" },
          ]}
        />
      </>
    );
    const input = screen.getByLabelText("Service name");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
    expect(screen.getByLabelText("Region")).toHaveValue("us");
  });

  it("supports keyboard navigation and tab reachability in TonalSegmentedControl", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <TonalSegmentedControl
        defaultValue="7d"
        onValueChange={onChange}
        options={[
          { value: "7d", label: "7D" },
          { value: "30d", label: "30D" },
          { value: "90d", label: "90D" },
        ]}
      />
    );
    const first = screen.getByRole("radio", { name: "7D" });
    first.focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("30d");
    expect(screen.getByRole("radio", { name: "30D" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("displays and dismisses toasts via TonalToastProvider", async () => {
    const user = userEvent.setup();
    function Trigger() {
      const { toast } = useTonalToast();
      return (
        <button
          type="button"
          onClick={() =>
            toast({ title: "Saved tokens", tone: "success", durationMs: 0 })
          }
        >
          Fire toast
        </button>
      );
    }

    render(
      <TonalToastProvider>
        <Trigger />
      </TonalToastProvider>
    );

    await user.click(screen.getByRole("button", { name: "Fire toast" }));
    expect(screen.getByText("Saved tokens")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Dismiss notification" })
    );
    expect(screen.queryByText("Saved tokens")).not.toBeInTheDocument();
  });

  it("filters and runs commands in grouped order in TonalCommand (including interleaved groups)", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onBlockOne = vi.fn();
    const onPrimitive = vi.fn();
    const onBlockTwo = vi.fn();
    render(
      <TonalCommand
        open={true}
        onOpenChange={onOpenChange}
        items={[
          { id: "b1", label: "Editorial Hero", group: "Blocks", onSelect: onBlockOne },
          { id: "p1", label: "Tonal Button", group: "Primitives", onSelect: onPrimitive },
          { id: "b2", label: "Tonal App Shell", group: "Blocks", onSelect: onBlockTwo },
        ]}
      />
    );

    const search = screen.getByPlaceholderText(/Search components/i);
    search.focus();
    // Grouped order is: Editorial Hero (0), Tonal App Shell (1), Tonal Button (2)
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onBlockTwo).toHaveBeenCalledTimes(1);
    expect(onPrimitive).not.toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("updates EditorialHero finish swatch token on click", async () => {
    const user = userEvent.setup();
    render(<EditorialHero />);
    expect(screen.getByText(/--t-surface-warm/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Bay" }));
    expect(screen.getByText(/--t-surface-sky/)).toBeInTheDocument();
  });

  it("filters TonalTable rows and resets empty state", async () => {
    const user = userEvent.setup();
    render(<TonalTable />);
    const input = screen.getByPlaceholderText(/Filter projects/i);
    await user.type(input, "zzzz-nonexistent");
    expect(screen.getByText(/No items match/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getByText("Lumen Storefront Web")).toBeInTheDocument();
  });

  it("switches CapabilityTabs panels, inspects TonalAreaChart, and renders PricingGrid + SpecsTable", async () => {
    const user = userEvent.setup();
    const onSelectTier = vi.fn();
    render(
      <>
        <CapabilityTabs />
        <TonalAreaChart />
        <PricingGrid onSelectTier={onSelectTier} />
        <SpecsTable />
      </>
    );

    await user.click(screen.getByRole("tab", { name: "Code" }));
    expect(screen.getByText(/\.surface-tile/)).toBeInTheDocument();

    const monPoint = screen.getByRole("button", { name: /Mon: 210K requests/ });
    fireEvent.focus(monPoint);
    expect(screen.getByText(/Mon: 210K requests/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Upgrade to Pro" }));
    expect(onSelectTier).toHaveBeenCalledWith(
      expect.objectContaining({ id: "pro" })
    );
    expect(screen.getByText("Compare Lumen 10 models")).toBeInTheDocument();
  });
});

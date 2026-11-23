import { getRegistrySources } from "@/lib/registry-source";
import { ShowcaseClient } from "@/components/showcase-client";

export default function HomePage() {
  const sources = getRegistrySources();

  return <ShowcaseClient sources={sources} />;
}

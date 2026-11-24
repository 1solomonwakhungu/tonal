import { getRegistrySourcesWithHighlight } from "@/lib/registry-source";
import { ShowcaseClient } from "@/components/showcase-client";

export default async function HomePage() {
  const sources = await getRegistrySourcesWithHighlight();

  return <ShowcaseClient sources={sources} />;
}

import type { Block } from "@/lib/types";
import { getHomePageData } from "@/data/loaders";
import { Slider } from "@/components/custom/slider";

function BlockRenderer(block: Block) {
  console.dir(block.__component, { depth: null });
  switch (block.__component) {
    case "blocks.slider":
      return <Slider key={block.id} {...block} />;
    default:
      return null;
  }
}

async function loader() {
  const data = await getHomePageData();
  return { ...data };
}

export default async function HomeRoute() {

  const { data } = await loader();
  if (!data) throw new Error("No data found");

  const blocks = data?.blocks;
  if (!blocks) return null;

  return (
    <div>
      {blocks ? blocks.map((block: any) => BlockRenderer(block)) : null}
    </div>
  );
}

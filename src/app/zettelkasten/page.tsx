import { buildZettelkastenGraph } from "@/lib/zettelkasten";
import Graph from "@/components/ZettelkastenGraph";

export default function Page() {
  const data = buildZettelkastenGraph();

  return (
    <main className="w-full h-[calc(100vh-120px)]">
      <Graph data={data} />
    </main>
  );
}
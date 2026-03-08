import ZettelkastenClient from "@/components/ZettelkastenClient";
import { buildZettelkastenGraph } from "@/lib/zettelkasten";

export default function Page() {
  const data = buildZettelkastenGraph();

  return <ZettelkastenClient data={data} />;
}
import { getNote } from "@/lib/content";
import ModalClient from "./ModalClient";

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const note = getNote(slug);

  return <ModalClient note={note} />;
}
export default function Home() {
  return (
    <div className="content">
      <header className="mb-10">
        <h1 className="font-serif">Nilay Sharan</h1>
        <p className="muted font-sans">
          Notes on systems, technology, and strategy
        </p>
      </header>

      <main className="font-serif">
        <h2>Sample Essay</h2>

        <p>
          Complex systems fail in unexpected ways. Redundancy, feedback loops,
          and distributed control are essential design principles when building
          resilient infrastructure.
        </p>

        <p>
          This page exists only to test the typography and layout of the site.
          You should see a readable column, serif body text, and muted link
          styling. For example, here is a link to{" "}
          <a href="https://en.wikipedia.org/wiki/Distributed_system">
            distributed systems
          </a>.
        </p>

        <h3>Example Code</h3>

        <p>Inline code should look like this: <code>npm run dev</code></p>

        <pre>
{`function replicate(data) {
  if (!network.available()) {
    retry();
  }
  return consensus.commit(data);
}`}
        </pre>

        <h3>Example List</h3>

        <ul className="list-disc ml-6">
          <li>Distributed systems</li>
          <li>Cybersecurity</li>
          <li>Infrastructure resilience</li>
          <li>Decision making under uncertainty</li>
        </ul>

        <h3>Example Quote</h3>

        <blockquote className="border-l-2 pl-4 italic mt-4">
          “A complex system that works is invariably found to have evolved from
          a simple system that worked.”
        </blockquote>

        <p className="muted mt-10 font-sans">March 2026 · 3 min read</p>
      </main>
    </div>
  );
}
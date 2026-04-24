import Link from "next/link";

export default function NotFound() {
  const quickLinks = [
    { label: "home", href: "/" },
    { label: "models", href: "/models" },
    { label: "guides", href: "/guides" },
    { label: "search", href: "/search" },
  ];

  return (
    <section>
      <pre className="agent-only">{`# 404

$ curl -s https://ai-future-ready.com/...
HTTP/1.1 404 Not Found
`}</pre>
      <div className="human-only">
        <h1>404</h1>
      </div>

      <p>page not found. it may have been moved or does not exist.</p>

      <form action="/search" className="search-form">
        <label htmlFor="not-found-search" className="visually-hidden">
          Search all content
        </label>
        <span className="agent-label">grep -i</span>
        <span className="human-label">Search</span>
        <input
          id="not-found-search"
          type="search"
          name="q"
          placeholder="search..."
          className="search-input"
        />
        <button type="submit">[enter]</button>
      </form>

      <p>
        {quickLinks.map((link) => (
          <span key={link.href}>
            [<Link href={link.href}>{link.label}</Link>]{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

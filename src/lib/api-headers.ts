// Shared CORS handling for dynamic /api/v1 routes.
//
// GET responses get Access-Control-Allow-Origin from next.config.ts headers()
// (worker-rendered) and public/_headers (static assets). Route handlers only
// need to answer preflight OPTIONS requests so browser-context agents can
// call POST endpoints and send conditional-request headers.
export function corsPreflightResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, If-None-Match",
      "Access-Control-Max-Age": "86400",
    },
  });
}

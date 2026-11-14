// Serves the OpenAI MCP domain-verification challenge at
// /.well-known/openai-apps-challenge (mapped via vercel.json rewrite).
// Token is read from an env var so it never lives in source control.
const handler = async (request: Request): Promise<Response> => {
  const token = process.env.OPENAI_APPS_CHALLENGE_TOKEN;
  if (!token) {
    return new Response(request.method === "HEAD" ? null : "Not configured", { status: 404 });
  }
  return new Response(request.method === "HEAD" ? null : token, {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};

export { handler as GET, handler as POST, handler as HEAD };

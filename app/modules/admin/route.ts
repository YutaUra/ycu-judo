import type { HeadersFunction } from "@remix-run/cloudflare";

export const headers: HeadersFunction = () => ({
  "WWW-Authenticate": "Basic",
});

export const isAuthorized = async (request: Request) => {
  const header = request.headers.get("Authorization");

  if (!header) return false;

  try {
    const base64 = header.replace("Basic ", "");
    const [username, password] = atob(base64).split(":");

    return (
      username === "admin" && password === "z-y6v-iuY4q.cB9rxn2bw2iQ-*4yAB-2"
    );
  } catch {
    return false;
  }
};

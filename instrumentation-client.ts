import { initBotId } from "botid/client/core";

// Define the paths that need bot protection.
// These are paths that are routed to by your app.
// These can be:
// - API endpoints (e.g., '/api/checkout')
// - Server actions invoked from a page (e.g., '/dashboard')
// - Dynamic routes (e.g., '/api/create/*')

initBotId({
  protect: [
    {
      path: "/branding",
      method: "POST",
    },
    {
      path: "/labs",
      method: "POST",
    },
    {
      path: "/tlm",
      method: "POST",
    },
    {
      path: "/contact",
      method: "POST",
    },
  ],
});

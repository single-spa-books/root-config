import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa-books/navbar",
  app: () => System.import("@single-spa-books/navbar"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});

import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa-books/navbar",
  app: () => System.import("@single-spa-books/navbar"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@single-spa-books/home",
  app: () => System.import("@single-spa-books/home"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});

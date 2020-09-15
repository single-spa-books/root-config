import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa-books/navbar",
  app: () => System.import("@single-spa-books/navbar"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@single-spa-books/home",
  app: () => System.import("@single-spa-books/home"),
  activeWhen: ({ pathname }) => pathname === "/",
});

registerApplication({
  name: "@single-spa-books/books",
  app: () => System.import("@single-spa-books/books"),
  activeWhen: ["/books"],
});

start({
  urlRerouteOnly: true,
});

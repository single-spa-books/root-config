import { registerApplication, start } from "single-spa";
import { createRoutes } from "./routes";
import Loading from "./loading";

const loadingEl = document.getElementById("application-loading");

const loading = (
  fn,
  props = {
    text: "Loading module",
    classNames: "loading-module",
  }
) => {
  return (args) => {
    const { mountParcel } = args;

    const loadingParcel = mountParcel(new Loading(), {
      domElement: loadingEl,
      props,
    });
    const response = fn(args);

    return new Promise((resolve) => {
      setTimeout(async () => {
        loadingParcel.unmount();
        resolve(await response);
      }, 1000);
    });
  };
};

const exactPath = (path) => ({ pathname }) => pathname === path;
const registerApplications = (routes) => routes.forEach(registerApplication);

registerApplication({
  name: "@single-spa-books/navbar",
  app: loading(
    async () => {
      const navbar = await System.import("@single-spa-books/navbar");

      const routes = createRoutes({
        exactPath,
        loading,
      });

      registerApplications(routes);

      return navbar;
    },
    {
      text: "Loading application",
      classNames: "loading-application",
    }
  ),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});

export function createRoutes({ loading, exactPath }) {
  return [
    {
      name: "@single-spa-books/home",
      app: loading(() => System.import("@single-spa-books/home")),
      activeWhen: exactPath("/"),
    },

    {
      name: "@single-spa-books/books",
      app: loading(() => System.import("@single-spa-books/books")),
      activeWhen: ["/books"],
    },
  ];
}

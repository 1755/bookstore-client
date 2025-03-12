import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main.tsx", [
    route("authors", "routes/authors.tsx", [
      index("routes/authors/home.tsx"),
      route("new", "routes/authors/new.tsx"),
      route(":id/edit", "routes/authors/edit.tsx"),
      route(":id/delete", "routes/authors/delete.tsx"),
    ]),
    route("books", "routes/books.tsx", [
      index("routes/books/home.tsx"),
      route("new", "routes/books/new.tsx"),
      route(":id/edit", "routes/books/edit.tsx"),
      route(":id/delete", "routes/books/delete.tsx"),
    ]),
  ]),
] satisfies RouteConfig;

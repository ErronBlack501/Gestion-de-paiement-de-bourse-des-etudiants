import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/register": {};
  "/login": {};
  "/admin": {};
  "/admin/latecomers": {};
  "/admin/payments": {};
  "/admin/students": {};
  "/admin/amounts": {};
};
import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;

/* import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/welcome.tsx"),
  layout("routes/auth/route.tsx", [
    route("login", "routes/auth/route.tsx"),
    route("register", "routes/auth/route.tsx"),
  ]),
  ...prefix("admin", [
    layout("routes/admin/route.tsx", [
      index("routes/admin/route.tsx"),
      route("profile", "routes/admin/admin.profile.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
 */

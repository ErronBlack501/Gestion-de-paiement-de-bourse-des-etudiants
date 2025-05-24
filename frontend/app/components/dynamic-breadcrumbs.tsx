import { useMatches, Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "~/components/ui/breadcrumb";

interface BreadcrumbMatch {
  pathname: string;
  handle?: {
    breadcrumb?: string | ((match: BreadcrumbMatch) => string);
  };
  [key: string]: any;
}

export function DynamicBreadcrumbs() {
  const matches = useMatches() as BreadcrumbMatch[];
  // Filter out routes that shouldn't be shown in breadcrumbs (e.g., layout routes)
  const crumbs = matches.filter(
    (match) => match.handle?.breadcrumb || match.pathname !== "/",
  );

  // Show: first, ellipsis (if >4), before-last, last
  const maxItems = 4;
  let itemsToShow: any[] = crumbs;
  let useEllipsis = false;
  let ellipsisTarget: string | undefined = undefined;

  if (crumbs.length > maxItems) {
    useEllipsis = true;
    // The ellipsis should link to the parent of the last two crumbs
    ellipsisTarget = crumbs[crumbs.length - 3]?.pathname;
    itemsToShow = [
      crumbs[0],
      { ellipsis: true, target: ellipsisTarget },
      ...crumbs.slice(-2),
    ];
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {itemsToShow.map((match, idx) => {
          if ((match as any).ellipsis) {
            // Ellipsis links to the parent route
            return (
              <BreadcrumbItem key="ellipsis">
                <BreadcrumbLink asChild>
                  <Link to={(match as any).target || "/"}>
                    <BreadcrumbEllipsis />
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            );
          }
          const handle = (match as BreadcrumbMatch).handle;
          const isLast = idx === itemsToShow.length - 1;
          const label =
            typeof handle?.breadcrumb === "function"
              ? handle.breadcrumb(match)
              : handle?.breadcrumb || match.pathname.replace("/", "");
          return (
            <BreadcrumbItem key={match.pathname}>
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={match.pathname}>{label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

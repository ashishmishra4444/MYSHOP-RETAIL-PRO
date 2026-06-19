import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ToolbarProvider } from "./erp-context-CK6VWqph.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C9-iCxsq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CH3GXkh7.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "MyShop Retail Pro" },
			{
				name: "description",
				content: "Retail Billing & Inventory Management Software"
			},
			{
				name: "author",
				content: "MyShop"
			},
			{
				property: "og:title",
				content: "MyShop Retail Pro"
			},
			{
				property: "og:description",
				content: "Retail Billing & Inventory Management Software"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$15 = () => import("./udhar-DlfAtj7K.mjs");
var Route$15 = createFileRoute("/udhar")({
	head: () => ({ meta: [{ title: "Udhar Khata — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./suppliers-BjBrryNE.mjs");
var Route$14 = createFileRoute("/suppliers")({
	head: () => ({ meta: [{ title: "Supplier Ledger — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./sales-invoice-BFyrgsxU.mjs");
var Route$13 = createFileRoute("/sales-invoice")({
	head: () => ({ meta: [{ title: "Sales Invoice — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./reports-ywP-dwRQ.mjs");
var Route$12 = createFileRoute("/reports")({
	head: () => ({ meta: [{ title: "Reports — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./purchase-GH5sLG32.mjs");
var Route$11 = createFileRoute("/purchase")({
	head: () => ({ meta: [{ title: "Purchase Entry — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./products-BinV1Vh1.mjs");
var Route$10 = createFileRoute("/products")({
	head: () => ({ meta: [{ title: "Product Master — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./pos-Dvt05wke.mjs");
var Route$9 = createFileRoute("/pos")({
	head: () => ({ meta: [{ title: "POS Billing — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./notifications-BZh6G5BZ.mjs");
var Route$8 = createFileRoute("/notifications")({
	head: () => ({ meta: [{ title: "Notification Center — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./login-BFRYJctQ.mjs");
var Route$7 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./inventory-CD_Lbwag.mjs");
var Route$6 = createFileRoute("/inventory")({
	head: () => ({ meta: [{ title: "Inventory — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./festival-calendar-CzYbKln2.mjs");
var Route$5 = createFileRoute("/festival-calendar")({
	head: () => ({ meta: [{ title: "Festival Calendar — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./expenses-WpJ7ixeT.mjs");
var Route$4 = createFileRoute("/expenses")({
	head: () => ({ meta: [{ title: "Expenses — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./customers-DAJpeedC.mjs");
var Route$3 = createFileRoute("/customers")({
	head: () => ({ meta: [{ title: "Customer Master — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./cashbook-DlXQxPbh.mjs");
var Route$2 = createFileRoute("/cashbook")({
	head: () => ({ meta: [{ title: "Daily Cash Book — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./campaigns-CrhgwTRv.mjs");
var Route$1 = createFileRoute("/campaigns")({
	head: () => ({ meta: [{ title: "Campaign Manager — MyShop Retail Pro" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-Benkb2l1.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Dashboard — MyShop Retail Pro" }, {
		name: "description",
		content: "Business summary, sales, purchases and profit overview."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var UdharRoute = Route$15.update({
	id: "/udhar",
	path: "/udhar",
	getParentRoute: () => Route$16
});
var SuppliersRoute = Route$14.update({
	id: "/suppliers",
	path: "/suppliers",
	getParentRoute: () => Route$16
});
var SalesInvoiceRoute = Route$13.update({
	id: "/sales-invoice",
	path: "/sales-invoice",
	getParentRoute: () => Route$16
});
var ReportsRoute = Route$12.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => Route$16
});
var PurchaseRoute = Route$11.update({
	id: "/purchase",
	path: "/purchase",
	getParentRoute: () => Route$16
});
var ProductsRoute = Route$10.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => Route$16
});
var PosRoute = Route$9.update({
	id: "/pos",
	path: "/pos",
	getParentRoute: () => Route$16
});
var NotificationsRoute = Route$8.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => Route$16
});
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$16
});
var InventoryRoute = Route$6.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => Route$16
});
var FestivalCalendarRoute = Route$5.update({
	id: "/festival-calendar",
	path: "/festival-calendar",
	getParentRoute: () => Route$16
});
var ExpensesRoute = Route$4.update({
	id: "/expenses",
	path: "/expenses",
	getParentRoute: () => Route$16
});
var CustomersRoute = Route$3.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => Route$16
});
var CashbookRoute = Route$2.update({
	id: "/cashbook",
	path: "/cashbook",
	getParentRoute: () => Route$16
});
var CampaignsRoute = Route$1.update({
	id: "/campaigns",
	path: "/campaigns",
	getParentRoute: () => Route$16
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$16
	}),
	CampaignsRoute,
	CashbookRoute,
	CustomersRoute,
	ExpensesRoute,
	FestivalCalendarRoute,
	InventoryRoute,
	LoginRoute,
	NotificationsRoute,
	PosRoute,
	ProductsRoute,
	PurchaseRoute,
	ReportsRoute,
	SalesInvoiceRoute,
	SuppliersRoute,
	UdharRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

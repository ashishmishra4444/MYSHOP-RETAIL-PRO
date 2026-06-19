import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { G as Calculator, I as FileChartColumnIncreasing, N as FileText, P as FileSpreadsheet, a as Truck, n as Wallet, o as TrendingUp, q as Boxes, r as Users, v as Receipt } from "../_libs/lucide-react.mjs";
import { i as Panel, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-ywP-dwRQ.js
var import_jsx_runtime = require_jsx_runtime();
var REPORTS = [
	{
		icon: TrendingUp,
		label: "Sales Report",
		desc: "Daily / monthly sales analysis"
	},
	{
		icon: Truck,
		label: "Purchase Report",
		desc: "Vendor-wise purchase summary"
	},
	{
		icon: Receipt,
		label: "GST Report",
		desc: "GSTR-1, GSTR-3B, HSN summary"
	},
	{
		icon: Calculator,
		label: "Profit & Loss",
		desc: "Period P&L statement"
	},
	{
		icon: Boxes,
		label: "Stock Report",
		desc: "Stock movement & valuation"
	},
	{
		icon: Users,
		label: "Customer Ledger",
		desc: "Customer-wise account statement"
	},
	{
		icon: Truck,
		label: "Supplier Report",
		desc: "Supplier outstanding & payments"
	},
	{
		icon: Wallet,
		label: "Expense Report",
		desc: "Expense category analysis"
	},
	{
		icon: FileChartColumnIncreasing,
		label: "Day Book",
		desc: "Complete day transactions"
	},
	{
		icon: FileText,
		label: "Trial Balance",
		desc: "Ledger balances summary"
	},
	{
		icon: FileSpreadsheet,
		label: "Balance Sheet",
		desc: "Assets and liabilities"
	},
	{
		icon: FileChartColumnIncreasing,
		label: "Cash Flow",
		desc: "Operating cash flow statement"
	}
];
function Reports() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "Sales"
			},
			{
				key: "F3",
				label: "Purchase"
			},
			{
				key: "F4",
				label: "Stock"
			},
			{
				key: "F5",
				label: "GST"
			},
			{
				key: "F6",
				label: "P&L"
			},
			{
				key: "F7",
				label: "Customer"
			},
			{
				key: "F8",
				label: "Supplier"
			},
			{
				key: "F9",
				label: "Expense"
			},
			{
				key: "F10",
				label: "Print"
			},
			{
				key: "F11",
				label: "Export"
			},
			{
				key: "F12",
				label: "Close"
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Reports Centre",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-3",
				children: REPORTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "erp-panel flex items-start gap-3 p-3 text-left hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-sm bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-primary",
						children: r.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[12px] text-muted-foreground",
						children: r.desc
					})] })]
				}, r.label))
			})
		})
	});
}
//#endregion
export { Reports as component };

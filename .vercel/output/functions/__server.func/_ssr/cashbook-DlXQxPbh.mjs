import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as Panel, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { n as CASH_BOOK, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cashbook-DlXQxPbh.js
var import_jsx_runtime = require_jsx_runtime();
function CashBook() {
	const inflow = CASH_BOOK.reduce((a, c) => a + c.inflow, 0);
	const outflow = CASH_BOOK.reduce((a, c) => a + c.outflow, 0);
	const closing = inflow - outflow;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "Cash In",
				tone: "primary"
			},
			{
				key: "F3",
				label: "Cash Out",
				tone: "danger"
			},
			{
				key: "F4",
				label: "Adjust"
			},
			{
				key: "F5",
				label: "Print"
			},
			{
				key: "F6",
				label: "Export"
			},
			{
				key: "F7",
				label: "Filter"
			},
			{
				key: "F8",
				label: "Bank Book"
			},
			{
				key: "F9",
				label: "Reconcile"
			},
			{
				key: "F10",
				label: "Report"
			},
			{
				key: "F11",
				label: "Refresh"
			},
			{
				key: "F12",
				label: "Close"
			}
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-2 text-[12.5px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Date" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "erp-input w-32",
						defaultValue: "17/06/2024"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Counter" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "erp-input w-32",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "POS-01" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cashier" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "erp-input w-32",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ADMIN" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-4 gap-2 mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Opening Balance",
						value: `₹ ${fmt(5e3)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total Cash In",
						value: `₹ ${fmt(inflow)}`,
						tone: "text-[color:var(--color-success)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total Cash Out",
						value: `₹ ${fmt(outflow)}`,
						tone: "text-destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Closing Balance",
						value: `₹ ${fmt(closing)}`,
						tone: "text-primary"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Cash Book — Day Transactions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "erp-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th w-10",
							children: "S.No"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Time"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Particulars"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Cash In (₹)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Cash Out (₹)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Balance"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [(() => {
						let bal = 0;
						return CASH_BOOK.map((c, i) => {
							bal += c.inflow - c.outflow;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-center",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td",
										children: c.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td",
										children: c.type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td",
										children: c.particulars
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right text-[color:var(--color-success)]",
										children: c.inflow ? fmt(c.inflow) : "0.00"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right text-destructive",
										children: c.outflow ? fmt(c.outflow) : "0.00"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right font-semibold",
										children: fmt(bal)
									})
								]
							}, i);
						});
					})(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "bg-secondary font-bold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								colSpan: 4,
								children: "Day Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-right",
								children: fmt(inflow)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-right",
								children: fmt(outflow)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-right text-primary",
								children: fmt(closing)
							})
						]
					})] })]
				})
			})
		]
	});
}
function Stat({ label, value, tone = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "erp-panel px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[12px] text-primary",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `text-lg font-bold ${tone}`,
			children: value
		})]
	});
}
//#endregion
export { CashBook as component };

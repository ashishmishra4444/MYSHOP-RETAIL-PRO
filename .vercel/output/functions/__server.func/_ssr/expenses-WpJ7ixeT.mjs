import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as Select, i as Panel, n as Field, r as Input, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { i as EXPENSES, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/expenses-WpJ7ixeT.js
var import_jsx_runtime = require_jsx_runtime();
function Expenses() {
	const total = EXPENSES.reduce((a, e) => a + e.amount, 0);
	const byCat = Object.entries(EXPENSES.reduce((m, e) => ({
		...m,
		[e.category]: (m[e.category] || 0) + e.amount
	}), {}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "New",
				tone: "primary"
			},
			{
				key: "F3",
				label: "Edit"
			},
			{
				key: "F4",
				label: "Delete",
				tone: "danger"
			},
			{
				key: "F5",
				label: "Save"
			},
			{
				key: "F6",
				label: "Print"
			},
			{
				key: "F7",
				label: "Export"
			},
			{
				key: "F8",
				label: "Filter"
			},
			{
				key: "F9",
				label: "Report"
			},
			{
				key: "F10",
				label: "Category"
			},
			{
				key: "F11",
				label: "Summary"
			},
			{
				key: "F12",
				label: "Close"
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_360px] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Expense Entries",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "erp-input w-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Categories" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "erp-input w-32",
							defaultValue: "01/06/2024"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "self-center text-[12.5px]",
							children: "to"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "erp-input w-32",
							defaultValue: "17/06/2024"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-sm bg-primary px-3 text-primary-foreground text-[12.5px]",
							children: "Search"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "erp-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th w-10",
							children: "S.No"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Category"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Notes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Amount"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [EXPENSES.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-center",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: e.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: e.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: e.notes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-right",
								children: fmt(e.amount)
							})
						]
					}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "bg-secondary font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "erp-grid-td",
							colSpan: 4,
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "erp-grid-td text-right text-destructive",
							children: fmt(total)
						})]
					})] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Add Expense",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "17/06/2024" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Rent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Electricity" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Staff Salary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Transport" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Internet" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Maintenance" })
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Amount",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "text-right",
									defaultValue: "0.00"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Payment Mode",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cash" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Bank" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "UPI" })
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Notes",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "mt-2 w-full rounded-sm bg-primary py-2 text-primary-foreground font-semibold",
								children: "Save Expense"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Monthly Summary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-[12.5px]",
						children: [byCat.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fmt(v) })]
						}, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-t border-border pt-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Expenses" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-destructive",
								children: fmt(total)
							})]
						})]
					})
				})]
			})]
		})
	});
}
//#endregion
export { Expenses as component };

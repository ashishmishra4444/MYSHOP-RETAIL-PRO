import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { E as MessageCircle, J as Bell } from "../_libs/lucide-react.mjs";
import { i as Panel, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { a as LEDGER, r as CUSTOMERS, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/udhar-DlfAtj7K.js
var import_jsx_runtime = require_jsx_runtime();
function Udhar() {
	const c = CUSTOMERS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "Refresh"
			},
			{
				key: "F3",
				label: "Search"
			},
			{
				key: "F4",
				label: "Receipt",
				tone: "primary"
			},
			{
				key: "F5",
				label: "Payment"
			},
			{
				key: "F6",
				label: "Adjust"
			},
			{
				key: "F7",
				label: "Statement"
			},
			{
				key: "F8",
				label: "Export"
			},
			{
				key: "F9",
				label: "E-Mail"
			},
			{
				key: "F10",
				label: "SMS"
			},
			{
				key: "F11",
				label: "Notes"
			},
			{
				key: "F12",
				label: "Close"
			}
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Select Customer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[2fr_1fr_1fr] gap-3 text-[12.5px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								c.code,
								" — ",
								c.name
							] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted-foreground",
								children: [c.city, ", Madhya Pradesh - 452001"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground",
								children: c.mobile
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Opening Balance",
								v: `${fmt(c.opening)} Dr`,
								tone: "text-destructive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Credit Limit",
								v: fmt(c.limit)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Current Balance",
								v: `${fmt(12750)} Dr`,
								tone: "text-destructive font-bold"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Credit Days",
								v: "30"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Price Level",
								v: "LEVEL 1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Salesman",
								v: "AMIT"
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-[1fr_320px] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Ledger Details",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex flex-wrap items-center gap-2 text-[12.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Date From" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "erp-input w-32",
								defaultValue: "01/05/2024"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "To" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "erp-input w-32",
								defaultValue: "17/06/2024"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Voucher Type" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "erp-input w-32",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-sm bg-primary px-3 py-1 text-primary-foreground",
								children: "Search (F3)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-3 py-1 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5" }), " WhatsApp Reminder"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center gap-1 rounded-sm border border-border bg-white px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-3.5 w-3.5" }), " Reminder Status"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "erp-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Voucher No"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Ref / Narration"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "Debit (₹)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "Credit (₹)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "Balance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Bal Type"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: LEDGER.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: l.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: l.voucher
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: l.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: l.narration
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-right",
									children: l.debit ? fmt(l.debit) : "0.00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-right text-[color:var(--color-success)]",
									children: l.credit ? fmt(l.credit) : "0.00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "erp-grid-td text-right text-destructive",
									children: [fmt(l.balance), " Dr"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-destructive",
									children: "Dr"
								})
							]
						}, i)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-5 gap-2 text-[12.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Opening Balance",
								value: `${fmt(12750)} Dr`,
								tone: "text-destructive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Total Debit",
								value: fmt(51130)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Total Credit",
								value: fmt(38380),
								tone: "text-[color:var(--color-success)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Adjustments",
								value: "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Current Balance",
								value: `${fmt(12750)} Dr`,
								tone: "text-destructive"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Aging Analysis (17/06/2024)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-[12.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Current (0-30 Days)",
								v: fmt(12750)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "1 - 30 Days",
								v: "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "31 - 60 Days",
								v: "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "61 - 90 Days",
								v: "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Above 90 Days",
								v: "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fmt(12750) })]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Last 5 Receipts",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "erp-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Receipt No"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "Amount"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
							[
								"05/06/2024",
								"RCPT/68",
								1840
							],
							[
								"25/05/2024",
								"RCPT/60",
								6e3
							],
							[
								"15/05/2024",
								"RCPT/52",
								3670
							],
							[
								"07/05/2024",
								"RCPT/45",
								5e3
							],
							[
								"26/04/2024",
								"RCPT/33",
								8870
							]
						].map(([d, n, a], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: d
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-right",
								children: fmt(a)
							})
						] }, i)) })]
					})
				})]
			})]
		})]
	});
}
function Row({ k, v, tone = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: tone,
			children: v
		})]
	});
}
function Stat({ label, value, tone = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "erp-panel px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11.5px] text-primary",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `text-[13px] font-bold ${tone}`,
			children: value
		})]
	});
}
//#endregion
export { Udhar as component };

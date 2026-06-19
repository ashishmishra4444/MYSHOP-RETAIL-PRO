import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as Panel, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { c as SUPPLIERS, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suppliers-BjBrryNE.js
var import_jsx_runtime = require_jsx_runtime();
var ROWS = [
	[
		"02/05/2024",
		"PUR/145/24-25",
		"Purchase Invoice",
		"Purchase of Grocery Items",
		18860,
		0,
		18860
	],
	[
		"06/05/2024",
		"PUR/152/24-25",
		"Purchase Invoice",
		"Purchase of Daily Items",
		12450,
		0,
		31310
	],
	[
		"10/05/2024",
		"PAY/48/24-25",
		"Payment",
		"Payment By Cheque No. 125632",
		0,
		1e4,
		21310
	],
	[
		"15/05/2024",
		"PUR/168/24-25",
		"Purchase Invoice",
		"Purchase of Beverages",
		9750,
		0,
		31060
	],
	[
		"20/05/2024",
		"PAY/55/24-25",
		"Payment",
		"Payment By UPI",
		0,
		5e3,
		26060
	],
	[
		"25/05/2024",
		"PUR/181/24-25",
		"Purchase Invoice",
		"Purchase of Grocery Items",
		16300,
		0,
		42360
	],
	[
		"31/05/2024",
		"PAY/63/24-25",
		"Payment",
		"Payment By Cheque No. 125899",
		0,
		15e3,
		27360
	],
	[
		"05/06/2024",
		"PUR/195/24-25",
		"Purchase Invoice",
		"Purchase of Household Items",
		13660,
		0,
		41020
	],
	[
		"10/06/2024",
		"PAY/72/24-25",
		"Payment",
		"Payment By UPI",
		0,
		12e3,
		29020
	],
	[
		"14/06/2024",
		"PUR/205/24-25",
		"Purchase Invoice",
		"Purchase of Grocery Items",
		9750,
		0,
		38770
	],
	[
		"17/06/2024",
		"PUR/210/24-25",
		"Purchase Invoice",
		"Purchase of Snacks",
		0,
		19910,
		18860
	]
];
function Suppliers() {
	const s = SUPPLIERS[0];
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
				label: "Payment",
				tone: "primary"
			},
			{
				key: "F5",
				label: "Adjust"
			},
			{
				key: "F6",
				label: "Statement"
			},
			{
				key: "F7",
				label: "Export"
			},
			{
				key: "F8",
				label: "Print"
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
			title: "Select Supplier",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 text-[12.5px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
							s.code,
							" — ",
							s.name
						] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: "21, Laxmi Market, Navlakha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: "Indore, MP - 452001"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Opening Balance",
								v: `${fmt(s.balance)} Dr`,
								tone: "text-destructive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Credit Limit",
								v: "1,00,000.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Current Balance",
								v: `${fmt(s.balance)} Dr`,
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
								v: "RAHUL"
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-[1fr_320px] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Ledger Details",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
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
							children: "Narration"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Debit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Credit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Balance"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ROWS.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: r[0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: r[1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: r[2]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: r[3]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-right",
								children: r[4] ? fmt(r[4]) : "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-right text-[color:var(--color-success)]",
								children: r[5] ? fmt(r[5]) : "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "erp-grid-td text-right text-destructive",
								children: [fmt(r[6]), " Dr"]
							})
						]
					}, i)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-5 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Opening Balance",
							value: `${fmt(s.balance)} Dr`,
							tone: "text-destructive"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Total Purchases",
							value: fmt(98350)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Total Payments",
							value: fmt(79490),
							tone: "text-[color:var(--color-success)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Adjustments",
							value: "0.00"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Current Balance",
							value: `${fmt(s.balance)} Dr`,
							tone: "text-destructive"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Aging Analysis",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-[12.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Current (0-30)",
								v: fmt(s.balance)
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fmt(s.balance) })]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Last 5 Purchases",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "erp-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Invoice"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "Amount"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
							[
								"17/06/2024",
								"PUR/210",
								19910
							],
							[
								"14/06/2024",
								"PUR/205",
								9750
							],
							[
								"05/06/2024",
								"PUR/195",
								13660
							],
							[
								"25/05/2024",
								"PUR/181",
								16300
							],
							[
								"15/05/2024",
								"PUR/168",
								9750
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
export { Suppliers as component };

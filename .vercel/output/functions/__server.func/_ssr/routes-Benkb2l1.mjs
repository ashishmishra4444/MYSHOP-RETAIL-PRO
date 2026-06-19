import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { R as CreditCard, _ as ReceiptText, o as TrendingUp, u as ShoppingBag } from "../_libs/lucide-react.mjs";
import { i as Panel, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { c as SUPPLIERS, l as TOP_SELLING, r as CUSTOMERS, s as SALES_TREND, u as fmt } from "./sample-data-ObAshtgu.mjs";
import { r as FESTIVALS, t as CAMPAIGNS } from "./marketing-store-Durlknjf.mjs";
import { a as Line, c as Cell, i as XAxis, l as ResponsiveContainer, n as LineChart, o as CartesianGrid, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Benkb2l1.js
var import_jsx_runtime = require_jsx_runtime();
function Kpi({ icon: Icon, label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "erp-panel flex items-center gap-3 px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-10 w-10 place-items-center rounded-sm ${tone}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-white" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[12px] text-primary font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-lg font-bold text-foreground",
			children: value
		})] })]
	});
}
function Mini({ label, value, tone = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "erp-panel px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[12px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `text-lg font-bold ${tone}`,
			children: value
		})]
	});
}
function Dashboard() {
	const profit = [{
		name: "Gross",
		value: 27080,
		c: "var(--color-chart-2)"
	}, {
		name: "Exp",
		value: 9650,
		c: "var(--color-destructive)"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "Sales Summary"
			},
			{
				key: "F3",
				label: "Purchase Summary"
			},
			{
				key: "F4",
				label: "Stock Summary"
			},
			{
				key: "F5",
				label: "Receivable"
			},
			{
				key: "F6",
				label: "Payable"
			},
			{
				key: "F7",
				label: "Cash/Bank"
			},
			{
				key: "F8",
				label: "Day Book"
			},
			{
				key: "F9",
				label: "Trial Balance"
			},
			{
				key: "F10",
				label: "Profit & Loss"
			},
			{
				key: "F11",
				label: "Balance Sheet"
			},
			{
				key: "F12",
				label: "Refresh",
				tone: "primary"
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Dashboard / Business Summary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[220px_1fr] gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "erp-panel p-3 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[12px] font-semibold text-primary",
								children: "Date Filter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-[12px]",
								children: ["From Date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "erp-input mt-1 w-full",
									defaultValue: "01/06/2024"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-[12px]",
								children: ["To Date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "erp-input mt-1 w-full",
									defaultValue: "17/06/2024"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "mt-2 w-full rounded-sm bg-primary py-1.5 text-primary-foreground text-[12.5px] hover:bg-primary/90",
								children: "↻ Refresh"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								icon: TrendingUp,
								label: "Sales (This Month)",
								value: `₹ ${fmt(125430)}`,
								tone: "bg-[color:var(--color-chart-1)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								icon: ShoppingBag,
								label: "Purchase (This Month)",
								value: `₹ ${fmt(98350)}`,
								tone: "bg-[color:var(--color-chart-2)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								icon: ReceiptText,
								label: "Receipt (This Month)",
								value: `₹ ${fmt(13e4)}`,
								tone: "bg-[color:var(--color-chart-3)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								icon: CreditCard,
								label: "Payment (This Month)",
								value: `₹ ${fmt(92650)}`,
								tone: "bg-[color:var(--color-chart-4)]"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-7 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Total Items",
							value: "1,256"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Low Stock",
							value: "15",
							tone: "text-[color:var(--color-warning)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Out of Stock",
							value: "7",
							tone: "text-destructive"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Customers",
							value: "320"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Suppliers",
							value: "125"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Invoices (Mo)",
							value: "285"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Quotations (Mo)",
							value: "12"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "erp-panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary",
								children: "Sales Trend (This Month)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-56 p-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
										data: SALES_TREND,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "oklch(0.92 0.005 250)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "d",
												fontSize: 11
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { fontSize: 11 }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												type: "monotone",
												dataKey: "v",
												stroke: "var(--color-primary)",
												strokeWidth: 2,
												dot: { r: 3 }
											})
										]
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "erp-panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary",
								children: "Top 5 Selling Items"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "erp-grid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th w-8",
										children: "S.No"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th",
										children: "Item Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th text-right",
										children: "Qty"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th text-right",
										children: "Amount"
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [TOP_SELLING.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-center",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td",
										children: t.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "erp-grid-td text-right",
										children: [t.qty, ".000"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right",
										children: fmt(t.amount)
									})
								] }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-secondary font-semibold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											colSpan: 2,
											children: "Total"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: "585.000"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(52485)
										})
									]
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "erp-panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary",
								children: "Business Profit (This Month)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 items-center p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-44",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
											data: profit,
											dataKey: "value",
											innerRadius: 45,
											outerRadius: 70,
											children: profit.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: p.c }, i))
										}) })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 text-[12.5px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 bg-[color:var(--color-chart-2)]" }), " Gross Profit"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pl-5 font-bold",
											children: [
												"₹ ",
												fmt(27080),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "21.65%"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 bg-destructive" }), " Expenses"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pl-5 font-bold",
											children: [
												"₹ ",
												fmt(9650),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "7.73%"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 border-t border-border pt-1.5 text-primary",
											children: "Net Profit"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pl-0 text-base font-bold text-primary",
											children: [
												"₹ ",
												fmt(17430),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground text-xs",
													children: "13.92%"
												})
											]
										})
									]
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "erp-panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary",
								children: "Payment Due (Customers)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "erp-grid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th w-8",
										children: "S.No"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th",
										children: "Customer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th text-right",
										children: "Balance"
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [CUSTOMERS.slice(0, 5).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-center",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right",
										children: fmt(c.opening)
									})
								] }, c.code)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-secondary font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td",
										colSpan: 2,
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right text-destructive",
										children: fmt(37860)
									})]
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "erp-panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary",
								children: "Purchase Due (Suppliers)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "erp-grid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th w-8",
										children: "S.No"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th",
										children: "Supplier"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "erp-grid-th text-right",
										children: "Balance"
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [SUPPLIERS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-center",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td",
										children: s.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right",
										children: fmt(s.balance)
									})
								] }, s.code)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-secondary font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td",
										colSpan: 2,
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right text-destructive",
										children: fmt(53270)
									})]
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "erp-panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary",
								children: "Stock Value Summary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 p-4 text-[13px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Stock Value (Cost)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["₹ ", fmt(1265430)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Stock Value (MRP)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["₹ ", fmt(1875680)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Stock Value (Sales)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["₹ ", fmt(1642350)] })]
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-[1fr_400px] gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "erp-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary",
							children: "Active Promotional Campaigns & Broadcast Logs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "erp-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Campaign Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Offer Detail"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Target"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-center",
									children: "Status"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: CAMPAIGNS.slice(0, 4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td font-semibold",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: c.offerTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-indigo-700 font-semibold",
									children: c.targetAudience
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-2 py-0.5 rounded-sm text-[10px] font-bold ${c.status === "Active" ? "bg-[color:var(--color-success)] text-white" : c.status === "Scheduled" ? "bg-blue-600 text-white" : "bg-slate-500 text-white"}`,
										children: c.status
									})
								})
							] }, c.id)) })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "erp-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary",
							children: "Upcoming Festival Countdown"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "erp-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Festival"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-center",
									children: "Countdown"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: FESTIVALS.filter((f) => f.daysRemaining >= 0).slice(0, 4).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td font-semibold",
									children: f.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td font-mono",
									children: f.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "erp-grid-td text-center font-bold text-[#0047BA]",
									children: [f.daysRemaining, " Days"]
								})
							] }, f.id)) })]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { Dashboard as component };

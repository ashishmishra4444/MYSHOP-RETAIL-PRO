import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as X, x as Plus } from "../_libs/lucide-react.mjs";
import { a as Select, i as Panel, n as Field, r as Input, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { o as PRODUCTS, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales-invoice-BFyrgsxU.js
var import_jsx_runtime = require_jsx_runtime();
function SalesInvoice() {
	const items = PRODUCTS.slice(0, 5).map((p, i) => ({
		...p,
		qty: [
			5,
			3,
			2,
			2,
			4
		][i]
	}));
	items.reduce((a, it) => a + it.rate * it.qty, 0);
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
				label: "Email"
			},
			{
				key: "F8",
				label: "Payment"
			},
			{
				key: "F9",
				label: "Receipt"
			},
			{
				key: "F10",
				label: "PDF Export"
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_320px] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Invoice Details",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-x-6 gap-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Invoice No",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "INV/125/24-25" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Bill To",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "CUST001 — RAHUL KUMAR" }) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Invoice Date",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "17/06/2024" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Price Level",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "LEVEL 1" }) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Due Date",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "17/06/2024" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Payment Terms",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "15 Days" }) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Salesman",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "AMIT" }) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Credit Days",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "15" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Reference",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "Walk-in Customer" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Currency",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "INR" }) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Remarks",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "Thank you for your business." })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Delivery Note",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "DN/125/24-25" })
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Invoice Items",
						right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-2 py-1 text-white text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "Add"]
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "erp-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th w-10",
									children: "S.No"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Item Code"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Item Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "HSN"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Unit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-right",
									children: "Qty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-right",
									children: "Rate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-right",
									children: "Taxable"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-right",
									children: "CGST"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-right",
									children: "SGST"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-right",
									children: "Total"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "erp-grid-th w-6" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((it, i) => {
								const tax = it.rate * it.qty;
								const c = tax * it.gst / 2 / 100;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-center",
											children: i + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: it.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: it.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: it.hsn
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: it.unit
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: it.qty.toFixed(3)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(it.rate)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(tax)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(c)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(c)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right font-semibold",
											children: fmt(tax + 2 * c)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mx-auto h-3.5 w-3.5 text-destructive" })
										})
									]
								}, it.code);
							}) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Tax Summary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "erp-grid",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th",
											children: "Type"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th text-right",
											children: "Taxable"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th text-right",
											children: "CGST"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th text-right",
											children: "SGST"
										})
									] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: "CGST 2.5%"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(2086)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: "52.15"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: "—"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: "SGST 2.5%"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(2086)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: "52.15"
										})
									] })] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Amount Summary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 text-[12.5px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											k: "Total Items",
											v: "16.000"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											k: "Total Qty",
											v: "16.000"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											k: "Total Taxable",
											v: fmt(2086)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											k: "Total Tax Amount",
											v: "₹ 104.30"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-t border-border pt-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Invoice Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
												className: "text-primary",
												children: ["₹ ", fmt(2190.3)]
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Payment",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-[12.5px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Payment Mode",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Credit" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cash" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "UPI" })
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Advance Received",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												defaultValue: "0.00",
												className: "text-right"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-t border-border pt-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Balance Due" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
												className: "text-destructive",
												children: ["₹ ", fmt(2190.3)]
											})]
										})
									]
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Customer Details",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-[12.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Opening Balance",
								v: `${fmt(12750)} Dr`,
								tone: "text-destructive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Credit Limit",
								v: fmt(25e3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Current Balance",
								v: `${fmt(12750)} Dr`,
								tone: "text-destructive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Available Credit",
								v: fmt(12250)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Last Invoice",
								v: "INV/124 (15/05)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Last Payment",
								v: "RCPT/124 (15/05)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-border pt-2 text-[12.5px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-primary",
							children: "Amount in Words"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Two Thousand One Hundred Ninety Rupees and Thirty Paise Only." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-border pt-2 text-[12.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-primary",
								children: "Terms & Conditions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "1. Goods once sold will not be taken back." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "2. Subject to Indore Jurisdiction only." })
						]
					})
				]
			})]
		})
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
//#endregion
export { SalesInvoice as component };

import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { a as Select, i as Panel, n as Field, r as Input, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { c as SUPPLIERS, o as PRODUCTS, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/purchase-GH5sLG32.js
var import_jsx_runtime = require_jsx_runtime();
function Purchase() {
	const items = PRODUCTS.slice(0, 7).map((p, i) => ({
		...p,
		qty: [
			25,
			20,
			10,
			10,
			20,
			10,
			5
		][i],
		disc: 0
	}));
	const gross = items.reduce((a, it) => a + it.rate * it.qty, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "Edit"
			},
			{
				key: "F3",
				label: "Delete",
				tone: "danger"
			},
			{
				key: "F4",
				label: "Save",
				tone: "primary"
			},
			{
				key: "F5",
				label: "Print"
			},
			{
				key: "F6",
				label: "Barcode"
			},
			{
				key: "F7",
				label: "Previous"
			},
			{
				key: "F8",
				label: "Next"
			},
			{
				key: "F9",
				label: "Clear"
			},
			{
				key: "F10",
				label: "Hold"
			},
			{
				key: "F11",
				label: "Payment"
			},
			{
				key: "F12",
				label: "Close"
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_300px] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Purchase Details",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-x-6 gap-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Supplier Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, { children: SUPPLIERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s.name }, s.code)) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Invoice No",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "INV/456/24-25" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Bill No",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "456" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Invoice Date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "17/06/2024" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Purchase Type",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "CREDIT PURCHASE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "CASH PURCHASE" })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "GRN Date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "17/06/2024" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "GRN No",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "GRN25" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Due Date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "27/06/2024" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Transport",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "500.00" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Payment Terms",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "10 Days" }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Vehicle No",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "MH12 AB 1234" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Narration",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "Purchase of Grocery Items" })
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Enter Items",
					right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-2 py-1 text-white text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "Add Item"]
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "erp-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th w-10",
								children: "S.No"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Item"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "HSN"
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
								children: "Disc"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "GST %"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "GST Amt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "Amount"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "erp-grid-th w-8" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((it, i) => {
							const amt = it.rate * it.qty;
							const gstAmt = amt * it.gst / 100;
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
										className: "erp-grid-td text-right",
										children: it.qty.toFixed(3)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right",
										children: fmt(it.rate)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right",
										children: "0.00"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right",
										children: it.gst
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right",
										children: fmt(gstAmt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-right font-semibold",
										children: fmt(amt + gstAmt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "erp-grid-td text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mx-auto h-3.5 w-3.5 text-destructive" })
									})
								]
							}, it.code);
						}) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-between border-t border-border pt-2 text-[12.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Total Items : ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: items.length })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Total Qty : ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "100.000" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Total Amount : ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-primary",
								children: fmt(gross)
							})] })
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Bill Summary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 text-[12.5px]",
						children: [
							[
								["Items", "7"],
								["Total Qty", "100.000"],
								["Total Disc", "0.00"],
								["Taxable Amt", fmt(gross)],
								["Total GST", fmt(2560)]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v })]
							}, k)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Net Amount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
									className: "text-primary",
									children: ["₹ ", fmt(18860)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Amount Paid" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "0.00" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Balance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-destructive",
									children: fmt(18860)
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Previous Balances",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 text-[12.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Opening Balance",
								v: "25,430.00 Dr"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Purchase (This Month)",
								v: "98,350.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Paid (This Month)",
								v: "72,650.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current Balance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-destructive",
									children: "51,130.00 Dr"
								})]
							})
						]
					})
				})]
			})]
		})
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v })]
	});
}
//#endregion
export { Purchase as component };

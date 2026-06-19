import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { p as Search } from "../_libs/lucide-react.mjs";
import { i as Panel, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { o as PRODUCTS, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-CD_Lbwag.js
var import_jsx_runtime = require_jsx_runtime();
function Inventory() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "New Item"
			},
			{
				key: "F3",
				label: "Edit Item"
			},
			{
				key: "F4",
				label: "Transfer"
			},
			{
				key: "F5",
				label: "Adjust"
			},
			{
				key: "F6",
				label: "Physical"
			},
			{
				key: "F7",
				label: "Reorder"
			},
			{
				key: "F8",
				label: "Batch / Serial"
			},
			{
				key: "F9",
				label: "Report"
			},
			{
				key: "F10",
				label: "Barcode"
			},
			{
				key: "F11",
				label: "Excel Export"
			},
			{
				key: "F12",
				label: "Close"
			}
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "erp-input w-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Groups" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "erp-input w-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Sub Groups" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "erp-input w-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Brands" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-1.5 text-[12.5px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox" }), " Low Stock Only"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "erp-input w-full pl-8",
						placeholder: "Search Item (F3)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1.5 h-4 w-4 text-muted-foreground" })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[200px_1fr] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Stock Groups",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-0.5 text-[12.5px]",
					children: [
						"All Groups",
						"Grocery",
						"Beverages",
						"Dairy",
						"Personal Care",
						"Home Care",
						"Snacks",
						"Frozen",
						"Bakery",
						"Pulses & Grains",
						"Oils & Spices",
						"Stationery",
						"General"
					].map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: `cursor-pointer rounded-sm px-2 py-1 ${i === 0 ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`,
						children: ["+ ", g]
					}, g))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Stock List",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
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
							children: "Barcode"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Item Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Group"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Sub Group"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "MRP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Rate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Unit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-right",
							children: "Reorder"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Status"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: PRODUCTS.map((it, i) => {
						const low = it.stock < it.reorder;
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
									children: it.barcode
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: it.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: it.group
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: it.subGroup
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-right",
									children: fmt(it.mrp)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-right",
									children: fmt(it.rate)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: `erp-grid-td text-right ${low ? "text-destructive font-semibold" : ""}`,
									children: [it.stock, ".000"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: it.unit
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "erp-grid-td text-right",
									children: [it.reorder, ".000"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: `erp-grid-td font-semibold ${low ? "text-destructive" : "text-[color:var(--color-success)]"}`,
									children: low ? "LOW STOCK" : "OK"
								})
							]
						}, it.code);
					}) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-6 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total Items",
						value: "245"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total Stock Qty",
						value: "2,584.500"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Low Stock Items",
						value: "15",
						tone: "text-[color:var(--color-warning)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Out of Stock",
						value: "7",
						tone: "text-destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Stock Value (Cost)",
						value: `₹ ${fmt(1265430)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Stock Value (MRP)",
						value: `₹ ${fmt(1875680)}`
					})
				]
			})] })]
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
			className: `text-[14px] font-bold ${tone}`,
			children: value
		})]
	});
}
//#endregion
export { Inventory as component };

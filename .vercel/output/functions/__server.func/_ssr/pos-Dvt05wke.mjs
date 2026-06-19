import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useERPCommands } from "./erp-context-CK6VWqph.mjs";
import { f as Settings, p as Search, s as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { t as CART_INITIAL, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos-Dvt05wke.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function POS() {
	const [recallOpen, setRecallOpen] = (0, import_react.useState)(false);
	const { context } = useERPCommands({
		pageName: "pos",
		availableCommands: [
			"NEW",
			"SAVE",
			"PRINT",
			"HOLD",
			"RECALL"
		],
		onCommand: (cmd) => {
			if (cmd === "NEW") context.createPOSSession();
			else if (cmd === "SAVE") handleSave();
			else if (cmd === "PRINT") handlePrint();
			else if (cmd === "HOLD") {
				if (context.activeSessionId) {
					context.holdPOSSession(context.activeSessionId);
					alert(`POS Bill session placed on Hold.`);
				}
			} else if (cmd === "RECALL") setRecallOpen(true);
		}
	});
	const activeSession = context.posSessions.find((s) => s.id === context.activeSessionId) || {
		id: "POS-001",
		cart: [],
		customer: "CASH"
	};
	const cart = activeSession.cart;
	const setCart = (newCart) => {
		if (context.activeSessionId) context.updatePOSSessionCart(context.activeSessionId, newCart);
	};
	const handleSave = () => {
		alert(`POS Bill ${activeSession.id} saved successfully!`);
		setCart([]);
	};
	const handlePrint = () => {
		alert(`Opening print preview for ${activeSession.id}...`);
		window.print();
	};
	const totals = (0, import_react.useMemo)(() => {
		const sub = cart.reduce((a, c) => a + c.rate * c.qty - c.disc, 0);
		return {
			sub,
			qty: cart.reduce((a, c) => a + c.qty, 0),
			total: sub
		};
	}, [cart]);
	const initializeDemoItems = () => {
		setCart(CART_INITIAL.map((c) => ({ ...c })));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Cash (Save)",
				tone: "primary",
				onClick: handleSave
			},
			{
				key: "F2",
				label: "Card",
				onClick: handleSave
			},
			{
				key: "F3",
				label: "UPI",
				onClick: handleSave
			},
			{
				key: "F4",
				label: "Multi Pay",
				onClick: handleSave
			},
			{
				key: "F5",
				label: "Demo Items",
				onClick: initializeDemoItems
			},
			{
				key: "F6",
				label: "Save (F6)",
				onClick: handleSave
			},
			{
				key: "F7",
				label: "Bill Print",
				onClick: handlePrint
			},
			{
				key: "F8",
				label: "Hold Bill",
				onClick: () => context.activeSessionId && context.holdPOSSession(context.activeSessionId)
			},
			{
				key: "F9",
				label: "Recall Bill",
				onClick: () => setRecallOpen(true)
			},
			{
				key: "F10",
				label: "Stock Check",
				onClick: () => context.dispatchCommand("STOCK")
			},
			{
				key: "F11",
				label: "Customers",
				onClick: () => context.dispatchCommand("USER")
			},
			{
				key: "F12",
				label: "Cancel",
				tone: "danger",
				onClick: () => setCart([])
			}
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-1 border-b border-border bg-slate-100 p-1 rounded-sm",
				children: [context.posSessions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => context.setActiveSessionId(s.id),
					className: `flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-t-sm border border-b-0 cursor-pointer transition-colors ${context.activeSessionId === s.id ? "bg-white border-border text-primary" : "bg-slate-200 border-transparent text-muted-foreground hover:bg-slate-300"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: (e) => {
							e.stopPropagation();
							context.closePOSSession(s.id);
						},
						className: "text-muted-foreground hover:text-destructive text-[9px] font-bold",
						children: "✕"
					})]
				}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => context.createPOSSession(),
					className: "px-2 py-0.5 text-[11px] bg-primary text-primary-foreground rounded-sm font-semibold ml-2 hover:bg-primary/95 transition-colors cursor-pointer",
					children: "+ New Tab"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "erp-input w-32",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "BILL VIEW" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "TOUCH" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "erp-input w-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "MYSHOP SUPERMARKET" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "erp-input w-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Main Division" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "erp-input w-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Main Location" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "erp-input w-full pl-8",
							placeholder: "Scan Barcode / Search Item (F3)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1.5 h-4 w-4 text-muted-foreground" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid h-7 w-7 place-items-center rounded-sm border border-border bg-white hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_320px] gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "erp-panel flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-auto bg-white min-h-[300px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "erp-grid w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "sticky top-0 z-10 bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th w-12",
											children: "S.No"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th",
											children: "Barcode"
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
											className: "erp-grid-th text-right",
											children: "MRP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th text-right",
											children: "Rate"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th text-right",
											children: "Qty"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th text-right",
											children: "Disc %"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "erp-grid-th text-right",
											children: "Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "erp-grid-th w-8" })
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [cart.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-center",
											children: i + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: c.barcode
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: c.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td",
											children: c.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(c.mrp)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(c.rate)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												value: c.qty,
												onChange: (e) => {
													const v = Number(e.target.value) || 0;
													setCart(cart.map((x, j) => j === i ? {
														...x,
														qty: v
													} : x));
												},
												className: "w-14 border border-input px-1 text-right"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right",
											children: fmt(c.disc)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-right font-semibold text-primary",
											children: fmt(c.rate * c.qty - c.disc)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setCart(cart.filter((_, j) => j !== i)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 text-destructive" })
											})
										})
									]
								}, c.code)), cart.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									colSpan: 10,
									className: "text-center py-8 text-muted-foreground text-sm",
									children: [
										"No items in cart. Scan barcodes or click ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "F5 (Demo Items)" }),
										" to load sample stock items."
									]
								}) })] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-6 gap-2 border-t border-border bg-secondary p-2 text-[12.5px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Total Items",
									value: cart.length.toString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Total Qty",
									value: totals.qty.toFixed(3)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Total Disc",
									value: "0.00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Taxable Amt",
									value: fmt(totals.sub)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Total GST",
									value: "0.00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Bill Weight",
									value: "0.000"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-6 gap-2 border-t border-border bg-secondary p-2 text-[12.5px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Salesman",
									value: "---"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Customer",
									value: activeSession.customer
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Credit Limit",
									value: "0.00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Available Limit",
									value: "0.00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Points",
									value: "0.00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Credit Balance",
									value: "0.00"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "erp-panel flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "erp-panel-header flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bill Details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Session : 1" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border text-[12.5px]",
						children: [
							[
								["Bill Date", (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB")],
								["Bill No", activeSession.id],
								["Gross Amount", fmt(totals.sub)],
								["Item Discount", "0.00"],
								["Scheme Discount", "0.00"]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k,
								v
							}, k)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Sub Total",
								v: fmt(totals.sub),
								bold: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "GST",
								v: "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Round Off",
								v: "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between bg-secondary px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-bold",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-bold text-destructive",
									children: fmt(totals.total)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Last Tendered",
								v: "0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Change Given",
								v: "0.00"
							})
						]
					})]
				})]
			}),
			recallOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-8 items-center justify-between bg-titlebar px-3 text-[12.5px] text-titlebar-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Recall Held Bill Session"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRecallOpen(false),
							className: "grid h-6 w-8 place-items-center hover:bg-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "erp-grid w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Hold ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Items Count"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Held Time"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th w-20 text-center",
									children: "Action"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [context.heldBills.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td font-semibold",
									children: b.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "erp-grid-td",
									children: [b.cart.length, " items"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: b.heldAt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											context.recallPOSSession(b.id);
											setRecallOpen(false);
										},
										className: "px-2.5 py-1 text-xs bg-primary text-primary-foreground rounded-sm",
										children: "Recall"
									})
								})
							] }, b.id)), context.heldBills.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 4,
								className: "text-center py-6 text-muted-foreground text-xs",
								children: "No bills on hold currently."
							}) })] })]
						})
					})]
				})
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "erp-panel px-2 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-primary font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[13px] font-bold",
			children: value
		})]
	});
}
function Row({ k, v, bold }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between px-3 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: bold ? "font-bold text-primary" : "",
			children: v
		})]
	});
}
//#endregion
export { POS as component };

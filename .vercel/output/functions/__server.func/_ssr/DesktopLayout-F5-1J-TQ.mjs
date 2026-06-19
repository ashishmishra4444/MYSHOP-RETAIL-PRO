import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useToolbar } from "./erp-context-CK6VWqph.mjs";
import { C as Package, F as FilePlus, G as Calculator, S as Pencil, U as ChevronDown, V as CirclePause, Y as Barcode, b as Power, c as Square, g as RefreshCw, h as RotateCcw, k as LayoutDashboard, m as Save, n as Wallet, q as Boxes, r as Users, s as Trash2, t as X, w as Minus, y as Printer } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DesktopLayout-F5-1J-TQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Calculator$1({ onClose }) {
	const [display, setDisplay] = (0, import_react.useState)("0");
	const [equation, setEquation] = (0, import_react.useState)("");
	const [isFinished, setIsFinished] = (0, import_react.useState)(false);
	const handleDigit = (digit) => {
		if (display === "0" || isFinished) {
			setDisplay(digit);
			setIsFinished(false);
		} else setDisplay(display + digit);
	};
	const handleOperator = (op) => {
		setEquation(display + " " + op + " ");
		setDisplay("0");
		setIsFinished(false);
	};
	const handleClear = () => {
		setDisplay("0");
		setEquation("");
		setIsFinished(false);
	};
	const handleCalculate = () => {
		if (!equation) return;
		const fullEq = equation + display;
		try {
			const tokens = fullEq.match(/(\d+\.?\d*)|[+\-*/]/g);
			if (!tokens) throw new Error("No tokens");
			let list = [...tokens];
			for (let i = 0; i < list.length; i++) if (list[i] === "*" || list[i] === "/") {
				const op = list[i];
				const prev = parseFloat(list[i - 1]);
				const next = parseFloat(list[i + 1]);
				const val = op === "*" ? prev * next : prev / next;
				list.splice(i - 1, 3, String(val));
				i--;
			}
			for (let i = 0; i < list.length; i++) if (list[i] === "+" || list[i] === "-") {
				const op = list[i];
				const prev = parseFloat(list[i - 1]);
				const next = parseFloat(list[i + 1]);
				const val = op === "+" ? prev + next : prev - next;
				list.splice(i - 1, 3, String(val));
				i--;
			}
			const result = parseFloat(list[0]);
			setDisplay(String(result));
			setEquation("");
			setIsFinished(true);
		} catch (e) {
			setDisplay("Error");
			setEquation("");
			setIsFinished(true);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-20 right-6 z-50 w-72 rounded-md border border-border bg-popover shadow-2xl overflow-hidden select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-7 items-center justify-between bg-titlebar px-2 text-[12px] text-titlebar-foreground cursor-move",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5 font-medium",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Calculator" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid h-5 w-7 place-items-center hover:bg-white/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid h-5 w-7 place-items-center hover:bg-white/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-2.5 w-2.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "grid h-5 w-7 place-items-center hover:bg-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-black/95 p-3 text-right text-white font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-5 text-xs text-muted-foreground truncate",
					children: equation
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-2xl font-bold truncate mt-1",
					children: display
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-0.5 bg-border p-0.5",
				children: [
					[
						"C",
						"CE",
						"%",
						"/"
					],
					[
						"7",
						"8",
						"9",
						"*"
					],
					[
						"4",
						"5",
						"6",
						"-"
					],
					[
						"1",
						"2",
						"3",
						"+"
					],
					[
						"0",
						".",
						"="
					]
				].flat().map((btn) => {
					const isOperator = [
						"/",
						"*",
						"-",
						"+",
						"="
					].includes(btn);
					const isAction = [
						"C",
						"CE",
						"%"
					].includes(btn);
					const isDouble = btn === "0";
					let btnClass = "bg-white hover:bg-accent text-foreground text-sm font-semibold h-11 transition-colors flex items-center justify-center";
					if (isOperator) btnClass = "bg-primary text-primary-foreground hover:bg-primary/95 text-sm font-semibold h-11 transition-colors flex items-center justify-center";
					else if (isAction) btnClass = "bg-secondary hover:bg-accent text-foreground text-sm font-semibold h-11 transition-colors flex items-center justify-center";
					if (isDouble) btnClass += " col-span-2";
					const handleClick = () => {
						if (btn === "C" || btn === "CE") handleClear();
						else if (btn === "=") handleCalculate();
						else if ([
							"/",
							"*",
							"-",
							"+"
						].includes(btn)) handleOperator(btn);
						else handleDigit(btn);
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleClick,
						className: btnClass,
						children: btn
					}, btn);
				})
			})
		]
	});
}
function BarcodeGenerator({ onClose }) {
	const [value, setValue] = (0, import_react.useState)("8901234567890");
	const [format, setFormat] = (0, import_react.useState)("EAN-13");
	const [qty, setQty] = (0, import_react.useState)(1);
	const handleRandomize = () => {
		let randomVal = "";
		for (let i = 0; i < 12; i++) randomVal += Math.floor(Math.random() * 10);
		randomVal += Math.floor(Math.random() * 10);
		setValue(randomVal);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-8 items-center justify-between bg-titlebar px-3 text-[12.5px] text-titlebar-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: "Barcode Label Generator"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "grid h-6 w-8 place-items-center hover:bg-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[110px_1fr] items-center gap-2 text-[12.5px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Barcode Data"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value,
									onChange: (e) => setValue(e.target.value),
									className: "erp-input flex-1",
									placeholder: "Enter value..."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleRandomize,
									className: "grid h-7 w-7 place-items-center rounded-sm border border-border hover:bg-accent bg-secondary",
									title: "Generate Random Code",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[110px_1fr] items-center gap-2 text-[12.5px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Symbology"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: format,
								onChange: (e) => setFormat(e.target.value),
								className: "erp-input",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "EAN-13",
										children: "EAN-13 (Standard Retail)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CODE-128",
										children: "Code-128 (Alpha-Numeric)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "UPC-A",
										children: "UPC-A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CODE-39",
										children: "Code-39"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[110px_1fr] items-center gap-2 text-[12.5px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Print Qty"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: qty,
								onChange: (e) => setQty(Math.max(1, Number(e.target.value) || 1)),
								className: "erp-input w-24",
								min: "1"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center border border-dashed border-border bg-slate-50 p-6 rounded-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-end h-16 gap-0.5 bg-white px-6 py-2 border border-border shadow-xs",
									children: Array.from({ length: 42 }).map((_, idx) => {
										const seedChar = value.charCodeAt(idx % value.length) || 48;
										const isLine = (seedChar + idx) % 2 === 0;
										const width = seedChar * idx % 3 + 1;
										if (isLine) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-black h-full",
											style: { width: `${width}px` }
										}, idx);
										else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-transparent h-full",
											style: { width: `${width}px` }
										}, idx);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-center text-xs font-mono tracking-widest text-foreground font-semibold",
									children: value || "NO DATA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-[10px] text-muted-foreground",
									children: ["Format: ", format]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-2 border-t border-border bg-slate-50 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-sm border border-border px-4 py-1.5 text-[12.5px] hover:bg-accent bg-white",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							alert(`Printing ${qty} barcode labels for: ${value}`);
							onClose();
						},
						className: "flex items-center gap-1.5 rounded-sm bg-primary px-4 py-1.5 text-[12.5px] font-semibold text-primary-foreground hover:bg-primary/95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), " Print Labels"]
					})]
				})
			]
		})
	});
}
var MENU = [
	{
		label: "Master",
		items: [
			{
				label: "Product Master",
				to: "/products"
			},
			{
				label: "Customer Master",
				to: "/customers"
			},
			{
				label: "Supplier Master",
				to: "/suppliers"
			}
		]
	},
	{
		label: "Sales",
		items: [{
			label: "POS Billing",
			to: "/pos"
		}, {
			label: "Sales Invoice",
			to: "/sales-invoice"
		}]
	},
	{
		label: "Purchase",
		items: [{
			label: "Purchase Entry",
			to: "/purchase"
		}]
	},
	{
		label: "Inventory",
		items: [{
			label: "Stock Items",
			to: "/inventory"
		}]
	},
	{
		label: "Marketing",
		items: [
			{
				label: "Campaign Manager",
				to: "/campaigns"
			},
			{
				label: "Broadcast Logs",
				to: "/notifications"
			},
			{
				label: "Festival Calendar",
				to: "/festival-calendar"
			}
		]
	},
	{
		label: "Accounts",
		items: [
			{
				label: "Udhar Khata (Customer Ledger)",
				to: "/udhar"
			},
			{
				label: "Supplier Ledger",
				to: "/suppliers"
			},
			{
				label: "Daily Cash Book",
				to: "/cashbook"
			},
			{
				label: "Expenses",
				to: "/expenses"
			}
		]
	},
	{
		label: "Reports",
		items: [{
			label: "All Reports",
			to: "/reports"
		}]
	},
	{
		label: "Tools",
		items: [{
			label: "Calculator",
			to: "#"
		}, {
			label: "Data Backup",
			to: "#"
		}]
	},
	{
		label: "Utilities",
		items: [{
			label: "Settings",
			to: "#"
		}, {
			label: "User Management",
			to: "#"
		}]
	},
	{
		label: "Help",
		items: [{
			label: "Documentation",
			to: "#"
		}, {
			label: "About MyShop",
			to: "#"
		}]
	}
];
var TOOLS = [
	{
		icon: FilePlus,
		label: "New",
		cmd: "NEW"
	},
	{
		icon: Pencil,
		label: "Edit",
		cmd: "EDIT"
	},
	{
		icon: Trash2,
		label: "Delete",
		danger: true,
		cmd: "DELETE"
	},
	{
		icon: Save,
		label: "Save",
		cmd: "SAVE"
	},
	{
		icon: Printer,
		label: "Print",
		cmd: "PRINT"
	},
	{
		icon: Barcode,
		label: "Barcode",
		cmd: "BARCODE"
	},
	{
		icon: Package,
		label: "Item",
		cmd: "ITEM"
	},
	{
		icon: CirclePause,
		label: "Hold",
		cmd: "HOLD"
	},
	{
		icon: RotateCcw,
		label: "Recall",
		cmd: "RECALL"
	},
	{
		icon: Wallet,
		label: "Expense",
		cmd: "EXPENSE"
	},
	{
		icon: Boxes,
		label: "Stock",
		cmd: "STOCK"
	},
	{
		icon: LayoutDashboard,
		label: "Dashboard",
		cmd: "DASHBOARD"
	},
	{
		icon: Users,
		label: "User",
		cmd: "USER"
	},
	{
		icon: Calculator,
		label: "Calculator",
		cmd: "CALCULATOR"
	},
	{
		icon: Power,
		label: "Exit",
		danger: true,
		cmd: "EXIT"
	}
];
var TITLES = {
	"/": "Dashboard",
	"/pos": "Billing Screen",
	"/products": "Product Master",
	"/purchase": "Purchase Entry",
	"/inventory": "Inventory / Stock",
	"/customers": "Customer Master",
	"/udhar": "Udhar Khata - Customer Ledger",
	"/suppliers": "Supplier Ledger",
	"/expenses": "Expense Management",
	"/cashbook": "Daily Cash Book",
	"/reports": "Reports",
	"/sales-invoice": "Sales Invoice",
	"/campaigns": "Campaign Manager",
	"/notifications": "Broadcast Logs",
	"/festival-calendar": "Festival Calendar"
};
function DesktopLayout({ children, fnKeys }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	useRouter();
	const sub = TITLES[pathname] ?? "";
	const now = /* @__PURE__ */ new Date();
	const time = now.toLocaleTimeString("en-IN", { hour12: false });
	const date = now.toLocaleDateString("en-GB");
	const { isCommandAvailable, isCalculatorOpen, setCalculatorOpen, isBarcodeModalOpen, setBarcodeModalOpen, dispatchCommand } = useToolbar();
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key.startsWith("F") && e.key.length > 1) {
				const num = parseInt(e.key.substring(1));
				if (num >= 1 && num <= 12) {
					e.preventDefault();
					const k = fnKeys?.[num - 1];
					if (k && k.onClick) k.onClick();
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [fnKeys]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen flex-col bg-background text-foreground select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[12.5px] font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-5 w-5 place-items-center rounded-sm bg-white/15 text-[10px] font-bold",
							children: "MS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MyShop Retail Pro" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "opacity-70",
							children: ["— Main Division", sub && ` — [${sub}]`]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid h-6 w-9 place-items-center hover:bg-white/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid h-6 w-9 place-items-center hover:bg-white/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3 w-3" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => dispatchCommand("EXIT"),
							className: "grid h-6 w-9 place-items-center hover:bg-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-8 items-center gap-0.5 border-b border-border bg-menubar px-2 text-[12.5px]",
				children: MENU.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-1 rounded-sm px-2.5 py-1 hover:bg-accent hover:text-accent-foreground",
						children: [m.label, m.items && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 opacity-60" })]
					}), m.items && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "invisible absolute left-0 top-full z-40 min-w-[220px] border border-border bg-popover py-1 shadow-lg group-hover:visible",
						children: m.items.map((it) => it.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: it.to,
							className: "block px-3 py-1.5 hover:bg-accent hover:text-accent-foreground",
							children: it.label
						}, it.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "block px-3 py-1.5 text-muted-foreground",
							children: it.label
						}, it.label))
					})]
				}, m.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 border-b border-border bg-toolbar px-2 py-1.5",
				children: TOOLS.map((t, i) => {
					const enabled = isCommandAvailable(t.cmd);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !enabled,
						onClick: () => dispatchCommand(t.cmd),
						className: `flex h-14 w-[64px] flex-col items-center justify-center gap-1 rounded-sm border border-transparent text-[11px] select-none ${enabled ? "hover:border-border hover:bg-accent cursor-pointer opacity-100" : "opacity-40 cursor-not-allowed"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: `h-5 w-5 ${t.danger ? "text-destructive" : "text-primary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.label })]
					}, i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-auto bg-background p-2.5",
				children
			}),
			isCalculatorOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator$1, { onClose: () => setCalculatorOpen(false) }),
			isBarcodeModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarcodeGenerator, { onClose: () => setBarcodeModalOpen(false) }),
			fnKeys && fnKeys.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-12 gap-1 border-t border-border bg-toolbar p-1.5",
				children: fnKeys.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: k.onClick,
					className: `flex h-12 flex-col items-center justify-center rounded-sm border text-[11.5px] font-medium ${k.tone === "primary" ? "border-primary bg-primary text-primary-foreground" : k.tone === "danger" ? "border-destructive/40 bg-white text-destructive hover:bg-destructive/10" : "border-border bg-white hover:bg-accent"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] opacity-70",
						children: k.key
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: k.label })]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-7 items-center justify-between border-t border-border bg-status-bar px-3 text-[12px] text-status-bar-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["User : ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "text-foreground",
							children: "ADMIN"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Role : ADMIN" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: date }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: time }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RC433" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "POS-01" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tax Type : GST" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[color:var(--color-success)]" }), " LAN Connected"]
					})]
				})]
			})
		]
	});
}
function Panel({ title, right, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `erp-panel ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "erp-panel-header flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title }), right]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-2.5",
			children
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-2 text-[12.5px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-32 text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1",
			children
		})]
	});
}
function Input(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: `erp-input w-full ${props.className ?? ""}`
	});
}
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: `erp-input w-full ${props.className ?? ""}`
	});
}
//#endregion
export { Select as a, Panel as i, Field as n, Input as r, DesktopLayout as t };

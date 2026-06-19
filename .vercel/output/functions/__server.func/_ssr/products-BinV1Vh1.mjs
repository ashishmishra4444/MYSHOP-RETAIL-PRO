import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useERPCommands } from "./erp-context-CK6VWqph.mjs";
import { M as Image } from "../_libs/lucide-react.mjs";
import { a as Select, i as Panel, n as Field, r as Input, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { o as PRODUCTS, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-BinV1Vh1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductMaster() {
	const [productList, setProductList] = (0, import_react.useState)(PRODUCTS.map((p) => ({ ...p })));
	const [selectedCode, setSelectedCode] = (0, import_react.useState)(PRODUCTS[0]?.code || null);
	const [mode, setMode] = (0, import_react.useState)("View");
	const [tab, setTab] = (0, import_react.useState)("General");
	const selectedProduct = productList.find((p) => p.code === selectedCode) || productList[0];
	const [formName, setFormName] = (0, import_react.useState)(selectedProduct?.name || "");
	const [formRate, setFormRate] = (0, import_react.useState)(selectedProduct?.rate || 0);
	const [formMrp, setFormMrp] = (0, import_react.useState)(selectedProduct?.mrp || 0);
	const handleSelectProduct = (code) => {
		const prod = productList.find((p) => p.code === code);
		if (prod) {
			setSelectedCode(code);
			setFormName(prod.name);
			setFormRate(prod.rate);
			setFormMrp(prod.mrp);
			setMode("View");
		}
	};
	const handleSave = () => {
		if (mode === "New") {
			const newCode = `P${1e3 + productList.length + 1}`;
			const newProduct = {
				code: newCode,
				barcode: `890${Math.floor(Math.random() * 1e9)}`,
				name: formName,
				group: "Grocery",
				subGroup: "General",
				brand: "Generic",
				mrp: formMrp,
				rate: formRate,
				stock: 0,
				unit: "PCS",
				reorder: 5,
				hsn: "000000",
				gst: 18
			};
			setProductList([...productList, newProduct]);
			setSelectedCode(newCode);
			alert("Product saved successfully!");
		} else if (mode === "Edit" && selectedCode) {
			setProductList(productList.map((p) => p.code === selectedCode ? {
				...p,
				name: formName,
				rate: formRate,
				mrp: formMrp
			} : p));
			alert("Product changes updated successfully!");
		}
		setMode("View");
	};
	const handleDelete = () => {
		if (!selectedCode) return;
		if (confirm(`Are you sure you want to delete product ${selectedCode}?`)) {
			const updated = productList.filter((p) => p.code !== selectedCode);
			setProductList(updated);
			setSelectedCode(updated[0]?.code || null);
			if (updated[0]) {
				setFormName(updated[0].name);
				setFormRate(updated[0].rate);
				setFormMrp(updated[0].mrp);
			}
			setMode("View");
			alert("Product deleted!");
		}
	};
	useERPCommands({
		pageName: "products",
		availableCommands: [
			"NEW",
			"EDIT",
			"DELETE",
			"SAVE",
			"PRINT"
		],
		selectedRecordId: selectedCode,
		isDirty: mode !== "View",
		onCommand: (cmd) => {
			if (cmd === "NEW") {
				setMode("New");
				setFormName("");
				setFormRate(0);
				setFormMrp(0);
			} else if (cmd === "EDIT") {
				if (selectedCode) setMode("Edit");
			} else if (cmd === "DELETE") handleDelete();
			else if (cmd === "SAVE") handleSave();
			else if (cmd === "PRINT") {
				alert("Generating report PDF preview for current catalog list...");
				window.print();
			}
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "New (F2)",
				onClick: () => {
					setMode("New");
					setFormName("");
					setFormRate(0);
					setFormMrp(0);
				}
			},
			{
				key: "F3",
				label: "Edit (F3)",
				onClick: () => selectedCode && setMode("Edit")
			},
			{
				key: "F4",
				label: "Delete (F4)",
				tone: "danger",
				onClick: handleDelete
			},
			{
				key: "F5",
				label: "Save (F5)",
				tone: "primary",
				onClick: handleSave
			},
			{
				key: "F6",
				label: "Cancel",
				onClick: () => setMode("View")
			},
			{
				key: "F7",
				label: "Find"
			},
			{
				key: "F8",
				label: "Barcode",
				onClick: () => alert("Close layout and click Barcode on top toolbar.")
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_460px] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Product List",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "erp-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th w-12",
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
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Group"
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
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: productList.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						onClick: () => handleSelectProduct(it.code),
						className: `cursor-pointer transition-colors ${selectedCode === it.code ? "bg-primary/10 font-medium" : i % 2 ? "bg-[color:var(--color-grid-row-alt)] hover:bg-accent/40" : "hover:bg-accent/40"}`,
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
								className: "erp-grid-td text-right",
								children: fmt(it.mrp)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-right",
								children: fmt(it.rate)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: `erp-grid-td text-right ${it.stock < it.reorder ? "text-destructive font-semibold" : ""}`,
								children: [it.stock, ".000"]
							})
						]
					}, it.code)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: `Product Details — [Mode : ${mode}]`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 border-b border-border",
					children: [
						"General",
						"Other Details",
						"GST Details",
						"Stock Details",
						"Image"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTab(t),
						className: `px-3 py-1.5 text-[12.5px] ${tab === t ? "border-b-2 border-primary font-semibold text-primary" : "text-muted-foreground"}`,
						children: t
					}, t))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Item Code",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: mode === "New" ? "AUTO" : selectedProduct?.code,
								disabled: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Barcode",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: mode === "New" ? "AUTO GENERATE" : selectedProduct?.barcode,
								disabled: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Item Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: formName,
								onChange: (e) => setFormName(e.target.value),
								disabled: mode === "View",
								placeholder: "Product name"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Item Group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								defaultValue: selectedProduct?.group,
								disabled: mode === "View",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: selectedProduct?.group || "Grocery" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Sub Group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								disabled: mode === "View",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: selectedProduct?.subGroup || "General" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								disabled: mode === "View",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: selectedProduct?.brand || "Generic" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "MRP",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: formMrp,
								onChange: (e) => setFormMrp(Number(e.target.value) || 0),
								disabled: mode === "View",
								className: "text-right"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Rate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: formRate,
								onChange: (e) => setFormRate(Number(e.target.value) || 0),
								disabled: mode === "View",
								className: "text-right"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tax %",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: selectedProduct?.gst,
								disabled: true,
								className: "text-right"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Unit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								disabled: mode === "View",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: selectedProduct?.unit || "PCS" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Reorder Level",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: selectedProduct?.reorder,
								disabled: true,
								className: "text-right"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								defaultChecked: true,
								disabled: mode === "View"
							}), " Active"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center pt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-24 w-24 place-items-center rounded-sm border border-dashed border-border bg-secondary text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-8 w-8" })
							})
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { ProductMaster as component };

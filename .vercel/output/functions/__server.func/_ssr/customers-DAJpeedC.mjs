import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useERPCommands } from "./erp-context-CK6VWqph.mjs";
import { a as Select, i as Panel, n as Field, r as Input, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { r as CUSTOMERS, u as fmt } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-DAJpeedC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Customers() {
	const [customerList, setCustomerList] = (0, import_react.useState)(CUSTOMERS.map((c) => ({ ...c })));
	const [selectedCode, setSelectedCode] = (0, import_react.useState)(CUSTOMERS[0]?.code || null);
	const [mode, setMode] = (0, import_react.useState)("View");
	const selectedCustomer = customerList.find((c) => c.code === selectedCode) || customerList[0];
	const [formName, setFormName] = (0, import_react.useState)(selectedCustomer?.name || "");
	const [formMobile, setFormMobile] = (0, import_react.useState)(selectedCustomer?.mobile || "");
	const [formCity, setFormCity] = (0, import_react.useState)(selectedCustomer?.city || "");
	const [formOpening, setFormOpening] = (0, import_react.useState)(selectedCustomer?.opening || 0);
	const handleSelectCustomer = (code) => {
		const cust = customerList.find((c) => c.code === code);
		if (cust) {
			setSelectedCode(code);
			setFormName(cust.name);
			setFormMobile(cust.mobile);
			setFormCity(cust.city);
			setFormOpening(cust.opening);
			setMode("View");
		}
	};
	const handleSave = () => {
		if (mode === "New") {
			const newCode = `CUST${String(customerList.length + 1).padStart(3, "0")}`;
			const newCust = {
				code: newCode,
				name: formName,
				mobile: formMobile,
				city: formCity,
				opening: formOpening,
				limit: 1e4,
				status: "Active"
			};
			setCustomerList([...customerList, newCust]);
			setSelectedCode(newCode);
			alert("New Customer saved successfully!");
		} else if (mode === "Edit" && selectedCode) {
			setCustomerList(customerList.map((c) => c.code === selectedCode ? {
				...c,
				name: formName,
				mobile: formMobile,
				city: formCity,
				opening: formOpening
			} : c));
			alert("Customer details updated successfully!");
		}
		setMode("View");
	};
	const handleDelete = () => {
		if (!selectedCode) return;
		if (confirm(`Are you sure you want to delete customer ${selectedCode}?`)) {
			const updated = customerList.filter((c) => c.code !== selectedCode);
			setCustomerList(updated);
			setSelectedCode(updated[0]?.code || null);
			if (updated[0]) {
				setFormName(updated[0].name);
				setFormMobile(updated[0].mobile);
				setFormCity(updated[0].city);
				setFormOpening(updated[0].opening);
			}
			setMode("View");
			alert("Customer deleted successfully!");
		}
	};
	useERPCommands({
		pageName: "customers",
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
				setFormMobile("");
				setFormCity("Indore");
				setFormOpening(0);
			} else if (cmd === "EDIT") {
				if (selectedCode) setMode("Edit");
			} else if (cmd === "DELETE") handleDelete();
			else if (cmd === "SAVE") handleSave();
			else if (cmd === "PRINT") {
				alert("Generating print preview for customer records...");
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
					setFormMobile("");
					setFormOpening(0);
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
				label: "Print Ledger",
				onClick: () => window.print()
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Search / Select Customer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "erp-input w-36",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Customer Name" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "erp-input flex-1",
								placeholder: "Search Text"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-sm bg-primary px-3 text-primary-foreground text-[12.5px]",
								children: "Search (F3)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
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
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Mobile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "City"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "Opening Bal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th text-right",
								children: "Limit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "erp-grid-th",
								children: "Status"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: customerList.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => handleSelectCustomer(c.code),
							className: `cursor-pointer transition-colors ${selectedCode === c.code ? "bg-primary/10 font-medium" : i % 2 ? "bg-[color:var(--color-grid-row-alt)] hover:bg-accent/40" : "hover:bg-accent/40"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-center",
									children: i + 1
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
									className: "erp-grid-td",
									children: c.mobile
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td",
									children: c.city
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "erp-grid-td text-right text-destructive",
									children: [fmt(c.opening), " Dr"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-right",
									children: fmt(c.limit)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "erp-grid-td text-[color:var(--color-success)] font-semibold",
									children: c.status
								})
							]
						}, c.code)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-5 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Total Customers",
								value: customerList.length.toString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Active",
								value: customerList.filter((c) => c.status === "Active").length.toString(),
								tone: "text-[color:var(--color-success)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Inactive",
								value: customerList.filter((c) => c.status !== "Active").length.toString(),
								tone: "text-destructive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Receivable",
								value: `₹ ${fmt(customerList.reduce((acc, c) => acc + c.opening, 0))}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Credit Limit",
								value: `₹ ${fmt(customerList.reduce((acc, c) => acc + c.limit, 0))}`
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: `Customer Details (${mode} Mode)`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Customer Code",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: mode === "New" ? "AUTO" : selectedCustomer?.code,
								disabled: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Customer Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: formName,
								onChange: (e) => setFormName(e.target.value),
								disabled: mode === "View"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								disabled: mode === "View",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "RETAIL CUSTOMERS" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mobile No",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: formMobile,
								onChange: (e) => setFormMobile(e.target.value),
								disabled: mode === "View"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "E-Mail",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								defaultValue: "rahulkumar@gmail.com",
								disabled: mode === "View"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "City",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: formCity,
								onChange: (e) => setFormCity(e.target.value),
								disabled: mode === "View",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Indore",
										children: "Indore"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Dewas",
										children: "Dewas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Bhopal",
										children: "Bhopal"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								defaultValue: "Madhya Pradesh — 452001",
								disabled: mode === "View"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "GST Number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								defaultValue: "23ABCDE1234F1Z5",
								disabled: mode === "View"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Opening Balance",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: formOpening,
								onChange: (e) => setFormOpening(Number(e.target.value) || 0),
								disabled: mode === "View",
								className: "text-right text-destructive"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Credit Limit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								defaultValue: fmt(selectedCustomer?.limit || 1e4),
								disabled: mode === "View",
								className: "text-right"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Credit Days",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								defaultValue: "30",
								disabled: mode === "View"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Remarks",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								defaultValue: "Regular customer. Good payment.",
								disabled: mode === "View"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								defaultChecked: true,
								disabled: mode === "View"
							}), " Active"]
						})
					]
				})
			})]
		})
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
export { Customers as component };

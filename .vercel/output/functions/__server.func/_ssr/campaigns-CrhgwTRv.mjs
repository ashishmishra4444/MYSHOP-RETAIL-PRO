import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useERPCommands } from "./erp-context-CK6VWqph.mjs";
import { a as Select, i as Panel, n as Field, r as Input, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { i as getCustomersBySegment, t as CAMPAIGNS } from "./marketing-store-Durlknjf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campaigns-CrhgwTRv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CampaignManager() {
	const [campaigns, setCampaigns] = (0, import_react.useState)(CAMPAIGNS.map((c) => ({ ...c })));
	const [selectedId, setSelectedId] = (0, import_react.useState)(CAMPAIGNS[0]?.id || null);
	const [mode, setMode] = (0, import_react.useState)("View");
	const activeCampaign = campaigns.find((c) => c.id === selectedId) || campaigns[0];
	const [name, setName] = (0, import_react.useState)(activeCampaign?.name || "");
	const [offerTitle, setOfferTitle] = (0, import_react.useState)(activeCampaign?.offerTitle || "");
	const [message, setMessage] = (0, import_react.useState)(activeCampaign?.message || "");
	const [discount, setDiscount] = (0, import_react.useState)(activeCampaign?.discount || 0);
	const [targetAudience, setTargetAudience] = (0, import_react.useState)(activeCampaign?.targetAudience || "All");
	const [channels, setChannels] = (0, import_react.useState)(activeCampaign?.deliveryChannels || []);
	const handleSelectCampaign = (id) => {
		const camp = campaigns.find((c) => c.id === id);
		if (camp) {
			setSelectedId(id);
			setName(camp.name);
			setOfferTitle(camp.offerTitle);
			setMessage(camp.message);
			setDiscount(camp.discount);
			setTargetAudience(camp.targetAudience);
			setChannels(camp.deliveryChannels);
			setMode("View");
		}
	};
	const handleSave = () => {
		if (mode === "New") {
			const nextId = `C${String(campaigns.length + 1).padStart(3, "0")}`;
			const newCamp = {
				id: nextId,
				name,
				festival: "General",
				offerTitle,
				message,
				discount,
				startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				endDate: new Date(Date.now() + 864e5 * 7).toISOString().split("T")[0],
				targetAudience,
				deliveryChannels: channels,
				status: "Scheduled"
			};
			setCampaigns([...campaigns, newCamp]);
			setSelectedId(nextId);
			alert("Campaign saved successfully!");
		} else if (mode === "Edit" && selectedId) {
			setCampaigns(campaigns.map((c) => c.id === selectedId ? {
				...c,
				name,
				offerTitle,
				message,
				discount,
				targetAudience,
				deliveryChannels: channels
			} : c));
			alert("Campaign details updated!");
		}
		setMode("View");
	};
	const handleDelete = () => {
		if (!selectedId) return;
		if (confirm(`Are you sure you want to delete campaign ${selectedId}?`)) {
			const filtered = campaigns.filter((c) => c.id !== selectedId);
			setCampaigns(filtered);
			setSelectedId(filtered[0]?.id || null);
			if (filtered[0]) {
				setName(filtered[0].name);
				setOfferTitle(filtered[0].offerTitle);
				setMessage(filtered[0].message);
				setDiscount(filtered[0].discount);
				setTargetAudience(filtered[0].targetAudience);
				setChannels(filtered[0].deliveryChannels);
			}
			setMode("View");
			alert("Campaign removed.");
		}
	};
	useERPCommands({
		pageName: "campaigns",
		availableCommands: [
			"NEW",
			"EDIT",
			"DELETE",
			"SAVE",
			"PRINT"
		],
		selectedRecordId: selectedId,
		isDirty: mode !== "View",
		onCommand: (cmd) => {
			if (cmd === "NEW") {
				setMode("New");
				setName("");
				setOfferTitle("");
				setMessage("");
				setDiscount(0);
				setTargetAudience("All");
				setChannels(["WhatsApp"]);
			} else if (cmd === "EDIT") {
				if (selectedId) setMode("Edit");
			} else if (cmd === "DELETE") handleDelete();
			else if (cmd === "SAVE") handleSave();
			else if (cmd === "PRINT") {
				alert("Printing Campaign performance report details...");
				window.print();
			}
		}
	});
	const toggleChannel = (ch) => {
		if (channels.includes(ch)) setChannels(channels.filter((c) => c !== ch));
		else setChannels([...channels, ch]);
	};
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
					setName("");
					setOfferTitle("");
					setMessage("");
				}
			},
			{
				key: "F3",
				label: "Edit (F3)",
				onClick: () => selectedId && setMode("Edit")
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
				label: "Print Report",
				onClick: () => window.print()
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_480px] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Campaign List",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "erp-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th w-10",
							children: "S.No"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Campaign Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Festival"
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
							children: "Channels"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Status"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: campaigns.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						onClick: () => handleSelectCampaign(c.id),
						className: `cursor-pointer transition-colors ${selectedId === c.id ? "bg-primary/10 font-semibold" : i % 2 ? "bg-[color:var(--color-grid-row-alt)] hover:bg-accent/40" : "hover:bg-accent/40"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-center",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td font-semibold text-primary",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: c.festival
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: c.offerTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-indigo-700 font-medium",
								children: c.targetAudience
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1 justify-center flex-wrap",
									children: c.deliveryChannels.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-1.5 py-0.5 rounded-xs bg-secondary text-[10px] border font-bold",
										children: ch
									}, ch))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-2 py-0.5 rounded-sm text-[11px] font-bold ${c.status === "Active" ? "bg-[color:var(--color-success)] text-white" : c.status === "Scheduled" ? "bg-blue-600 text-white" : c.status === "Completed" ? "bg-slate-500 text-white" : "bg-slate-200 text-slate-700"}`,
									children: c.status
								})
							})
						]
					}, c.id)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: `Campaign Details — [Mode : ${mode}]`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 p-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Campaign ID",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: mode === "New" ? "AUTO GENERATE" : activeCampaign?.id,
								disabled: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Campaign Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: name,
								onChange: (e) => setName(e.target.value),
								disabled: mode === "View",
								placeholder: "Enter campaign title"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Offer Title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: offerTitle,
								onChange: (e) => setOfferTitle(e.target.value),
								disabled: mode === "View",
								placeholder: "Flat discount/gift hamper promo details"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Discount %",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: discount,
								onChange: (e) => setDiscount(Number(e.target.value) || 0),
								disabled: mode === "View",
								className: "text-right"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Target Audience",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: targetAudience,
								onChange: (e) => setTargetAudience(e.target.value),
								disabled: mode === "View",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: "All",
										children: [
											"All Customers (",
											getCustomersBySegment("All").length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: "VIP",
										children: [
											"VIP Customers (",
											getCustomersBySegment("VIP").length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: "Credit",
										children: [
											"Credit Ledger (",
											getCustomersBySegment("Credit").length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: "Frequent",
										children: [
											"Frequent Buyers (",
											getCustomersBySegment("Frequent").length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: "Inactive",
										children: [
											"Inactive Members (",
											getCustomersBySegment("Inactive").length,
											")"
										]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 text-[12.5px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-32 text-muted-foreground",
								children: "Channels"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2",
								children: [
									"In-App",
									"WhatsApp",
									"SMS",
									"Email"
								].map((ch) => {
									const selected = channels.includes(ch);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: mode === "View",
										onClick: () => toggleChannel(ch),
										className: `px-3 py-1 rounded-sm border text-xs font-semibold ${selected ? "bg-[#0047BA] text-white border-transparent" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`,
										children: ch
									}, ch);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1 text-[12.5px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Broadcasting Message Template"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: message,
								onChange: (e) => setMessage(e.target.value),
								disabled: mode === "View",
								rows: 5,
								className: "erp-input w-full h-auto p-2 resize-none border border-slate-300 rounded-sm outline-none focus:border-primary",
								placeholder: "Compose messaging template here..."
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { CampaignManager as component };

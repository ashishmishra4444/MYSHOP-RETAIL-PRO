import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as RefreshCw, l as Sparkles } from "../_libs/lucide-react.mjs";
import { i as Panel, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { o as syncFestivalCalendar, r as FESTIVALS } from "./marketing-store-Durlknjf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/festival-calendar-CzYbKln2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FestivalCalendar() {
	const [festivals, setFestivals] = (0, import_react.useState)(() => [...FESTIVALS]);
	const [isSyncing, setIsSyncing] = (0, import_react.useState)(false);
	const handleSyncAPI = () => {
		setIsSyncing(true);
		syncFestivalCalendar().then((updatedList) => {
			setFestivals([...updatedList]);
			setIsSyncing(false);
			alert("Successfully synced with Public Holiday Registry API! Calculated new dynamic festival offsets.");
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "Sync API (F2)",
				onClick: handleSyncAPI
			},
			{
				key: "F5",
				label: "Refresh",
				tone: "primary",
				onClick: () => setFestivals([...FESTIVALS])
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Upcoming Festival Calendar",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleSyncAPI,
				disabled: isSyncing,
				className: "flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-white text-primary rounded-sm border border-primary hover:bg-slate-50 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}` }), "Sync Calendar API (F2)"]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 bg-blue-50 border border-blue-100 rounded-sm text-[12.5px] text-blue-800 flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 shrink-0 mt-0.5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold text-blue-900",
						children: "Holiday & Festival Sync Automations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 opacity-90",
						children: "Fixed-date events trigger on the same date annually. Dynamic festivals calculate new dates automatically on calendar sync. Automation rules trigger campaigns 7 days, 3 days, and 1 day before the target festival."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Dynamic Festivals (Lunar/Solar Calendar Offsets)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "erp-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Festival Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Trigger Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-center",
									children: "Countdown"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: festivals.filter((f) => f.type === "Dynamic").map((f) => {
								const isPast = f.daysRemaining < 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-accent/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td font-semibold text-primary",
											children: f.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td font-mono",
											children: f.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-center",
											children: isPast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400 text-xs font-semibold",
												children: "Completed"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[#0047BA] font-bold",
												children: [f.daysRemaining, " days left"]
											})
										})
									]
								}, f.id);
							}) })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Fixed-Date Festivals (Annually Static)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "erp-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Festival Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th",
									children: "Trigger Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "erp-grid-th text-center",
									children: "Countdown"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: festivals.filter((f) => f.type === "Fixed").map((f) => {
								const isPast = f.daysRemaining < 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-accent/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td font-semibold text-indigo-700",
											children: f.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td font-mono",
											children: f.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "erp-grid-td text-center",
											children: isPast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400 text-xs font-semibold",
												children: "Completed"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[#0047BA] font-bold",
												children: [f.daysRemaining, " days left"]
											})
										})
									]
								}, f.id);
							}) })]
						})
					})]
				})]
			})
		})
	});
}
//#endregion
export { FestivalCalendar as component };

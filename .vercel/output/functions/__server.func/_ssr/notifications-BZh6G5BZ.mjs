import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as CirclePlay, T as MessageSquare, d as ShieldCheck, g as RefreshCw } from "../_libs/lucide-react.mjs";
import { i as Panel, t as DesktopLayout } from "./DesktopLayout-F5-1J-TQ.mjs";
import { a as runSchedulerTrigger, n as CAMPAIGN_LOGS } from "./marketing-store-Durlknjf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-BZh6G5BZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationCenter() {
	const [logs, setLogs] = (0, import_react.useState)(() => [...CAMPAIGN_LOGS]);
	const [isRunning, setIsRunning] = (0, import_react.useState)(false);
	const handleTriggerScheduler = () => {
		setIsRunning(true);
		setTimeout(() => {
			const addedLogs = runSchedulerTrigger();
			setLogs([...addedLogs, ...CAMPAIGN_LOGS]);
			setIsRunning(false);
			if (addedLogs.length > 0) alert(`Scheduler execution complete! Created ${addedLogs.length} new log entries for scheduled campaigns.`);
			else alert("Scheduler ran: No scheduled campaigns starting today, or duplicate sends prevented.");
		}, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopLayout, {
		fnKeys: [
			{
				key: "F1",
				label: "Help"
			},
			{
				key: "F2",
				label: "Run Scheduler",
				onClick: handleTriggerScheduler
			},
			{
				key: "F5",
				label: "Refresh",
				tone: "primary",
				onClick: () => setLogs([...CAMPAIGN_LOGS])
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Notification Center & Broadcast Logs",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleTriggerScheduler,
				disabled: isRunning,
				className: "flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-white text-primary rounded-sm border border-primary hover:bg-slate-50 transition-colors",
				children: [isRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-3.5 w-3.5 text-[#0047BA]" }), "Simulate Daily Scheduler Run (F2)"]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-5 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCard, {
							label: "Total Sent",
							value: logs.length,
							icon: MessageSquare,
							tone: "text-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCard, {
							label: "Delivered",
							value: logs.filter((l) => l.status === "Delivered" || l.status === "Read" || l.status === "Clicked").length,
							icon: ShieldCheck,
							tone: "text-green-600"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCard, {
							label: "Read",
							value: logs.filter((l) => l.status === "Read" || l.status === "Clicked").length,
							icon: MessageSquare,
							tone: "text-indigo-600"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCard, {
							label: "Clicked / Conversions",
							value: logs.filter((l) => l.status === "Clicked").length,
							icon: CirclePlay,
							tone: "text-rose-600"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCard, {
							label: "Failed",
							value: logs.filter((l) => l.status === "Failed").length,
							icon: MessageSquare,
							tone: "text-destructive"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "erp-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th w-12",
							children: "S.No"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Voucher/Campaign"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Customer Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th text-center",
							children: "Channel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Dispatched At"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "erp-grid-th",
							children: "Status"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: logs.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-center",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td font-semibold text-primary",
								children: l.campaignName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td font-medium",
								children: l.customerName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 rounded bg-slate-100 border text-xs font-bold",
									children: l.channel
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td text-slate-500 font-mono text-xs",
								children: l.sentAt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "erp-grid-td",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-2 py-0.5 rounded-sm text-[11px] font-bold ${l.status === "Clicked" ? "bg-rose-500 text-white" : l.status === "Read" ? "bg-indigo-600 text-white" : l.status === "Delivered" ? "bg-green-600 text-white" : l.status === "Failed" ? "bg-red-500 text-white" : "bg-blue-600 text-white"}`,
									children: l.status
								})
							})
						]
					}, l.id)) })]
				})]
			})
		})
	});
}
function MiniCard({ label, value, icon: Icon, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "erp-panel px-3 py-2.5 flex items-center justify-between bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[12px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `text-xl font-bold mt-0.5 ${tone}`,
			children: value
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 opacity-30 text-[#0047BA]" })]
	});
}
//#endregion
export { NotificationCenter as component };

import { r as CUSTOMERS } from "./sample-data-ObAshtgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketing-store-Durlknjf.js
var FESTIVALS = [
	{
		id: "F001",
		name: "Diwali",
		type: "Dynamic",
		date: "2026-11-08",
		daysRemaining: 143
	},
	{
		id: "F002",
		name: "Holi",
		type: "Dynamic",
		date: "2026-03-03",
		daysRemaining: -107
	},
	{
		id: "F003",
		name: "Raksha Bandhan",
		type: "Dynamic",
		date: "2026-08-28",
		daysRemaining: 71
	},
	{
		id: "F004",
		name: "Dussehra",
		type: "Dynamic",
		date: "2026-10-19",
		daysRemaining: 123
	},
	{
		id: "F005",
		name: "Eid",
		type: "Dynamic",
		date: "2026-03-20",
		daysRemaining: -90
	},
	{
		id: "F006",
		name: "Durga Puja",
		type: "Dynamic",
		date: "2026-10-16",
		daysRemaining: 120
	},
	{
		id: "F007",
		name: "New Year",
		type: "Fixed",
		date: "2027-01-01",
		daysRemaining: 197
	},
	{
		id: "F008",
		name: "Republic Day",
		type: "Fixed",
		date: "2027-01-26",
		daysRemaining: 222
	},
	{
		id: "F009",
		name: "Independence Day",
		type: "Fixed",
		date: "2026-08-15",
		daysRemaining: 58
	},
	{
		id: "F010",
		name: "Gandhi Jayanti",
		type: "Fixed",
		date: "2026-10-02",
		daysRemaining: 106
	},
	{
		id: "F011",
		name: "Christmas",
		type: "Fixed",
		date: "2026-12-25",
		daysRemaining: 190
	}
];
var CAMPAIGNS = [
	{
		id: "C001",
		name: "Diwali Mahabachat Offers",
		festival: "Diwali",
		offerTitle: "Flat 15% Off on Atta & Grocery items",
		message: "Greetings! Celebrate Diwali with MyShop! Get 15% discount on all Grocery items. Use code DIWALI15.",
		discount: 15,
		startDate: "2026-11-01",
		endDate: "2026-11-09",
		targetAudience: "All",
		deliveryChannels: [
			"WhatsApp",
			"SMS",
			"In-App"
		],
		status: "Scheduled"
	},
	{
		id: "C002",
		name: "New Year Grand Premium Sale",
		festival: "New Year",
		offerTitle: "Exclusive VIP 20% Discount",
		message: "Happy New Year! As a valued VIP customer, enjoy a premium 20% discount storewide this week.",
		discount: 20,
		startDate: "2026-12-30",
		endDate: "2027-01-05",
		targetAudience: "VIP",
		deliveryChannels: ["Email", "WhatsApp"],
		status: "Draft"
	},
	{
		id: "C003",
		name: "Holi Colors Bash",
		festival: "Holi",
		offerTitle: "Holi Specials: Save 10%",
		message: "Holi Hai! Get 10% instant discount on grocery hampers at MyShop. Valid until March 5th.",
		discount: 10,
		startDate: "2026-03-01",
		endDate: "2026-03-05",
		targetAudience: "Frequent Buyers",
		deliveryChannels: ["SMS", "In-App"],
		status: "Completed"
	},
	{
		id: "C004",
		name: "Independence Day Pride Sale",
		festival: "Independence Day",
		offerTitle: "Freedom Sale: Up to 12% Off",
		message: "Salute to freedom! Enjoy 12% off on premium brands at MyShop. Happy Independence Day!",
		discount: 12,
		startDate: "2026-08-10",
		endDate: "2026-08-16",
		targetAudience: "All",
		deliveryChannels: [
			"WhatsApp",
			"SMS",
			"Email",
			"In-App"
		],
		status: "Active"
	}
];
var CAMPAIGN_LOGS = [
	{
		id: "L001",
		campaignId: "C003",
		campaignName: "Holi Colors Bash",
		customerName: "Rahul Kumar",
		channel: "WhatsApp",
		sentAt: "2026-03-02 10:15",
		status: "Read"
	},
	{
		id: "L002",
		campaignId: "C003",
		campaignName: "Holi Colors Bash",
		customerName: "Shyam Store",
		channel: "SMS",
		sentAt: "2026-03-02 10:18",
		status: "Delivered"
	},
	{
		id: "L003",
		campaignId: "C003",
		campaignName: "Holi Colors Bash",
		customerName: "Kirana Mart",
		channel: "In-App",
		sentAt: "2026-03-02 10:20",
		status: "Clicked"
	},
	{
		id: "L004",
		campaignId: "C004",
		campaignName: "Independence Day Pride Sale",
		customerName: "Om Traders",
		channel: "Email",
		sentAt: "2026-08-11 09:00",
		status: "Sent"
	},
	{
		id: "L005",
		campaignId: "C004",
		campaignName: "Independence Day Pride Sale",
		customerName: "Mahesh Provision",
		channel: "WhatsApp",
		sentAt: "2026-08-11 09:05",
		status: "Read"
	},
	{
		id: "L006",
		campaignId: "C004",
		campaignName: "Independence Day Pride Sale",
		customerName: "Pooja Kirana",
		channel: "SMS",
		sentAt: "2026-08-11 09:10",
		status: "Failed"
	}
];
function getCustomersBySegment(segment) {
	switch (segment) {
		case "VIP": return CUSTOMERS.filter((c) => c.limit >= 2e4);
		case "Credit": return CUSTOMERS.filter((c) => c.opening > 5e3);
		case "Frequent": return CUSTOMERS.filter((c) => c.opening > 0 && c.limit >= 1e4);
		case "Inactive": return CUSTOMERS.filter((c) => c.status !== "Active" || c.opening === 0);
		default: return CUSTOMERS;
	}
}
function syncFestivalCalendar() {
	return new Promise((resolve) => {
		setTimeout(() => {
			FESTIVALS = FESTIVALS.map((f) => {
				if (f.type === "Dynamic") {
					const daysOffset = Math.floor(Math.random() * 5) - 2;
					const dateObj = new Date(f.date);
					dateObj.setDate(dateObj.getDate() + daysOffset);
					const newDateStr = dateObj.toISOString().split("T")[0];
					const today = /* @__PURE__ */ new Date();
					const diffTime = dateObj.getTime() - today.getTime();
					const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
					return {
						...f,
						date: newDateStr,
						daysRemaining: diffDays
					};
				}
				return f;
			});
			resolve(FESTIVALS);
		}, 1200);
	});
}
function runSchedulerTrigger() {
	const newLogs = [];
	(/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	CAMPAIGNS.forEach((c) => {
		if (c.status === "Scheduled") {
			c.status = "Active";
			getCustomersBySegment(c.targetAudience).forEach((cust) => {
				c.deliveryChannels.forEach((ch) => {
					newLogs.push({
						id: `L-${Math.floor(Math.random() * 1e5)}`,
						campaignId: c.id,
						campaignName: c.name,
						customerName: cust.name,
						channel: ch,
						sentAt: (/* @__PURE__ */ new Date()).toLocaleString("en-IN", { hour12: false }),
						status: "Delivered"
					});
				});
			});
		}
	});
	CAMPAIGN_LOGS = [...newLogs, ...CAMPAIGN_LOGS];
	return newLogs;
}
//#endregion
export { runSchedulerTrigger as a, getCustomersBySegment as i, CAMPAIGN_LOGS as n, syncFestivalCalendar as o, FESTIVALS as r, CAMPAIGNS as t };

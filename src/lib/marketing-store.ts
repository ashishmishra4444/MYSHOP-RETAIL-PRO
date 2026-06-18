import { CUSTOMERS } from "./sample-data";

export interface Festival {
  id: string;
  name: string;
  type: "Dynamic" | "Fixed";
  date: string; // YYYY-MM-DD
  daysRemaining: number;
}

export interface Campaign {
  id: string;
  name: string;
  festival: string;
  offerTitle: string;
  message: string;
  discount: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  targetAudience: "All" | "VIP" | "Credit" | "Frequent" | "Inactive";
  deliveryChannels: ("In-App" | "WhatsApp" | "SMS" | "Email")[];
  status: "Draft" | "Scheduled" | "Active" | "Completed";
}

export interface CampaignLog {
  id: string;
  campaignId: string;
  campaignName: string;
  customerName: string;
  channel: "In-App" | "WhatsApp" | "SMS" | "Email";
  sentAt: string;
  status: "Sent" | "Delivered" | "Failed" | "Read" | "Clicked";
}

// Global Marketing State Mock
export let FESTIVALS: Festival[] = [
  { id: "F001", name: "Diwali", type: "Dynamic", date: "2026-11-08", daysRemaining: 143 },
  { id: "F002", name: "Holi", type: "Dynamic", date: "2026-03-03", daysRemaining: -107 },
  { id: "F003", name: "Raksha Bandhan", type: "Dynamic", date: "2026-08-28", daysRemaining: 71 },
  { id: "F004", name: "Dussehra", type: "Dynamic", date: "2026-10-19", daysRemaining: 123 },
  { id: "F005", name: "Eid", type: "Dynamic", date: "2026-03-20", daysRemaining: -90 },
  { id: "F006", name: "Durga Puja", type: "Dynamic", date: "2026-10-16", daysRemaining: 120 },
  { id: "F007", name: "New Year", type: "Fixed", date: "2027-01-01", daysRemaining: 197 },
  { id: "F008", name: "Republic Day", type: "Fixed", date: "2027-01-26", daysRemaining: 222 },
  { id: "F009", name: "Independence Day", type: "Fixed", date: "2026-08-15", daysRemaining: 58 },
  { id: "F010", name: "Gandhi Jayanti", type: "Fixed", date: "2026-10-02", daysRemaining: 106 },
  { id: "F011", name: "Christmas", type: "Fixed", date: "2026-12-25", daysRemaining: 190 },
];

export let CAMPAIGNS: Campaign[] = [
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
    deliveryChannels: ["WhatsApp", "SMS", "In-App"],
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
    deliveryChannels: ["WhatsApp", "SMS", "Email", "In-App"],
    status: "Active"
  }
];

export let CAMPAIGN_LOGS: CampaignLog[] = [
  { id: "L001", campaignId: "C003", campaignName: "Holi Colors Bash", customerName: "Rahul Kumar", channel: "WhatsApp", sentAt: "2026-03-02 10:15", status: "Read" },
  { id: "L002", campaignId: "C003", campaignName: "Holi Colors Bash", customerName: "Shyam Store", channel: "SMS", sentAt: "2026-03-02 10:18", status: "Delivered" },
  { id: "L003", campaignId: "C003", campaignName: "Holi Colors Bash", customerName: "Kirana Mart", channel: "In-App", sentAt: "2026-03-02 10:20", status: "Clicked" },
  { id: "L004", campaignId: "C004", campaignName: "Independence Day Pride Sale", customerName: "Om Traders", channel: "Email", sentAt: "2026-08-11 09:00", status: "Sent" },
  { id: "L005", campaignId: "C004", campaignName: "Independence Day Pride Sale", customerName: "Mahesh Provision", channel: "WhatsApp", sentAt: "2026-08-11 09:05", status: "Read" },
  { id: "L006", campaignId: "C004", campaignName: "Independence Day Pride Sale", customerName: "Pooja Kirana", channel: "SMS", sentAt: "2026-08-11 09:10", status: "Failed" }
];

// Customer Segmentation Logic
export function getCustomersBySegment(segment: Campaign["targetAudience"]) {
  switch (segment) {
    case "VIP":
      return CUSTOMERS.filter((c) => c.limit >= 20000);
    case "Credit":
      return CUSTOMERS.filter((c) => c.opening > 5000);
    case "Frequent":
      return CUSTOMERS.filter((c) => c.opening > 0 && c.limit >= 10000);
    case "Inactive":
      return CUSTOMERS.filter((c) => c.status !== "Active" || c.opening === 0);
    case "All":
    default:
      return CUSTOMERS;
  }
}

// Sync calendar with dynamic / public holidays API simulation
export function syncFestivalCalendar(): Promise<Festival[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate updates on Dynamic Festivals
      FESTIVALS = FESTIVALS.map((f) => {
        if (f.type === "Dynamic") {
          // Add/Subtract arbitrary days to show recalculation
          const daysOffset = Math.floor(Math.random() * 5) - 2; 
          const dateObj = new Date(f.date);
          dateObj.setDate(dateObj.getDate() + daysOffset);
          const newDateStr = dateObj.toISOString().split("T")[0];
          
          const today = new Date();
          const diffTime = dateObj.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
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

// Scheduler Simulation Run
export function runSchedulerTrigger(): CampaignLog[] {
  const newLogs: CampaignLog[] = [];
  const todayStr = new Date().toISOString().split("T")[0];

  CAMPAIGNS.forEach((c) => {
    if (c.status === "Scheduled") {
      // If start date matches today, trigger
      // Note: In demo, we will force trigger selected scheduled items
      c.status = "Active";
      const targets = getCustomersBySegment(c.targetAudience);
      
      targets.forEach((cust) => {
        c.deliveryChannels.forEach((ch) => {
          newLogs.push({
            id: `L-${Math.floor(Math.random() * 100000)}`,
            campaignId: c.id,
            campaignName: c.name,
            customerName: cust.name,
            channel: ch,
            sentAt: new Date().toLocaleString("en-IN", { hour12: false }),
            status: "Delivered"
          });
        });
      });
    }
  });

  CAMPAIGN_LOGS = [...newLogs, ...CAMPAIGN_LOGS];
  return newLogs;
}

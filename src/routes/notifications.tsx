import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { useState } from "react";
import { CAMPAIGN_LOGS, runSchedulerTrigger, CampaignLog } from "@/lib/marketing-store";
import { PlayCircle, MessageSquare, ShieldCheck, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notification Center — MyShop Retail Pro" }] }),
  component: NotificationCenter,
});

function NotificationCenter() {
  const [logs, setLogs] = useState<CampaignLog[]>(() => [...CAMPAIGN_LOGS]);
  const [isRunning, setIsRunning] = useState(false);

  // Trigger daily scheduler run simulator
  const handleTriggerScheduler = () => {
    setIsRunning(true);
    setTimeout(() => {
      const addedLogs = runSchedulerTrigger();
      setLogs([...addedLogs, ...CAMPAIGN_LOGS]);
      setIsRunning(false);
      if (addedLogs.length > 0) {
        alert(`Scheduler execution complete! Created ${addedLogs.length} new log entries for scheduled campaigns.`);
      } else {
        alert("Scheduler ran: No scheduled campaigns starting today, or duplicate sends prevented.");
      }
    }, 1000);
  };

  return (
    <DesktopLayout
      fnKeys={[
        { key: "F1", label: "Help" },
        { key: "F2", label: "Run Scheduler", onClick: handleTriggerScheduler },
        { key: "F5", label: "Refresh", tone: "primary", onClick: () => setLogs([...CAMPAIGN_LOGS]) }
      ]}
    >
      <Panel
        title="Notification Center & Broadcast Logs"
        right={
          <button
            onClick={handleTriggerScheduler}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-white text-primary rounded-sm border border-primary hover:bg-slate-50 transition-colors"
          >
            {isRunning ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <PlayCircle className="h-3.5 w-3.5 text-[#0047BA]" />
            )}
            Simulate Daily Scheduler Run (F2)
          </button>
        }
      >
        <div className="space-y-3">
          {/* Logs analytics summary row */}
          <div className="grid grid-cols-5 gap-3">
            <MiniCard label="Total Sent" value={logs.length} icon={MessageSquare} tone="text-primary" />
            <MiniCard label="Delivered" value={logs.filter(l => l.status === "Delivered" || l.status === "Read" || l.status === "Clicked").length} icon={ShieldCheck} tone="text-green-600" />
            <MiniCard label="Read" value={logs.filter(l => l.status === "Read" || l.status === "Clicked").length} icon={MessageSquare} tone="text-indigo-600" />
            <MiniCard label="Clicked / Conversions" value={logs.filter(l => l.status === "Clicked").length} icon={PlayCircle} tone="text-rose-600" />
            <MiniCard label="Failed" value={logs.filter(l => l.status === "Failed").length} icon={MessageSquare} tone="text-destructive" />
          </div>

          <table className="erp-grid">
            <thead>
              <tr>
                <th className="erp-grid-th w-12">S.No</th>
                <th className="erp-grid-th">Voucher/Campaign</th>
                <th className="erp-grid-th">Customer Name</th>
                <th className="erp-grid-th text-center">Channel</th>
                <th className="erp-grid-th">Dispatched At</th>
                <th className="erp-grid-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={l.id} className={i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                  <td className="erp-grid-td text-center">{i + 1}</td>
                  <td className="erp-grid-td font-semibold text-primary">{l.campaignName}</td>
                  <td className="erp-grid-td font-medium">{l.customerName}</td>
                  <td className="erp-grid-td text-center">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border text-xs font-bold">{l.channel}</span>
                  </td>
                  <td className="erp-grid-td text-slate-500 font-mono text-xs">{l.sentAt}</td>
                  <td className="erp-grid-td">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[11px] font-bold ${
                        l.status === "Clicked"
                          ? "bg-rose-500 text-white"
                          : l.status === "Read"
                          ? "bg-indigo-600 text-white"
                          : l.status === "Delivered"
                          ? "bg-green-600 text-white"
                          : l.status === "Failed"
                          ? "bg-red-500 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </DesktopLayout>
  );
}

function MiniCard({ label, value, icon: Icon, tone }: { label: string; value: number; icon: any; tone?: string }) {
  return (
    <div className="erp-panel px-3 py-2.5 flex items-center justify-between bg-white">
      <div>
        <div className="text-[12px] text-muted-foreground">{label}</div>
        <div className={`text-xl font-bold mt-0.5 ${tone}`}>{value}</div>
      </div>
      <Icon className="h-6 w-6 opacity-30 text-[#0047BA]" />
    </div>
  );
}

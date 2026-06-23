import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { useState, useEffect } from "react";
import { CAMPAIGN_LOGS, runSchedulerTrigger, CampaignLog } from "@/lib/marketing-store";
import { PlayCircle, MessageSquare, ShieldCheck, RefreshCw, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notification Center — MyShop Retail Pro" }] }),
  component: NotificationCenter,
});

function NotificationCenter() {
  const [logs, setLogs] = useState<CampaignLog[]>(() => [...CAMPAIGN_LOGS]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Close help on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowHelp(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Trigger daily scheduler run simulator
  const handleTriggerScheduler = () => {
    setIsRunning(true);
    toast.info("Triggering background scheduler execution...");
    setTimeout(() => {
      const addedLogs = runSchedulerTrigger();
      setLogs([...addedLogs, ...CAMPAIGN_LOGS]);
      setIsRunning(false);
      if (addedLogs.length > 0) {
        toast.success(`Scheduler run complete! Dispatched ${addedLogs.length} new campaign log entries.`);
      } else {
        toast.info("Scheduler ran: No scheduled campaigns starting today, or duplicate sends prevented.");
      }
    }, 1000);
  };

  const handleRefresh = () => {
    setLogs([...CAMPAIGN_LOGS]);
    toast.success("Broadcast logs synchronized successfully!");
  };

  return (
    <DesktopLayout
      fnKeys={[
        { key: "F1", label: "Help", onClick: () => { setShowHelp(true); toast.info("Opening Notification Manual..."); } },
        { key: "F2", label: "Run Scheduler", onClick: handleTriggerScheduler },
        { key: "F5", label: "Refresh", tone: "primary", onClick: handleRefresh }
      ]}
    >
      <Panel
        title="Notification Center & Broadcast Logs"
        right={
          <button
            onClick={handleTriggerScheduler}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-white text-primary rounded-sm border border-primary hover:bg-slate-50 transition-colors cursor-pointer"
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

      {/* HELP MODAL */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Broadcast Logs Manual [F1]</span>
              </div>
              <button onClick={() => setShowHelp(false)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <table className="erp-grid w-full bg-white">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Key</th>
                    <th className="erp-grid-th">Action Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">View this manual guide</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Simulate / Execute Daily Scheduler Run</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Sync and reload campaign dispatch logs</td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setShowHelp(false)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}
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

import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { useState } from "react";
import { FESTIVALS, syncFestivalCalendar, Festival } from "@/lib/marketing-store";
import { RefreshCw, Calendar, Sparkles } from "lucide-react";

export const Route = createFileRoute("/festival-calendar")({
  head: () => ({ meta: [{ title: "Festival Calendar — MyShop Retail Pro" }] }),
  component: FestivalCalendar,
});

function FestivalCalendar() {
  const [festivals, setFestivals] = useState<Festival[]>(() => [...FESTIVALS]);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncAPI = () => {
    setIsSyncing(true);
    syncFestivalCalendar().then((updatedList) => {
      setFestivals([...updatedList]);
      setIsSyncing(false);
      alert("Successfully synced with Public Holiday Registry API! Calculated new dynamic festival offsets.");
    });
  };

  return (
    <DesktopLayout
      fnKeys={[
        { key: "F1", label: "Help" },
        { key: "F2", label: "Sync API (F2)", onClick: handleSyncAPI },
        { key: "F5", label: "Refresh", tone: "primary", onClick: () => setFestivals([...FESTIVALS]) }
      ]}
    >
      <Panel
        title="Upcoming Festival Calendar"
        right={
          <button
            onClick={handleSyncAPI}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-white text-primary rounded-sm border border-primary hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            Sync Calendar API (F2)
          </button>
        }
      >
        <div className="space-y-4">
          
          {/* Header Description */}
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-sm text-[12.5px] text-blue-800 flex items-start gap-2">
            <Sparkles className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-900">Holiday &amp; Festival Sync Automations</h4>
              <p className="mt-0.5 opacity-90">
                Fixed-date events trigger on the same date annually. Dynamic festivals calculate new dates automatically on calendar sync.
                Automation rules trigger campaigns 7 days, 3 days, and 1 day before the target festival.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Dynamic Festivals Box */}
            <Panel title="Dynamic Festivals (Lunar/Solar Calendar Offsets)">
              <table className="erp-grid">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Festival Name</th>
                    <th className="erp-grid-th">Trigger Date</th>
                    <th className="erp-grid-th text-center">Countdown</th>
                  </tr>
                </thead>
                <tbody>
                  {festivals
                    .filter(f => f.type === "Dynamic")
                    .map(f => {
                      const isPast = f.daysRemaining < 0;
                      return (
                        <tr key={f.id} className="hover:bg-accent/30">
                          <td className="erp-grid-td font-semibold text-primary">{f.name}</td>
                          <td className="erp-grid-td font-mono">{f.date}</td>
                          <td className="erp-grid-td text-center">
                            {isPast ? (
                              <span className="text-slate-400 text-xs font-semibold">Completed</span>
                            ) : (
                              <span className="text-[#0047BA] font-bold">{f.daysRemaining} days left</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Panel>

            {/* Fixed Festivals Box */}
            <Panel title="Fixed-Date Festivals (Annually Static)">
              <table className="erp-grid">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Festival Name</th>
                    <th className="erp-grid-th">Trigger Date</th>
                    <th className="erp-grid-th text-center">Countdown</th>
                  </tr>
                </thead>
                <tbody>
                  {festivals
                    .filter(f => f.type === "Fixed")
                    .map(f => {
                      const isPast = f.daysRemaining < 0;
                      return (
                        <tr key={f.id} className="hover:bg-accent/30">
                          <td className="erp-grid-td font-semibold text-indigo-700">{f.name}</td>
                          <td className="erp-grid-td font-mono">{f.date}</td>
                          <td className="erp-grid-td text-center">
                            {isPast ? (
                              <span className="text-slate-400 text-xs font-semibold">Completed</span>
                            ) : (
                              <span className="text-[#0047BA] font-bold">{f.daysRemaining} days left</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Panel>

          </div>
        </div>
      </Panel>
    </DesktopLayout>
  );
}

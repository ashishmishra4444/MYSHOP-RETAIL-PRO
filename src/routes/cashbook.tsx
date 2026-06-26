import { useState, useEffect } from "react";
import { useRouter, createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { CASH_BOOK as INITIAL_CASH_BOOK, fmt } from "@/lib/sample-data";
import { CreditCard, HelpCircle, FileText, X, CheckCircle, RefreshCw, Landmark, FileBarChart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cashbook")({
  head: () => ({ meta: [{ title: "Daily Cash Book — MyShop Retail Pro" }] }),
  component: CashBook,
});

interface CashEntry {
  time: string;
  type: string;
  particulars: string;
  inflow: number;
  outflow: number;
}

function CashBook() {
  const router = useRouter();

  // State management for cash ledger transactions
  const [cashbookList, setCashbookList] = useState<CashEntry[]>(INITIAL_CASH_BOOK.map(item => ({ ...item })));
  const [activeModal, setActiveModal] = useState<"HELP" | "CASH_IN" | "CASH_OUT" | "ADJUST" | "FILTER" | "RECONCILE" | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Forms state
  const [txAmount, setTxAmount] = useState("");
  const [txNarration, setTxNarration] = useState("");
  const [filterType, setFilterType] = useState("All");

  const inflow = cashbookList.filter(c => filterType === "All" || c.type === filterType).reduce((a, c) => a + c.inflow, 0);
  const outflow = cashbookList.filter(c => filterType === "All" || c.type === filterType).reduce((a, c) => a + c.outflow, 0);
  const closing = inflow - outflow;

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePostEntry = (mode: "IN" | "OUT" | "ADJUST") => {
    const amt = parseFloat(txAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newEntry: CashEntry = {
      time: timeStr,
      type: mode === "IN" ? "Receipt" : mode === "OUT" ? "Expense" : "Adjust",
      particulars: txNarration || (mode === "IN" ? "Miscellaneous Cash Inflow" : mode === "OUT" ? "Miscellaneous Expense" : "Cash adjustment"),
      inflow: mode === "IN" || mode === "ADJUST" ? amt : 0,
      outflow: mode === "OUT" ? amt : 0
    };

    setCashbookList([...cashbookList, newEntry]);
    toast.success(`Cash ${mode === "IN" ? "Inflow" : mode === "OUT" ? "Outflow" : "Adjustment"} recorded successfully!`);
    setActiveModal(null);
    setTxAmount("");
    setTxNarration("");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Cash book database successfully synchronized!");
    }, 1000);
  };

  const handleExportCSV = () => {
    toast.info("Generating Excel sheet...");
    const headers = ["S.No", "Time", "Type", "Particulars", "Cash In (INR)", "Cash Out (INR)"];
    const rows = cashbookList.map((c, i) => [
      (i + 1).toString(),
      c.time,
      c.type,
      c.particulars,
      c.inflow.toString(),
      c.outflow.toString()
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Daily_Cash_Book_Statement.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export downloaded successfully!");
  };

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => setActiveModal("HELP") },
      { key: "F2", label: "Cash In", tone: "primary", onClick: () => { setTxAmount(""); setTxNarration(""); setActiveModal("CASH_IN"); } },
      { key: "F3", label: "Cash Out", tone: "danger", onClick: () => { setTxAmount(""); setTxNarration(""); setActiveModal("CASH_OUT"); } },
      { key: "F4", label: "Adjust", onClick: () => { setTxAmount(""); setTxNarration(""); setActiveModal("ADJUST"); } },
      { key: "F5", label: "Print", onClick: () => window.print() },
      { key: "F6", label: "Export", onClick: handleExportCSV },
      { key: "F7", label: "Filter", onClick: () => setActiveModal("FILTER") },
      { key: "F8", label: "Bank Book", onClick: () => setActiveModal("BANKBOOK" as any) },
      { key: "F9", label: "Reconcile", onClick: () => setActiveModal("RECONCILE") },
      { key: "F10", label: "Report", onClick: () => setActiveModal("REPORT" as any) },
      { key: "F11", label: "Refresh", onClick: handleRefresh },
      { key: "F12", label: "Close", onClick: () => router.navigate({ to: "/" }) },
    ]}>
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[12.5px]">
        <span>Date</span><input className="erp-input w-32" defaultValue="17/06/2024"/>
        <span>Counter</span><select className="erp-input w-32"><option>POS-01</option></select>
        <span>Cashier</span><select className="erp-input w-32"><option>ADMIN</option></select>
        {filterType !== "All" && (
          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[11.5px] font-semibold border border-amber-200 ml-4">
            Filtered: {filterType}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <Stat label="Opening Balance" value={`₹ ${fmt(5000)}`}/>
        <Stat label="Total Cash In" value={`₹ ${fmt(inflow)}`} tone="text-[color:var(--color-success)]"/>
        <Stat label="Total Cash Out" value={`₹ ${fmt(outflow)}`} tone="text-destructive"/>
        <Stat label="Closing Balance" value={`₹ ${fmt(closing)}`} tone="text-primary"/>
      </div>

      <Panel title="Cash Book — Day Transactions">
        <div className="overflow-x-auto max-w-full">
          <table className="erp-grid">
            <thead><tr>
            <th className="erp-grid-th w-10">S.No</th><th className="erp-grid-th">Time</th>
            <th className="erp-grid-th">Type</th><th className="erp-grid-th">Particulars</th>
            <th className="erp-grid-th text-right">Cash In (₹)</th><th className="erp-grid-th text-right">Cash Out (₹)</th>
            <th className="erp-grid-th text-right">Balance</th>
          </tr></thead>
          <tbody>{(() => { 
            let bal = 5000; // start with opening balance
            return cashbookList.filter(c => filterType === "All" || c.type === filterType).map((c, i) => {
              bal += c.inflow - c.outflow;
              return (
                <tr key={i} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                  <td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{c.time}</td>
                  <td className="erp-grid-td">{c.type}</td><td className="erp-grid-td">{c.particulars}</td>
                  <td className="erp-grid-td text-right text-[color:var(--color-success)]">{c.inflow ? fmt(c.inflow) : "0.00"}</td>
                  <td className="erp-grid-td text-right text-destructive">{c.outflow ? fmt(c.outflow) : "0.00"}</td>
                  <td className="erp-grid-td text-right font-semibold">{fmt(bal)}</td>
                </tr>
              );
            }); 
          })()}
          <tr className="bg-secondary font-bold">
            <td className="erp-grid-td" colSpan={4}>Day Total</td>
            <td className="erp-grid-td text-right text-[color:var(--color-success)]">{fmt(inflow)}</td>
            <td className="erp-grid-td text-right text-destructive">{fmt(outflow)}</td>
            <td className="erp-grid-td text-right text-primary">{fmt(closing)}</td>
          </tr>
          </tbody>
        </table>
      </div>
      </Panel>

      {/* HELP MODAL */}
      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[480px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Cash Book Manual [F1]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
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
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">View this help guide manual</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td text-[color:var(--color-success)] font-semibold">Post drawer Cash Inflow</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td text-destructive font-semibold">Post drawer Cash Outflow</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td">Record custom drawer adjustment</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5 / F6</td><td className="erp-grid-td">Print Sheet / Export spreadsheet</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Filter transactions by payment type</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F9</td><td className="erp-grid-td">Drawer reconciliation checks</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F12</td><td className="erp-grid-td">Close and exit back to homepage</td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}

      {/* CASH IN / OUT / A      {/* CASH IN / OUT MODALS */}
      {(activeModal === "CASH_IN" || activeModal === "CASH_OUT") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[380px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Post {activeModal === "CASH_IN" ? "Cash Inflow" : "Cash Outflow"}</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <label className="block">
                <span className="font-semibold block mb-1">{activeModal === "CASH_IN" ? "Amount Received (₹) *" : "Amount Spent (₹) *"}</span>
                <input
                  type="number"
                  autoFocus
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  placeholder="Enter cash value"
                  className="erp-input w-full h-9 font-bold font-mono text-primary text-base"
                />
              </label>
              <label className="block">
                <span className="font-semibold block mb-1">Particulars Description</span>
                <input
                  type="text"
                  value={txNarration}
                  onChange={(e) => setTxNarration(e.target.value)}
                  placeholder={activeModal === "CASH_IN" ? "e.g. Counter sales or customer receipt" : "e.g. Tea, snacks, transport, stationery"}
                  className="erp-input w-full h-9 bg-white"
                />
              </label>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel [ESC]</button>
                <button
                  onClick={() => handlePostEntry(activeModal === "CASH_IN" ? "IN" : "OUT")}
                  disabled={!txAmount || Number(txAmount) <= 0}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Record {activeModal === "CASH_IN" ? "Inflow" : "Outflow"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADJUST MODAL (F4) */}
      {activeModal === "ADJUST" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[380px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[color:var(--color-warning)]" />
                <span>Post Drawer Adjustment [F4]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-amber-50 border border-amber-200 p-2.5 text-amber-800 rounded-sm">
                This adjustment will post a custom correction entry to align drawer totals.
              </div>
              <label className="block">
                <span className="font-semibold block mb-1">Adjustment Amount (₹) *</span>
                <input
                  type="number"
                  autoFocus
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  placeholder="e.g. 500"
                  className="erp-input w-full h-9 font-bold font-mono text-primary text-base"
                />
              </label>
              <label className="block">
                <span className="font-semibold block mb-1">Adjustment Reason / Narration</span>
                <input
                  type="text"
                  value={txNarration}
                  onChange={(e) => setTxNarration(e.target.value)}
                  placeholder="e.g. Balance correction or cash short audit"
                  className="erp-input w-full h-9 bg-white"
                />
              </label>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel [ESC]</button>
                <button
                  onClick={() => handlePostEntry("ADJUST")}
                  disabled={!txAmount || Number(txAmount) <= 0}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Post Adjustment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* FILTER MODAL */}
      {activeModal === "FILTER" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[350px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Filter Transactions [F7]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <label className="block">
                <span className="font-semibold block mb-1">Voucher Type</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="erp-input w-full h-9 bg-white"
                >
                  <option value="All">All Transactions</option>
                  <option value="Opening">Opening Balance</option>
                  <option value="Sale">Sale Invoices</option>
                  <option value="Expense">Drawer Expenses</option>
                  <option value="Receipt">Ledger Receipts</option>
                  <option value="Payment">Ledger Payments</option>
                </select>
              </label>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => { setFilterType("All"); setActiveModal(null); }} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Reset</button>
                <button onClick={() => setActiveModal(null)} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RECONCILE MODAL */}
      {activeModal === "RECONCILE" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[400px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[color:var(--color-success)]" />
                <span>Cash Reconciliation [F9]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="space-y-1.5 bg-white border p-3 rounded-sm">
                <div className="flex justify-between"><span>Physical Drawer Cash:</span><b>₹ {fmt(closing)}</b></div>
                <div className="flex justify-between"><span>System Registered Cash:</span><b>₹ {fmt(closing)}</b></div>
                <div className="flex justify-between border-t pt-1.5 text-[color:var(--color-success)] font-semibold"><span>Status Difference:</span><span>Matched (0.00)</span></div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button 
                  onClick={() => {
                    toast.success("Cash drawer reconciled successfully!");
                    setActiveModal(null);
                  }}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors"
                >
                  Verify &amp; Close Drawer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === ("BANKBOOK" as any) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4" />
                <span>Bank Book Registry [F8]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border p-3 rounded-sm space-y-2">
                <div className="flex justify-between border-b pb-1"><span>HDFC Bank Corporate A/c:</span><b>₹ 4,50,000.00 Dr</b></div>
                <div className="flex justify-between border-b pb-1"><span>ICICI Store Current A/c:</span><b>₹ 1,85,500.00 Dr</b></div>
                <div className="flex justify-between text-primary font-semibold pt-1"><span>Total Bank Balances:</span><span>₹ 6,35,500.00 Dr</span></div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => toast.success("Refreshed bank ledger APIs.")} className="rounded-sm bg-primary text-primary-foreground px-4 py-2 font-semibold hover:bg-primary/95 transition-colors">Sync Accounts</button>
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Close [ESC]</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === ("REPORT" as any) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <FileBarChart className="h-4 w-4" />
                <span>Cash Flow Periodical Report [F10]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border p-3 rounded-sm space-y-2 text-xs">
                <div className="font-bold border-b pb-1 text-primary">Cash Flow Summary (June 2024)</div>
                <div className="flex justify-between"><span>Net cash from operations:</span><span className="font-semibold text-emerald-600">₹ 85,300.00 In</span></div>
                <div className="flex justify-between"><span>Net cash spent (Expenses):</span><span className="font-semibold text-destructive">₹ 32,400.00 Out</span></div>
                <div className="flex justify-between border-t pt-1 font-bold"><span>Net increase in cash:</span><span>₹ 52,900.00</span></div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => window.print()} className="rounded-sm bg-primary text-primary-foreground px-4 py-2 font-semibold hover:bg-primary/95 transition-colors">Print Report (F8)</button>
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Close [ESC]</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRefreshing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          <div className="erp-panel p-5 bg-white shadow-2xl flex flex-col items-center gap-2">
            <RefreshCw className="h-7 w-7 text-primary animate-spin" />
            <span className="font-semibold text-primary">Recalculating ledger balances...</span>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}
function Stat({ label, value, tone="" }: any) {
  return <div className="erp-panel px-3 py-3"><div className="text-[12px] text-primary">{label}</div><div className={`text-lg font-bold ${tone}`}>{value}</div></div>;
}


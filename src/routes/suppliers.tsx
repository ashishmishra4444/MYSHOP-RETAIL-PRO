import { useState, useEffect } from "react";
import { useRouter, createFileRoute } from "@tanstack/react-router";
import { X, HelpCircle, FileText, Search, CreditCard, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { SUPPLIERS, fmt } from "@/lib/sample-data";

export const Route = createFileRoute("/suppliers")({
  head: () => ({ meta: [{ title: "Supplier Ledger — MyShop Retail Pro" }] }),
  component: Suppliers,
});

const ROWS = [
  ["02/05/2024","PUR/145/24-25","Purchase Invoice","Purchase of Grocery Items",18860,0,18860],
  ["06/05/2024","PUR/152/24-25","Purchase Invoice","Purchase of Daily Items",12450,0,31310],
  ["10/05/2024","PAY/48/24-25","Payment","Payment By Cheque No. 125632",0,10000,21310],
  ["15/05/2024","PUR/168/24-25","Purchase Invoice","Purchase of Beverages",9750,0,31060],
  ["20/05/2024","PAY/55/24-25","Payment","Payment By UPI",0,5000,26060],
  ["25/05/2024","PUR/181/24-25","Purchase Invoice","Purchase of Grocery Items",16300,0,42360],
  ["31/05/2024","PAY/63/24-25","Payment","Payment By Cheque No. 125899",0,15000,27360],
  ["05/06/2024","PUR/195/24-25","Purchase Invoice","Purchase of Household Items",13660,0,41020],
  ["10/06/2024","PAY/72/24-25","Payment","Payment By UPI",0,12000,29020],
  ["14/06/2024","PUR/205/24-25","Purchase Invoice","Purchase of Grocery Items",9750,0,38770],
  ["17/06/2024","PUR/210/24-25","Purchase Invoice","Purchase of Snacks",0,19910,18860],
] as const;

function Suppliers() {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState<string>(SUPPLIERS[0]?.code);
  const [activeModal, setActiveModal] = useState<"HELP" | "PAYMENT" | "SEARCH" | "ADJUST" | "NOTES" | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Bank Transfer");

  // Dynamic ledger transaction state per supplier
  const [ledgers, setLedgers] = useState<Record<string, Array<{
    date: string;
    voucher: string;
    type: string;
    narration: string;
    debit: number;
    credit: number;
    balance: number;
  }>>>({
    SUPP001: ROWS.map(r => ({
      date: r[0],
      voucher: r[1],
      type: r[2],
      narration: r[3],
      debit: r[4],
      credit: r[5],
      balance: r[6]
    }))
  });

  // Supplier Memo Note State
  const [supplierNotes, setSupplierNotes] = useState<Record<string, string>>({
    SUPP001: "Key grocery supplier. Offers 30-day payment term window. Usually settled via bank transfer.",
  });

  const getLedgerForSupplier = (code: string) => {
    if (!ledgers[code]) {
      const sp = SUPPLIERS.find(x => x.code === code) || SUPPLIERS[0];
      return [{
        date: "02/05/2024",
        voucher: "PUR/090/24-25",
        type: "Purchase Invoice",
        narration: "Opening balance setup",
        debit: sp.balance,
        credit: 0,
        balance: sp.balance
      }];
    }
    return ledgers[code];
  };

  const currentLedger = getLedgerForSupplier(selectedCode);
  const s = SUPPLIERS.find((x) => x.code === selectedCode) || SUPPLIERS[0];

  // Totals calculations
  const totalPurchases = currentLedger.filter(l => l.type === "Purchase Invoice").reduce((sum, item) => sum + item.debit, 0);
  const totalPayments = currentLedger.filter(l => l.type === "Payment").reduce((sum, item) => sum + item.credit, 0);
  const currentBalance = currentLedger[currentLedger.length - 1]?.balance ?? s.balance;

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Ledger records successfully updated and synchronized.");
    }, 800);
  };

  const handlePostPayment = () => {
    const amt = parseFloat(paymentAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid payment amount.");
      return;
    }

    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    const voucherNo = `PAY/${String(currentLedger.length + 40).padStart(3, "0")}/24-25`;

    const nextBalance = currentBalance - amt;

    const newTx = {
      date: dateStr,
      voucher: voucherNo,
      type: "Payment",
      narration: `Payment recorded via ${paymentMode}`,
      debit: 0,
      credit: amt,
      balance: nextBalance
    };

    setLedgers({
      ...ledgers,
      [selectedCode]: [...currentLedger, newTx]
    });

    toast.success(`Payment voucher of ₹ ${fmt(amt)} recorded successfully for ${s.name}!`);
    setActiveModal(null);
    setPaymentAmount("");
  };

  const handlePostAdjustment = () => {
    const amt = parseFloat(paymentAmount); // reused amount textfield
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid adjustment amount.");
      return;
    }

    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    const voucherNo = `ADJ/${String(currentLedger.length + 10).padStart(3, "0")}/24-25`;

    const nextBalance = currentBalance + amt; // adjust defaults to debit addition

    const newTx = {
      date: dateStr,
      voucher: voucherNo,
      type: "Journal Adjustment",
      narration: "Adjustment entry posted",
      debit: amt,
      credit: 0,
      balance: nextBalance
    };

    setLedgers({
      ...ledgers,
      [selectedCode]: [...currentLedger, newTx]
    });

    toast.success(`Adjustment of ₹ ${fmt(amt)} recorded successfully for ${s.name}!`);
    setActiveModal(null);
    setPaymentAmount("");
  };

  const handleExportCSV = () => {
    toast.info("Generating Excel sheet...");
    const headers = ["Date", "Voucher No", "Type", "Narration", "Debit (INR)", "Credit (INR)", "Balance"];
    const rows = currentLedger.map(l => [
      l.date,
      l.voucher,
      l.type,
      l.narration,
      l.debit.toString(),
      l.credit.toString(),
      `${l.balance} Dr`
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Supplier_Ledger_${s.code}_${s.name.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Excel/CSV statement downloaded successfully!");
  };

  // Close modals on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => setActiveModal("HELP") },
      { key: "F2", label: "Refresh (F2)", onClick: triggerRefresh },
      { key: "F3", label: "Search (F3)", onClick: () => { setSearchQuery(""); setActiveModal("SEARCH"); } },
      { key: "F4", label: "Payment (F4)", tone: "primary", onClick: () => { setPaymentAmount(""); setActiveModal("PAYMENT"); } },
      { key: "F5", label: "Adjust", onClick: () => { setPaymentAmount(""); setActiveModal("ADJUST"); } },
      { key: "F6", label: "Statement", onClick: () => setActiveModal("STATEMENT") },
      { key: "F7", label: "Export", onClick: handleExportCSV },
      { key: "F8", label: "Print", onClick: () => window.print() },
      { key: "F9", label: "E-Mail", onClick: () => toast.success(`E-mail statement dispatched to ${s.name}'s registered address.`) },
      { key: "F10", label: "SMS", onClick: () => toast.success(`Reminder alert dispatched to ${s.name}'s accounting department.`) },
      { key: "F11", label: "Notes", onClick: () => setActiveModal("NOTES") },
      { key: "F12", label: "Close (F12)", tone: "danger", onClick: () => router.navigate({ to: "/" }) },
    ]}>
      <Panel title="Select Supplier">
        <div className="grid grid-cols-3 gap-3 text-[12.5px]">
          <div>
            <div className="flex items-center gap-2">
              <b>{s.code} — {s.name}</b>
              <button 
                onClick={() => setActiveModal("SEARCH")}
                className="rounded border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold text-primary hover:bg-muted"
              >
                Change (F3)
              </button>
            </div>
            <div className="text-muted-foreground">21, Laxmi Market, Navlakha</div>
            <div className="text-muted-foreground">Indore, MP - 452001</div>
          </div>
          <div className="space-y-1">
            <Row k="Opening Balance" v={`${fmt(s.balance)} Dr`} tone="text-destructive"/>
            <Row k="Credit Limit" v="1,00,000.00"/>
            <Row k="Current Balance" v={`${fmt(currentBalance)} Dr`} tone="text-destructive font-bold"/>
          </div>
          <div className="space-y-1">
            <Row k="Credit Days" v="30"/>
            <Row k="Price Level" v="LEVEL 1"/>
            <Row k="Salesman" v="RAHUL"/>
          </div>
        </div>
      </Panel>

      <div className="mt-3 grid grid-cols-[1fr_320px] gap-3">
        <Panel title="Ledger Details">
          <table className="erp-grid">
            <thead><tr>
              <th className="erp-grid-th">Date</th><th className="erp-grid-th">Voucher No</th><th className="erp-grid-th">Type</th>
              <th className="erp-grid-th">Narration</th><th className="erp-grid-th text-right">Debit</th>
              <th className="erp-grid-th text-right">Credit</th><th className="erp-grid-th text-right">Balance</th>
            </tr></thead>
            <tbody>{currentLedger.map((r, i) => (
              <tr key={i} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                <td className="erp-grid-td">{r.date}</td><td className="erp-grid-td">{r.voucher}</td>
                <td className="erp-grid-td">{r.type}</td><td className="erp-grid-td">{r.narration}</td>
                <td className="erp-grid-td text-right">{r.debit ? fmt(r.debit) : "0.00"}</td>
                <td className="erp-grid-td text-right text-[color:var(--color-success)]">{r.credit ? fmt(r.credit) : "0.00"}</td>
                <td className="erp-grid-td text-right text-destructive">{fmt(r.balance)} Dr</td>
              </tr>
            ))}</tbody>
          </table>
          <div className="mt-2 grid grid-cols-5 gap-2">
            <Stat label="Opening Balance" value={`${fmt(s.balance)} Dr`} tone="text-destructive"/>
            <Stat label="Total Purchases" value={fmt(totalPurchases)}/>
            <Stat label="Total Payments" value={fmt(totalPayments)} tone="text-[color:var(--color-success)]"/>
            <Stat label="Adjustments" value={fmt(currentLedger.filter(l => l.type === "Journal Adjustment").reduce((sum, item) => sum + item.debit, 0))}/>
            <Stat label="Current Balance" value={`${fmt(currentBalance)} Dr`} tone="text-destructive"/>
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="Aging Analysis">
            <div className="space-y-1 text-[12.5px]">
              <Row k="Current (0-30)" v={fmt(currentBalance)}/>
              <Row k="1 - 30 Days" v="0.00"/><Row k="31 - 60 Days" v="0.00"/>
              <Row k="61 - 90 Days" v="0.00"/><Row k="Above 90 Days" v="0.00"/>
              <div className="flex justify-between border-t border-border pt-1.5"><span>Total</span><b>{fmt(currentBalance)}</b></div>
            </div>
          </Panel>
          <Panel title="Last 5 Purchases">
            <table className="erp-grid">
              <thead><tr><th className="erp-grid-th">Date</th><th className="erp-grid-th">Invoice</th><th className="erp-grid-th text-right">Amount</th></tr></thead>
              <tbody>{currentLedger.filter(l => l.type === "Purchase Invoice").slice(-5).reverse().map((l, i) => (
                <tr key={i}><td className="erp-grid-td">{l.date}</td><td className="erp-grid-td">{l.voucher}</td><td className="erp-grid-td text-right">{fmt(l.debit)}</td></tr>
              ))}</tbody>
            </table>
          </Panel>
        </div>
      </div>

      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Supplier Ledger Manual [F1]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <h4 className="font-bold text-primary border-b pb-1">Hotkeys &amp; Commands Reference</h4>
              <table className="erp-grid w-full bg-white">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Key</th>
                    <th className="erp-grid-th">Action Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">Show this Help screen manual</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Sync and refresh active ledger details</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Search &amp; Select a supplier to inspect</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td font-bold text-primary">Post a payment transaction voucher</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Post account journal adjustments</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F6 / F8</td><td className="erp-grid-td">Print ledger statements</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Export details to Excel / CSV format</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F9 / F10</td><td className="erp-grid-td">Send Email / SMS reminder alerts</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F11</td><td className="erp-grid-td">Update account memo note notes</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F12</td><td className="erp-grid-td">Exit and return back to Dashboard</td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "SEARCH" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[500px] max-h-[75vh] flex flex-col rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Search Supplier Registry [F3]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-3 bg-slate-100 border-b border-border">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type supplier name..."
                className="erp-input w-full"
              />
            </div>
            <div className="flex-1 overflow-auto p-3 bg-slate-50">
              <table className="erp-grid w-full">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Name</th>
                    <th className="erp-grid-th">City</th>
                    <th className="erp-grid-th text-right">O/S balance</th>
                    <th className="erp-grid-th text-center">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {SUPPLIERS.filter(sp => sp.name.toLowerCase().includes(searchQuery.toLowerCase())).map((sp) => (
                    <tr key={sp.code}>
                      <td className="erp-grid-td font-semibold text-primary">{sp.name}</td>
                      <td className="erp-grid-td text-muted-foreground">{sp.city}</td>
                      <td className="erp-grid-td text-right font-mono font-bold text-destructive">{fmt(sp.balance)}</td>
                      <td className="erp-grid-td text-center">
                        <button
                          onClick={() => {
                            setSelectedCode(sp.code);
                            setActiveModal(null);
                            toast.success(`Switched account focus to ${sp.name}`);
                          }}
                          className="px-2.5 py-1 bg-primary text-primary-foreground text-[11px] font-semibold rounded-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeModal === "PAYMENT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Post Supplier Payment Voucher [F4]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="flex justify-between items-center bg-amber-50 border border-amber-200 p-2.5 rounded-sm">
                <span className="font-semibold text-amber-800">Supplier Outstanding Balance</span>
                <span className="text-lg font-mono font-bold text-destructive">₹ {fmt(currentBalance)}</span>
              </div>
              <label className="block">
                <span className="font-semibold block mb-1">Enter Payment Amount (₹)</span>
                <input
                  type="number"
                  autoFocus
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="e.g. 5000, 10000"
                  className="erp-input w-full h-9 font-bold font-mono text-primary text-base"
                />
              </label>
              <label className="block">
                <span className="font-semibold block mb-1">Select Payment Account</span>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="erp-input w-full h-9 bg-white"
                >
                  <option>HDFC Bank Transfer</option>
                  <option>Store Cash Drawer</option>
                  <option>UPI Wallet Portal</option>
                </select>
              </label>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel [ESC]</button>
                <button
                  onClick={handlePostPayment}
                  disabled={!paymentAmount || Number(paymentAmount) <= 0}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm Settle (F4)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "ADJUST" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Post Journal Adjustment [F5]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="flex justify-between items-center bg-amber-50 border border-amber-200 p-2.5 rounded-sm">
                <span className="font-semibold text-amber-800">Current Balance</span>
                <span className="text-lg font-mono font-bold text-destructive">₹ {fmt(currentBalance)}</span>
              </div>
              <label className="block">
                <span className="font-semibold block mb-1">Enter Adjustment Amount (₹)</span>
                <input
                  type="number"
                  autoFocus
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="e.g. 1000"
                  className="erp-input w-full h-9 font-bold font-mono text-primary text-base"
                />
              </label>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel [ESC]</button>
                <button
                  onClick={handlePostAdjustment}
                  disabled={!paymentAmount || Number(paymentAmount) <= 0}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Apply Adjust (F5)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "NOTES" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Supplier Account Notes Memo [F11]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <label className="block">
                <span className="font-semibold block mb-1">Supplier Memo Notes</span>
                <textarea
                  autoFocus
                  className="erp-input w-full min-h-24 resize-y p-2"
                  value={supplierNotes[selectedCode] || ""}
                  onChange={(e) => setSupplierNotes({
                    ...supplierNotes,
                    [selectedCode]: e.target.value
                  })}
                  placeholder="Insert payment window agreements or bank memo terms here..."
                />
              </label>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button 
                  onClick={() => {
                    toast.success("Supplier notes memo successfully updated.");
                    setActiveModal(null);
                  }}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95"
                >
                  Save Memo Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "STATEMENT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Supplier Statement Summary [F6]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border p-3 rounded-sm space-y-2">
                <div className="font-bold text-primary border-b pb-1.5">{s.name} ({s.code})</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Opening Balance:</div><div className="font-semibold text-right">₹ {fmt(s.balance)}</div>
                  <div>Total Purchases:</div><div className="font-semibold text-right">₹ {fmt(totalPurchases)}</div>
                  <div>Total Payments:</div><div className="font-semibold text-right text-[color:var(--color-success)]">₹ {fmt(totalPayments)}</div>
                  <div className="border-t pt-1.5 font-bold">Outstanding Balance:</div><div className="border-t pt-1.5 font-bold text-right text-destructive">₹ {fmt(currentBalance)}</div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => window.print()} className="rounded-sm bg-primary text-primary-foreground px-4 py-2 font-semibold hover:bg-primary/95 transition-colors">Print Statement (F8)</button>
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
function Row({ k, v, tone="" }: any) { return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className={tone}>{v}</span></div>; }
function Stat({ label, value, tone="" }: any) { return <div className="erp-panel px-3 py-2"><div className="text-[11.5px] text-primary">{label}</div><div className={`text-[13px] font-bold ${tone}`}>{value}</div></div>; }

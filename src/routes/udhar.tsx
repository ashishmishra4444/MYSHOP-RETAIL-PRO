import { useState, useEffect } from "react";
import { useRouter, createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { LEDGER as INITIAL_LEDGER, CUSTOMERS, fmt } from "@/lib/sample-data";
import { MessageCircle, Bell, X, HelpCircle, FileText, Search, CreditCard, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/udhar")({
  head: () => ({ meta: [{ title: "Udhar Khata — MyShop Retail Pro" }] }),
  component: Udhar,
});

interface LedgerItem {
  date: string;
  voucher: string;
  type: string;
  narration: string;
  debit: number;
  credit: number;
  balance: number;
}

function Udhar() {
  const router = useRouter();

  // Selected customer state
  const [selectedCustCode, setSelectedCustCode] = useState<string>("CUST001");
  const currentCustomer = CUSTOMERS.find((c) => c.code === selectedCustCode) || CUSTOMERS[0];

  // Ledger state per customer
  const [ledgers, setLedgers] = useState<Record<string, LedgerItem[]>>({
    CUST001: INITIAL_LEDGER.map((l) => ({ ...l })),
  });

  // Modal active states
  const [activeModal, setActiveModal] = useState<"HELP" | "SEARCH" | "RECEIPT" | "PAYMENT" | "ADJUST" | "NOTES" | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Notes state
  const [customerNotes, setCustomerNotes] = useState<Record<string, string>>({
    CUST001: "Regular retail customer with good credit score. Settles balances within 30 days.",
  });

  // Transaction Inputs
  const [txAmount, setTxAmount] = useState("");
  const [txNarration, setTxNarration] = useState("");

  const getLedgerForCustomer = (code: string): LedgerItem[] => {
    if (!ledgers[code]) {
      // Generate some dummy initial history based on customer's opening balance
      const cust = CUSTOMERS.find((c) => c.code === code) || CUSTOMERS[0];
      const items: LedgerItem[] = [
        {
          date: "01/05/2024",
          voucher: "INV/098/24-25",
          type: "Sales Invoice",
          narration: "Opening balance setup invoice",
          debit: cust.opening,
          credit: 0,
          balance: cust.opening,
        },
      ];
      return items;
    }
    return ledgers[code];
  };

  const currentLedger = getLedgerForCustomer(selectedCustCode);

  // Totals calculations
  const totalDebit = currentLedger.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = currentLedger.reduce((sum, item) => sum + item.credit, 0);
  const currentBalance = totalDebit - totalCredit;

  const handlePostTransaction = (type: "Receipt" | "Payment" | "Adjustment") => {
    const amt = parseFloat(txAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    const voucherNo = `${type.toUpperCase().substring(0, 4)}/${String(currentLedger.length + 10).padStart(3, "0")}/24-25`;

    let debit = 0;
    let credit = 0;
    if (type === "Payment") {
      debit = amt;
    } else if (type === "Receipt") {
      credit = amt;
    } else {
      // Adjustment
      debit = amt; // default adjustment is debit
    }

    const nextBalance = currentBalance + debit - credit;

    const newTx: LedgerItem = {
      date: dateStr,
      voucher: voucherNo,
      type: type === "Adjustment" ? "Journal Adjustment" : type,
      narration: txNarration || `${type} recorded manually`,
      debit,
      credit,
      balance: nextBalance,
    };

    setLedgers({
      ...ledgers,
      [selectedCustCode]: [...currentLedger, newTx],
    });

    toast.success(`${type} recorded successfully!`);
    setActiveModal(null);
    setTxAmount("");
    setTxNarration("");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Ledger successfully refreshed and synchronized!");
    }, 1000);
  };

  // Keyboard shortcut binds
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered customers for search
  const filteredCustomers = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile.includes(searchQuery)
  );

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => setActiveModal("HELP") },
      { key: "F2", label: "Refresh", onClick: handleRefresh },
      { key: "F3", label: "Search", onClick: () => setActiveModal("SEARCH") },
      { key: "F4", label: "Receipt", tone: "primary", onClick: () => setActiveModal("RECEIPT") },
      { key: "F5", label: "Payment", onClick: () => setActiveModal("PAYMENT") },
      { key: "F6", label: "Adjust", onClick: () => setActiveModal("ADJUST") },
      { key: "F7", label: "Statement", onClick: () => window.print() },
      { key: "F8", label: "Export", onClick: () => {
        toast.info("Generating Excel sheet...");
        
        // Build CSV string from current ledger details
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
        link.setAttribute("download", `Ledger_${currentCustomer.code}_${currentCustomer.name.replace(/\s+/g, "_")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success("Excel/CSV Statement downloaded successfully!");
      } },
      { key: "F9", label: "E-Mail", onClick: () => toast.success(`E-mail statement dispatched to ${currentCustomer.name}'s registered email.`) },
      { key: "F10", label: "SMS", onClick: () => toast.success(`WhatsApp & SMS reminder dispatched to ${currentCustomer.mobile}.`) },
      { key: "F11", label: "Notes", onClick: () => setActiveModal("NOTES") },
      { key: "F12", label: "Close", onClick: () => router.navigate({ to: "/" }) },
    ]}>
      <Panel title="Select Customer">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 text-[12.5px]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <b>{currentCustomer.code} — {currentCustomer.name}</b>
              <button 
                onClick={() => setActiveModal("SEARCH")}
                className="rounded border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold text-primary hover:bg-muted"
              >
                Change (F3)
              </button>
            </div>
            <div className="text-muted-foreground">{currentCustomer.city}, Madhya Pradesh - 452001</div>
            <div className="text-muted-foreground">{currentCustomer.mobile}</div>
          </div>
          <div className="space-y-1">
            <Row k="Opening Balance" v={`${fmt(currentCustomer.opening)} Dr`} tone="text-destructive"/>
            <Row k="Credit Limit" v={fmt(currentCustomer.limit)}/>
            <Row k="Current Balance" v={`${fmt(currentBalance)} Dr`} tone="text-destructive font-bold"/>
          </div>
          <div className="space-y-1">
            <Row k="Credit Days" v="30"/>
            <Row k="Price Level" v="LEVEL 1"/>
            <Row k="Salesman" v="AMIT"/>
          </div>
        </div>
      </Panel>

      <div className="mt-3 grid grid-cols-[1fr_320px] gap-3">
        <Panel title="Ledger Details">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[12.5px]">
            <span>Date From</span><input className="erp-input w-32" defaultValue="01/05/2024"/>
            <span>To</span><input className="erp-input w-32" defaultValue="17/06/2024"/>
            <span>Voucher Type</span><select className="erp-input w-32"><option>All</option></select>
            <button className="rounded-sm bg-primary px-3 py-1 text-primary-foreground" onClick={() => setActiveModal("SEARCH")}>Search (F3)</button>
            <button 
              className="flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-3 py-1 text-white hover:opacity-90"
              onClick={() => toast.success(`WhatsApp reminder sent successfully to ${currentCustomer.mobile}!`)}
            >
              <MessageCircle className="h-3.5 w-3.5"/> WhatsApp Reminder
            </button>
            <button 
              className="flex items-center gap-1 rounded-sm border border-border bg-white px-3 py-1 hover:bg-muted"
              onClick={() => toast.info(`Last reminder sent: 15/06/2024 at 11:30 AM`)}
            >
              <Bell className="h-3.5 w-3.5"/> Reminder Status
            </button>
          </div>
          <table className="erp-grid">
            <thead><tr>
              <th className="erp-grid-th">Date</th><th className="erp-grid-th">Voucher No</th><th className="erp-grid-th">Type</th>
              <th className="erp-grid-th">Ref / Narration</th><th className="erp-grid-th text-right">Debit (₹)</th>
              <th className="erp-grid-th text-right">Credit (₹)</th><th className="erp-grid-th text-right">Balance</th><th className="erp-grid-th">Bal Type</th>
            </tr></thead>
            <tbody>{currentLedger.map((l, i) => (
              <tr key={i} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                <td className="erp-grid-td">{l.date}</td><td className="erp-grid-td">{l.voucher}</td>
                <td className="erp-grid-td">{l.type}</td><td className="erp-grid-td">{l.narration}</td>
                <td className="erp-grid-td text-right">{l.debit ? fmt(l.debit) : "0.00"}</td>
                <td className="erp-grid-td text-right text-[color:var(--color-success)]">{l.credit ? fmt(l.credit) : "0.00"}</td>
                <td className="erp-grid-td text-right text-destructive">{fmt(l.balance)} Dr</td>
                <td className="erp-grid-td text-destructive">Dr</td>
              </tr>
            ))}</tbody>
          </table>
          <div className="mt-2 grid grid-cols-5 gap-2 text-[12.5px]">
            <Stat label="Opening Balance" value={`${fmt(currentCustomer.opening)} Dr`} tone="text-destructive"/>
            <Stat label="Total Debit" value={fmt(totalDebit)}/>
            <Stat label="Total Credit" value={fmt(totalCredit)} tone="text-[color:var(--color-success)]"/>
            <Stat label="Adjustments" value={fmt(currentLedger.filter(l => l.type === "Journal Adjustment").reduce((s,l) => s + l.debit, 0))}/>
            <Stat label="Current Balance" value={`${fmt(currentBalance)} Dr`} tone="text-destructive"/>
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="Aging Analysis (17/06/2024)">
            <div className="space-y-1 text-[12.5px]">
              <Row k="Current (0-30 Days)" v={fmt(currentBalance)}/>
              <Row k="1 - 30 Days" v="0.00"/>
              <Row k="31 - 60 Days" v="0.00"/>
              <Row k="61 - 90 Days" v="0.00"/>
              <Row k="Above 90 Days" v="0.00"/>
              <div className="flex justify-between border-t border-border pt-1.5"><span>Total</span><b>{fmt(currentBalance)}</b></div>
            </div>
          </Panel>
          <Panel title="Last 5 Receipts">
            <table className="erp-grid">
              <thead><tr><th className="erp-grid-th">Date</th><th className="erp-grid-th">Receipt No</th><th className="erp-grid-th text-right">Amount</th></tr></thead>
              <tbody>{currentLedger.filter(l => l.type === "Receipt").slice(-5).reverse().map((l, i) => (
                <tr key={i}><td className="erp-grid-td">{l.date}</td><td className="erp-grid-td">{l.voucher}</td><td className="erp-grid-td text-right">{fmt(l.credit)}</td></tr>
              ))}
              {currentLedger.filter(l => l.type === "Receipt").length === 0 && (
                <tr>
                  <td colSpan={3} className="erp-grid-td text-center text-muted-foreground">No recent receipts recorded</td>
                </tr>
              )}
              </tbody>
            </table>
          </Panel>
        </div>
      </div>

      {/* Database sync / Refreshing animation overlay */}
      {isRefreshing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-xs">
          <div className="erp-panel flex min-w-64 flex-col items-center justify-center p-6 text-center shadow-lg">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            <div className="mt-3 text-sm font-semibold">Synchronizing Ledger...</div>
            <div className="text-[11.5px] text-muted-foreground">Connecting to database endpoints</div>
          </div>
        </div>
      )}

      {/* HELP MODAL */}
      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[500px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5"><HelpCircle className="h-4 w-4"/> Udhar Khata Manual</span>
              <button onClick={() => setActiveModal(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-3 text-[12.5px] space-y-2">
              <p>Welcome to the <b>Udhar Khata (Customer Ledger)</b> manager. Use the following keyboard key combos or clicks to manage customer debt accounts:</p>
              <table className="w-full text-left">
                <tbody>
                  <tr><td className="py-1"><b>F1</b>: View this Help Manual</td><td className="py-1"><b>F2</b>: Refresh customer balances</td></tr>
                  <tr><td className="py-1"><b>F3</b>: Search & swap active customer</td><td className="py-1"><b>F4</b>: Post a Cash Receipt entry</td></tr>
                  <tr><td className="py-1"><b>F5</b>: Post a Cash Payment refund</td><td className="py-1"><b>F6</b>: Post accounting adjustments</td></tr>
                  <tr><td className="py-1"><b>F7</b>: Print complete ledger summary</td><td className="py-1"><b>F8</b>: Export ledger sheet to Excel</td></tr>
                  <tr><td className="py-1"><b>F9</b>: Send PDF statements to E-Mail</td><td className="py-1"><b>F10</b>: Dispatch WhatsApp SMS alerts</td></tr>
                  <tr><td className="py-1"><b>F11</b>: View/Update account memo note</td><td className="py-1"><b>F12</b>: Exit ledger to main page</td></tr>
                </tbody>
              </table>
              <div className="mt-4 flex justify-end gap-2 border-t border-border pt-2">
                <button onClick={() => setActiveModal(null)} className="rounded bg-primary px-4 py-1.5 text-xs text-primary-foreground hover:opacity-90">Close (ESC)</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH / CUSTOMER SWITCH MODAL */}
      {activeModal === "SEARCH" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[450px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5"><Search className="h-4 w-4"/> Find Customer (F3)</span>
              <button onClick={() => setActiveModal(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-3 text-[12.5px] space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="erp-input flex-1"
                  placeholder="Type code, name, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto border border-border rounded bg-white">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-secondary text-[11px] font-semibold border-b border-border">
                      <th className="p-1 px-2">Code</th>
                      <th className="p-1">Name</th>
                      <th className="p-1">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((cust) => (
                      <tr 
                        key={cust.code} 
                        onClick={() => {
                          setSelectedCustCode(cust.code);
                          setActiveModal(null);
                          setSearchQuery("");
                          toast.success(`Switched account focus to ${cust.name}`);
                        }}
                        className={`hover:bg-primary/10 cursor-pointer border-b border-border/50 ${selectedCustCode === cust.code ? "bg-primary/5 font-semibold text-primary" : ""}`}
                      >
                        <td className="p-1.5 px-2">{cust.code}</td>
                        <td className="p-1.5">{cust.name}</td>
                        <td className="p-1.5">{cust.city}</td>
                      </tr>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-3 text-center text-muted-foreground">No matching customers found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-border pt-2">
                <button onClick={() => setActiveModal(null)} className="rounded bg-primary px-4 py-1.5 text-xs text-primary-foreground hover:opacity-90">Close (ESC)</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRANSACTION POSTING MODALS (RECEIPT, PAYMENT, ADJUST) */}
      {(activeModal === "RECEIPT" || activeModal === "PAYMENT" || activeModal === "ADJUST") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[380px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4"/> Post {activeModal === "RECEIPT" ? "Cash Receipt" : activeModal === "PAYMENT" ? "Cash Payment" : "Journal Adjustment"}</span>
              <button onClick={() => setActiveModal(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-3 text-[12.5px] space-y-3">
              <div className="space-y-1">
                <div>Active Account:</div>
                <div className="font-semibold text-primary">{currentCustomer.name} ({currentCustomer.code})</div>
              </div>
              <div className="space-y-1">
                <div>{activeModal === "RECEIPT" ? "Amount Received (₹)" : activeModal === "PAYMENT" ? "Amount Paid / Refunded (₹)" : "Adjustment Amount (₹)"} <span className="text-destructive">*</span></div>
                <input
                  type="number"
                  className="erp-input w-full"
                  placeholder="Enter value in Rupees"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                <div>Voucher Narration / Memo</div>
                <input
                  type="text"
                  className="erp-input w-full"
                  placeholder={activeModal === "RECEIPT" ? "e.g. Cash received or UPI reference" : activeModal === "PAYMENT" ? "e.g. Returned balance or cash refund" : "Adjustment details"}
                  value={txNarration}
                  onChange={(e) => setTxNarration(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-border pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="rounded border border-border bg-secondary px-4 py-1.5 text-xs text-primary font-medium hover:bg-muted"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handlePostTransaction(activeModal === "RECEIPT" ? "Receipt" : activeModal === "PAYMENT" ? "Payment" : "Adjustment")} 
                  className="rounded bg-primary px-4 py-1.5 text-xs text-primary-foreground font-semibold hover:opacity-90"
                >
                  Post {activeModal === "RECEIPT" ? "Receipt" : activeModal === "PAYMENT" ? "Payment" : "Adjustment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* CUSTOMER NOTES MODAL */}
      {activeModal === "NOTES" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[400px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5"><FileText className="h-4 w-4"/> Account Memo Note (F11)</span>
              <button onClick={() => setActiveModal(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-3 text-[12.5px] space-y-3">
              <div className="space-y-1">
                <div>Client Memo: <b>{currentCustomer.name}</b></div>
                <textarea
                  className="erp-input w-full min-h-24 resize-y p-2"
                  value={customerNotes[selectedCustCode] || ""}
                  onChange={(e) => setCustomerNotes({
                    ...customerNotes,
                    [selectedCustCode]: e.target.value
                  })}
                  placeholder="Add details about client terms, collections, or history..."
                  autoFocus
                />
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-border pt-2">
                <button 
                  onClick={() => {
                    toast.success("Memo saved successfully!");
                    setActiveModal(null);
                  }} 
                  className="rounded bg-primary px-4 py-1.5 text-xs text-primary-foreground font-semibold hover:opacity-90"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}

function Row({ k, v, tone="" }: any) { return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className={tone}>{v}</span></div>; }
function Stat({ label, value, tone="" }: any) { return <div className="erp-panel px-3 py-2"><div className="text-[11.5px] text-primary">{label}</div><div className={`text-[13px] font-bold ${tone}`}>{value}</div></div>; }

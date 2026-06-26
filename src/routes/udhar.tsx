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

  // Customers list local state with LocalStorage persistence
  const [customersList, setCustomersList] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_customers");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load customers from localStorage", e);
        }
      }
    }
    return CUSTOMERS;
  });
  const [selectedCustCode, setSelectedCustCode] = useState<string>("CUST001");
  const currentCustomer = customersList.find((c) => c.code === selectedCustCode) || customersList[0];

  // Ledger state per customer with LocalStorage persistence
  const [ledgers, setLedgers] = useState<Record<string, LedgerItem[]>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_ledgers");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load ledgers from localStorage", e);
        }
      }
    }
    return {
      CUST001: INITIAL_LEDGER.map((l) => ({ ...l })),
    };
  });

  // Modal active states
  const [activeModal, setActiveModal] = useState<
    "HELP" | "SEARCH" | "RECEIPT" | "PAYMENT" | "ADJUST" | "NOTES" | "ADD_CUSTOMER" | "EDIT_CUSTOMER" | null
  >(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Notes state with LocalStorage persistence
  const [customerNotes, setCustomerNotes] = useState<Record<string, string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_customernotes");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load customer notes from localStorage", e);
        }
      }
    }
    return {
      CUST001: "Regular retail customer with good credit score. Settles balances within 30 days.",
    };
  });

  // Synchronize states to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_customers", JSON.stringify(customersList));
    }
  }, [customersList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_ledgers", JSON.stringify(ledgers));
    }
  }, [ledgers]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_customernotes", JSON.stringify(customerNotes));
    }
  }, [customerNotes]);

  // Transaction Inputs
  const [txAmount, setTxAmount] = useState("");
  const [txNarration, setTxNarration] = useState("");
  const [txPayMode, setTxPayMode] = useState("Cash");
  const [txRef, setTxRef] = useState("");

  // Add Customer Inputs
  const [newCustName, setNewCustName] = useState("");
  const [newCustMobile, setNewCustMobile] = useState("");
  const [newCustCity, setNewCustCity] = useState("");
  const [newCustOpening, setNewCustOpening] = useState("");
  const [newCustLimit, setNewCustLimit] = useState("10000");

  // Edit Customer Inputs
  const [editCustName, setEditCustName] = useState("");
  const [editCustMobile, setEditCustMobile] = useState("");
  const [editCustCity, setEditCustCity] = useState("");
  const [editCustLimit, setEditCustLimit] = useState("");
  const [editCustStatus, setEditCustStatus] = useState("Active");

  // Filter States
  const [filterDateFrom, setFilterDateFrom] = useState("01/05/2024");
  const [filterDateTo, setFilterDateTo] = useState(() => {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
  });
  const [filterVoucherType, setFilterVoucherType] = useState("All");

  // Populates Edit form when Edit Modal opens
  useEffect(() => {
    if (activeModal === "EDIT_CUSTOMER" && currentCustomer) {
      setEditCustName(currentCustomer.name);
      setEditCustMobile(currentCustomer.mobile);
      setEditCustCity(currentCustomer.city);
      setEditCustLimit(currentCustomer.limit.toString());
      setEditCustStatus(currentCustomer.status || "Active");
    }
  }, [activeModal, currentCustomer]);

  const getLedgerForCustomer = (code: string): LedgerItem[] => {
    if (!ledgers[code]) {
      const cust = customersList.find((c) => c.code === code) || customersList[0];
      const items: LedgerItem[] = [
        {
          date: "01/05/2024",
          voucher: "INV/098/24-25",
          type: "Sales Invoice",
          narration: "Opening balance setup invoice",
          debit: cust ? cust.opening : 0,
          credit: 0,
          balance: cust ? cust.opening : 0,
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

    // Check credit limit warning for debit postings (Payment or Adjustment)
    if (type === "Payment" || type === "Adjustment") {
      const projectedBalance = currentBalance + amt;
      if (projectedBalance > currentCustomer.limit) {
        toast.warning(`Warning: Transaction exceeds Credit Limit of ₹${fmt(currentCustomer.limit)}. Proceeding with override.`);
      }
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

    // Enriched narration containing Mode/Ref if available
    let narrationString = txNarration || `${type} recorded manually`;
    if ((type === "Receipt" || type === "Payment") && txPayMode) {
      narrationString += ` [Mode: ${txPayMode}${txRef ? `, Ref: ${txRef}` : ""}]`;
    }

    const newTx: LedgerItem = {
      date: dateStr,
      voucher: voucherNo,
      type: type === "Adjustment" ? "Journal Adjustment" : type,
      narration: narrationString,
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
    setTxPayMode("Cash");
    setTxRef("");
  };

  const handleAddCustomer = () => {
    if (!newCustName.trim()) {
      toast.error("Client Name is required");
      return;
    }
    const nextNum = customersList.length + 1;
    const newCode = `CUST${String(nextNum).padStart(3, "0")}`;
    const openingVal = parseFloat(newCustOpening) || 0;
    const limitVal = parseFloat(newCustLimit) || 10000;

    const newCust = {
      code: newCode,
      name: newCustName,
      mobile: newCustMobile || "N/A",
      city: newCustCity || "Indore",
      opening: openingVal,
      limit: limitVal,
      status: "Active"
    };

    setCustomersList([...customersList, newCust]);
    setSelectedCustCode(newCode);
    setActiveModal(null);

    // Clear inputs
    setNewCustName("");
    setNewCustMobile("");
    setNewCustCity("");
    setNewCustOpening("");
    setNewCustLimit("10000");

    toast.success(`Client ${newCust.name} created successfully under ${newCode}`);
  };

  const handleEditCustomer = () => {
    if (!editCustName.trim()) {
      toast.error("Client Name is required");
      return;
    }
    const updatedList = customersList.map((c) => {
      if (c.code === selectedCustCode) {
        return {
          ...c,
          name: editCustName,
          mobile: editCustMobile,
          city: editCustCity,
          limit: parseFloat(editCustLimit) || c.limit,
          status: editCustStatus
        };
      }
      return c;
    });

    setCustomersList(updatedList);
    setActiveModal(null);
    toast.success(`Client ${selectedCustCode} details updated!`);
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
  const filteredCustomers = customersList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile.includes(searchQuery)
  );

  // Helper date parser
  const parseDate = (dStr: string) => {
    const parts = dStr.split("/");
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(dStr);
  };

  // Dynamic aging analysis
  const getAgingValues = () => {
    let remBalance = currentBalance;
    let current0_30 = 0;
    let days1_30 = 0;
    let days31_60 = 0;
    let days61_90 = 0;
    let above90 = 0;

    const referenceDate = new Date(2024, 5, 17); // representing 17/06/2024

    const sortedDebits = [...currentLedger]
      .filter((item) => item.debit > 0)
      .reverse();

    for (const item of sortedDebits) {
      if (remBalance <= 0) break;
      const itemDate = parseDate(item.date);
      const diffTime = referenceDate.getTime() - itemDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const alloc = Math.min(item.debit, remBalance);
      remBalance -= alloc;

      if (diffDays <= 0) {
        current0_30 += alloc;
      } else if (diffDays <= 30) {
        days1_30 += alloc;
      } else if (diffDays <= 60) {
        days31_60 += alloc;
      } else if (diffDays <= 90) {
        days61_90 += alloc;
      } else {
        above90 += alloc;
      }
    }

    if (remBalance > 0) {
      above90 += remBalance;
    }

    return { current0_30, days1_30, days31_60, days61_90, above90 };
  };

  const aging = getAgingValues();

  // Filtered Ledger grid
  const filteredLedger = currentLedger.filter((l) => {
    if (filterVoucherType !== "All") {
      if (filterVoucherType === "Sales Invoice" && l.type !== "Sales Invoice") return false;
      if (filterVoucherType === "Receipt" && l.type !== "Receipt") return false;
      if (filterVoucherType === "Payment" && l.type !== "Payment") return false;
      if (filterVoucherType === "Journal Adjustment" && l.type !== "Journal Adjustment") return false;
    }
    
    const lDate = parseDate(l.date);
    if (filterDateFrom) {
      const fromDate = parseDate(filterDateFrom);
      if (lDate < fromDate) return false;
    }
    if (filterDateTo) {
      const toDate = parseDate(filterDateTo);
      if (lDate > toDate) return false;
    }
    return true;
  });

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => setActiveModal("HELP") },
      { key: "F2", label: "Refresh", onClick: handleRefresh },
      { key: "F3", label: "Search", onClick: () => setActiveModal("SEARCH") },
      { key: "F4", label: "Receipt", tone: "primary", onClick: () => setActiveModal("RECEIPT") },
      { key: "F5", label: "Payment", onClick: () => setActiveModal("PAYMENT") },
      { key: "F6", label: "Adjustment (Dr/Cr)", onClick: () => setActiveModal("ADJUST") },
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
          l.balance < 0 ? `${fmt(Math.abs(l.balance))} Cr` : `${fmt(l.balance)} Dr`
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12.5px]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <b>{currentCustomer.code} — {currentCustomer.name}</b>
              <button 
                onClick={() => setActiveModal("SEARCH")}
                className="rounded border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold text-primary hover:bg-muted cursor-pointer"
              >
                Change (F3)
              </button>
              <button 
                onClick={() => setActiveModal("ADD_CUSTOMER")}
                className="rounded border border-[color:var(--color-success)] bg-[color:var(--color-success)] px-2 py-0.5 text-[11px] font-semibold text-white hover:opacity-90 cursor-pointer"
              >
                + New Client
              </button>
              <button 
                onClick={() => setActiveModal("EDIT_CUSTOMER")}
                className="rounded border border-border bg-white px-2 py-0.5 text-[11px] font-semibold text-foreground hover:bg-muted cursor-pointer"
              >
                Edit Client
              </button>
              {currentBalance > currentCustomer.limit && (
                <span className="animate-pulse rounded bg-destructive px-1.5 py-0.5 text-[10px] font-extrabold text-white">OVER LIMIT</span>
              )}
            </div>
            <div className="text-muted-foreground">{currentCustomer.city}, Madhya Pradesh - 452001</div>
            <div className="text-muted-foreground">{currentCustomer.mobile}</div>
          </div>
          <div className="space-y-1">
            <Row k="Opening Balance" v={currentCustomer.opening < 0 ? `${fmt(Math.abs(currentCustomer.opening))} Cr` : `${fmt(currentCustomer.opening)} Dr`} tone={currentCustomer.opening < 0 ? "text-[color:var(--color-success)]" : "text-destructive"}/>
            <Row k="Credit Limit" v={fmt(currentCustomer.limit)}/>
            <Row k="Current Balance" v={currentBalance < 0 ? `${fmt(Math.abs(currentBalance))} Cr` : `${fmt(currentBalance)} Dr`} tone={currentBalance > currentCustomer.limit ? "text-destructive font-bold underline" : currentBalance < 0 ? "text-[color:var(--color-success)] font-bold" : "text-destructive font-bold"}/>
          </div>
          <div className="space-y-1">
            <Row k="Credit Days" v="30"/>
            <Row k="Price Level" v="LEVEL 1"/>
            <Row k="Salesman" v="AMIT"/>
          </div>
        </div>
      </Panel>

      <div className="mt-3 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
        <Panel title="Ledger Details">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[12.5px]">
            <span>Date From</span>
            <input 
              className="erp-input w-32" 
              value={filterDateFrom} 
              onChange={(e) => setFilterDateFrom(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
            <span>To</span>
            <input 
              className="erp-input w-32" 
              value={filterDateTo} 
              onChange={(e) => setFilterDateTo(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
            <span>Voucher Type</span>
            <select 
              className="erp-input w-32"
              value={filterVoucherType}
              onChange={(e) => setFilterVoucherType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Sales Invoice">Sales Invoice</option>
              <option value="Receipt">Receipt</option>
              <option value="Payment">Payment</option>
              <option value="Journal Adjustment">Journal Adjustment</option>
            </select>
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
          <div className="overflow-x-auto max-w-full">
            <table className="erp-grid">
              <thead><tr>
                <th className="erp-grid-th">Date</th><th className="erp-grid-th">Voucher No</th><th className="erp-grid-th">Type</th>
                <th className="erp-grid-th">Ref / Narration</th><th className="erp-grid-th text-right">Debit (₹)</th>
                <th className="erp-grid-th text-right">Credit (₹)</th><th className="erp-grid-th text-right">Balance</th><th className="erp-grid-th">Bal Type</th>
              </tr></thead>
              <tbody>
                {filteredLedger.map((l, i) => (
                  <tr key={i} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                    <td className="erp-grid-td">{l.date}</td><td className="erp-grid-td">{l.voucher}</td>
                    <td className="erp-grid-td">{l.type}</td><td className="erp-grid-td">{l.narration}</td>
                    <td className="erp-grid-td text-right">{l.debit ? fmt(l.debit) : "0.00"}</td>
                    <td className="erp-grid-td text-right text-[color:var(--color-success)]">{l.credit ? fmt(l.credit) : "0.00"}</td>
                    <td className={`erp-grid-td text-right ${l.balance < 0 ? "text-[color:var(--color-success)]" : "text-destructive"}`}>{l.balance < 0 ? `${fmt(Math.abs(l.balance))} Cr` : `${fmt(l.balance)} Dr`}</td>
                    <td className={`erp-grid-td ${l.balance < 0 ? "text-[color:var(--color-success)] font-semibold" : "text-destructive"}`}>{l.balance < 0 ? "Cr" : "Dr"}</td>
                  </tr>
                ))}
                {filteredLedger.length === 0 && (
                  <tr>
                    <td colSpan={8} className="erp-grid-td text-center text-muted-foreground p-4">No matching transactions found for this date range/type</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-2 text-[12.5px]">
            <Stat label="Opening Balance" value={currentCustomer.opening < 0 ? `${fmt(Math.abs(currentCustomer.opening))} Cr` : `${fmt(currentCustomer.opening)} Dr`} tone={currentCustomer.opening < 0 ? "text-[color:var(--color-success)]" : "text-destructive"}/>
            <Stat label="Total Debit" value={fmt(totalDebit)}/>
            <Stat label="Total Credit" value={fmt(totalCredit)} tone="text-[color:var(--color-success)]"/>
            <Stat label="Adjustments" value={fmt(currentLedger.filter(l => l.type === "Journal Adjustment").reduce((s,l) => s + l.debit, 0))}/>
            <Stat label="Current Balance" value={currentBalance < 0 ? `${fmt(Math.abs(currentBalance))} Cr` : `${fmt(currentBalance)} Dr`} tone={currentBalance < 0 ? "text-[color:var(--color-success)]" : "text-destructive"}/>
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="Aging Analysis (17/06/2024)">
            <div className="space-y-1 text-[12.5px]">
              <Row k="Current (0-30 Days)" v={fmt(aging.current0_30)}/>
              <Row k="1 - 30 Days" v={fmt(aging.days1_30)}/>
              <Row k="31 - 60 Days" v={fmt(aging.days31_60)}/>
              <Row k="61 - 90 Days" v={fmt(aging.days61_90)}/>
              <Row k="Above 90 Days" v={fmt(aging.above90)}/>
              <div className="flex justify-between border-t border-border pt-1.5"><span>Total</span><b>{fmt(currentBalance)}</b></div>
            </div>
          </Panel>
          <Panel title="Last 5 Receipts">
            <div className="overflow-x-auto max-w-full">
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
            </div>
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
                  <tr><td className="py-1"><b>F3</b>: Search & swap active customer</td><td className="py-1"><b>F4</b>: Receipt (Customer pays shop dues)</td></tr>
                  <tr><td className="py-1"><b>F5</b>: Payment (Shop refunds customer)</td><td className="py-1"><b>F6</b>: Adjust Ledger (Manual bookkeeping edits)</td></tr>
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
              <span className="flex items-center gap-1.5">
                <CreditCard className="h-4 w-4"/> 
                {activeModal === "RECEIPT" 
                  ? "Post Receipt (Customer Pays Us)" 
                  : activeModal === "PAYMENT" 
                  ? "Post Refund (Shop Pays Customer)" 
                  : "Post Journal Adjustment (Manual)"}
              </span>
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
              {(activeModal === "RECEIPT" || activeModal === "PAYMENT") && (
                <>
                  <div className="space-y-1">
                    <div>Payment Mode</div>
                    <select 
                      className="erp-input w-full" 
                      value={txPayMode} 
                      onChange={(e) => setTxPayMode(e.target.value)}
                    >
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <div>Reference No. (UPI ID / Cheque No.)</div>
                    <input
                      type="text"
                      className="erp-input w-full"
                      placeholder="e.g. UPI txn ref number or cheque #"
                      value={txRef}
                      onChange={(e) => setTxRef(e.target.value)}
                    />
                  </div>
                </>
              )}
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
              {((activeModal === "PAYMENT" || activeModal === "ADJUST") && (currentBalance + (parseFloat(txAmount) || 0)) > currentCustomer.limit) && (
                <div className="text-[11px] text-destructive bg-destructive/10 border border-destructive/20 p-2 rounded">
                  ⚠️ This transaction will push the customer outstanding balance above their Credit Limit of ₹{fmt(currentCustomer.limit)}.
                </div>
              )}
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

      {/* ADD CUSTOMER MODAL */}
      {activeModal === "ADD_CUSTOMER" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[400px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5">Create New Client Account</span>
              <button onClick={() => setActiveModal(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-3 text-[12.5px] space-y-3">
              <div className="space-y-1">
                <div>Client Name <span className="text-destructive">*</span></div>
                <input
                  type="text"
                  className="erp-input w-full"
                  placeholder="e.g. John Doe"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                <div>Mobile Number</div>
                <input
                  type="text"
                  className="erp-input w-full"
                  placeholder="e.g. 9876543210"
                  value={newCustMobile}
                  onChange={(e) => setNewCustMobile(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <div>City</div>
                <input
                  type="text"
                  className="erp-input w-full"
                  placeholder="e.g. Indore"
                  value={newCustCity}
                  onChange={(e) => setNewCustCity(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div>Opening Balance (₹)</div>
                  <input
                    type="number"
                    className="erp-input w-full"
                    placeholder="0.00"
                    value={newCustOpening}
                    onChange={(e) => setNewCustOpening(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <div>Credit Limit (₹)</div>
                  <input
                    type="number"
                    className="erp-input w-full"
                    placeholder="10000"
                    value={newCustLimit}
                    onChange={(e) => setNewCustLimit(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-border pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="rounded border border-border bg-secondary px-4 py-1.5 text-xs text-primary font-medium hover:bg-muted"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddCustomer} 
                  className="rounded bg-primary px-4 py-1.5 text-xs text-primary-foreground font-semibold hover:opacity-90"
                >
                  Create Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CUSTOMER MODAL */}
      {activeModal === "EDIT_CUSTOMER" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[400px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5">Edit Client Details ({selectedCustCode})</span>
              <button onClick={() => setActiveModal(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-3 text-[12.5px] space-y-3">
              <div className="space-y-1">
                <div>Client Name <span className="text-destructive">*</span></div>
                <input
                  type="text"
                  className="erp-input w-full"
                  value={editCustName}
                  onChange={(e) => setEditCustName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                <div>Mobile Number</div>
                <input
                  type="text"
                  className="erp-input w-full"
                  value={editCustMobile}
                  onChange={(e) => setEditCustMobile(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <div>City</div>
                <input
                  type="text"
                  className="erp-input w-full"
                  value={editCustCity}
                  onChange={(e) => setEditCustCity(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div>Credit Limit (₹)</div>
                  <input
                    type="number"
                    className="erp-input w-full"
                    value={editCustLimit}
                    onChange={(e) => setEditCustLimit(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <div>Account Status</div>
                  <select 
                    className="erp-input w-full"
                    value={editCustStatus}
                    onChange={(e) => setEditCustStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-border pt-2">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="rounded border border-border bg-secondary px-4 py-1.5 text-xs text-primary font-medium hover:bg-muted"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditCustomer} 
                  className="rounded bg-primary px-4 py-1.5 text-xs text-primary-foreground font-semibold hover:opacity-90"
                >
                  Save Changes
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

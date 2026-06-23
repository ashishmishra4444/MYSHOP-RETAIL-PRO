import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import { SALES_TREND, TOP_SELLING, CUSTOMERS, SUPPLIERS, PRODUCTS, EXPENSES, CASH_BOOK, LEDGER, fmt } from "@/lib/sample-data";
import { TrendingUp, ShoppingBag, ReceiptText, CreditCard, X, HelpCircle, FileText, Settings, RefreshCw } from "lucide-react";
import { CAMPAIGNS, FESTIVALS, CAMPAIGN_LOGS } from "@/lib/marketing-store";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — MyShop Retail Pro" }, { name: "description", content: "Business summary, sales, purchases and profit overview." }] }),
  component: Dashboard,
});

function Kpi({ icon: Icon, label, value, tone, onClick }: { icon: any; label: string; value: string; tone: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`erp-panel flex items-center gap-3 px-3 py-3 ${onClick ? "cursor-pointer hover:bg-primary/5 transition-colors" : ""}`}>
      <div className={`grid h-10 w-10 place-items-center rounded-sm ${tone}`}><Icon className="h-5 w-5 text-white"/></div>
      <div>
        <div className="text-[12px] text-primary font-medium">{label}</div>
        <div className="text-lg font-bold text-foreground">{value}</div>
      </div>
    </div>
  );
}
function Mini({ label, value, tone = "", onClick }: any) {
  return (
    <div onClick={onClick} className={`erp-panel px-3 py-2.5 ${onClick ? "cursor-pointer hover:bg-primary/5 transition-colors" : ""}`}>
      <div className="text-[12px] text-muted-foreground">{label}</div>
      <div className={`text-lg font-bold ${tone}`}>{value}</div>
    </div>
  );
}

function Dashboard() {
  const [productList, setProductList] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_products");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load products from localStorage", e);
        }
      }
    }
    return PRODUCTS;
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const profit = [{ name: "Gross", value: 27080, c: "var(--color-chart-2)" }, { name: "Exp", value: 9650, c: "var(--color-destructive)" }];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerRefresh = () => {
    setIsRefreshing(true);
    toast.info("Syncing all ERP databases...");
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("ERP databases successfully synchronized!");
    }, 1000);
  };
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => { setActiveModal("HELP"); toast.info("Opening System Reference Guide..."); } },
      { key: "F2", label: "Sales Summary", onClick: () => { setActiveModal("SALES"); toast.info("Loading Sales Summary..."); } },
      { key: "F3", label: "Purchase Summary", onClick: () => { setActiveModal("PURCHASE"); toast.info("Loading Purchase Summary..."); } },
      { key: "F4", label: "Stock Summary", onClick: () => { setActiveModal("STOCK"); toast.info("Loading Stock Valuation..."); } },
      { key: "F5", label: "Receivable", onClick: () => { setActiveModal("RECEIVABLE"); toast.info("Loading Customer Receivables..."); } },
      { key: "F6", label: "Payable", onClick: () => { setActiveModal("PAYABLE"); toast.info("Loading Supplier Payables..."); } },
      { key: "F7", label: "Cash/Bank", onClick: () => { setActiveModal("CASHBANK"); toast.info("Loading Cash & Bank Ledgers..."); } },
      { key: "F8", label: "Day Book", onClick: () => { setActiveModal("DAYBOOK"); toast.info("Opening Daily Day Book..."); } },
      { key: "F9", label: "Trial Balance", onClick: () => { setActiveModal("TRIAL"); toast.info("Loading Trial Balance..."); } },
      { key: "F10", label: "Profit & Loss", onClick: () => { setActiveModal("PL"); toast.info("Opening Profit & Loss Statement..."); } },
      { key: "F11", label: "Balance Sheet", onClick: () => { setActiveModal("BALANCE"); toast.info("Opening Balance Sheet..."); } },
      { key: "F12", label: "Refresh", tone: "primary", onClick: triggerRefresh },
    ]}>
      <Panel title="Dashboard / Business Summary">
        <div className="grid grid-cols-[220px_1fr] gap-3">
          <div className="erp-panel p-3 space-y-2">
            <div className="text-[12px] font-semibold text-primary">Date Filter</div>
            <label className="block text-[12px]">From Date<input className="erp-input mt-1 w-full" defaultValue="01/06/2024"/></label>
            <label className="block text-[12px]">To Date<input className="erp-input mt-1 w-full" defaultValue="17/06/2024"/></label>
            <button onClick={triggerRefresh} className="mt-2 w-full rounded-sm bg-primary py-1.5 text-primary-foreground text-[12.5px] hover:bg-primary/90">↻ Refresh</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <Kpi onClick={() => { setActiveModal("SALES"); toast.info("Loading Sales Summary..."); }} icon={TrendingUp} label="Sales (This Month)" value={`₹ ${fmt(125430)}`} tone="bg-[color:var(--color-chart-1)]"/>
            <Kpi onClick={() => { setActiveModal("PURCHASE"); toast.info("Loading Purchase Summary..."); }} icon={ShoppingBag} label="Purchase (This Month)" value={`₹ ${fmt(98350)}`} tone="bg-[color:var(--color-chart-2)]"/>
            <Kpi onClick={() => { setActiveModal("CASHBANK"); toast.info("Loading Cash & Bank Ledgers..."); }} icon={ReceiptText} label="Receipt (This Month)" value={`₹ ${fmt(130000)}`} tone="bg-[color:var(--color-chart-3)]"/>
            <Kpi onClick={() => { setActiveModal("PAYABLE"); toast.info("Loading Supplier Payables..."); }} icon={CreditCard} label="Payment (This Month)" value={`₹ ${fmt(92650)}`} tone="bg-[color:var(--color-chart-4)]"/>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2">
          <Mini onClick={() => { setActiveModal("STOCK"); toast.info("Loading Stock Valuation..."); }} label="Total Items" value="1,256"/>
          <Mini onClick={() => { setActiveModal("STOCK"); toast.info("Loading Stock Valuation..."); }} label="Low Stock" value="15" tone="text-[color:var(--color-warning)]"/>
          <Mini onClick={() => { setActiveModal("STOCK"); toast.info("Loading Stock Valuation..."); }} label="Out of Stock" value="7" tone="text-destructive"/>
          <Mini onClick={() => { setActiveModal("RECEIVABLE"); toast.info("Loading Customer Receivables..."); }} label="Customers" value="320"/>
          <Mini onClick={() => { setActiveModal("PAYABLE"); toast.info("Loading Supplier Payables..."); }} label="Suppliers" value="125"/>
          <Mini onClick={() => { setActiveModal("SALES"); toast.info("Loading Sales Summary..."); }} label="Invoices (Mo)" value="285"/>
          <Mini onClick={() => { setActiveModal("SALES"); toast.info("Loading Sales Summary..."); }} label="Quotations (Mo)" value="12"/>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="erp-panel">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">Sales Trend (This Month)</div>
            <div className="h-56 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SALES_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 250)"/>
                  <XAxis dataKey="d" fontSize={11}/><YAxis fontSize={11}/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 3 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="erp-panel">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">Top 5 Selling Items</div>
            <table className="erp-grid">
              <thead><tr><th className="erp-grid-th w-8">S.No</th><th className="erp-grid-th">Item Name</th><th className="erp-grid-th text-right">Qty</th><th className="erp-grid-th text-right">Amount</th></tr></thead>
              <tbody>{TOP_SELLING.map((t, i) => (
                <tr key={i}><td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{t.name}</td><td className="erp-grid-td text-right">{t.qty}.000</td><td className="erp-grid-td text-right">{fmt(t.amount)}</td></tr>
              ))}<tr className="bg-secondary font-semibold"><td className="erp-grid-td" colSpan={2}>Total</td><td className="erp-grid-td text-right">585.000</td><td className="erp-grid-td text-right">{fmt(52485)}</td></tr></tbody>
            </table>
          </div>
          <div className="erp-panel">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">Business Profit (This Month)</div>
            <div className="grid grid-cols-2 items-center p-2">
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={profit} dataKey="value" innerRadius={45} outerRadius={70}>{profit.map((p, i) => <Cell key={i} fill={p.c}/>)}</Pie></PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 text-[12.5px]">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-[color:var(--color-chart-2)]"/> Gross Profit</div>
                <div className="pl-5 font-bold">₹ {fmt(27080)} <span className="text-muted-foreground">21.65%</span></div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-destructive"/> Expenses</div>
                <div className="pl-5 font-bold">₹ {fmt(9650)} <span className="text-muted-foreground">7.73%</span></div>
                <div className="mt-2 border-t border-border pt-1.5 text-primary">Net Profit</div>
                <div className="pl-0 text-base font-bold text-primary">₹ {fmt(17430)} <span className="text-muted-foreground text-xs">13.92%</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="erp-panel">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">Payment Due (Customers)</div>
            <table className="erp-grid">
              <thead><tr><th className="erp-grid-th w-8">S.No</th><th className="erp-grid-th">Customer</th><th className="erp-grid-th text-right">Balance</th></tr></thead>
              <tbody>{CUSTOMERS.slice(0,5).map((c, i) => (
                <tr key={c.code}><td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{c.name}</td><td className="erp-grid-td text-right">{fmt(c.opening)}</td></tr>
              ))}<tr className="bg-secondary font-semibold"><td className="erp-grid-td" colSpan={2}>Total</td><td className="erp-grid-td text-right text-destructive">{fmt(37860)}</td></tr></tbody>
            </table>
          </div>
          <div className="erp-panel">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">Purchase Due (Suppliers)</div>
            <table className="erp-grid">
              <thead><tr><th className="erp-grid-th w-8">S.No</th><th className="erp-grid-th">Supplier</th><th className="erp-grid-th text-right">Balance</th></tr></thead>
              <tbody>{SUPPLIERS.map((s, i) => (
                <tr key={s.code}><td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{s.name}</td><td className="erp-grid-td text-right">{fmt(s.balance)}</td></tr>
              ))}<tr className="bg-secondary font-semibold"><td className="erp-grid-td" colSpan={2}>Total</td><td className="erp-grid-td text-right text-destructive">{fmt(53270)}</td></tr></tbody>
            </table>
          </div>
          <div className="erp-panel">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">Stock Value Summary</div>
            <div className="space-y-3 p-4 text-[13px]">
              <div className="flex justify-between"><span>Total Stock Value (Cost)</span><b>₹ {fmt(1265430)}</b></div>
              <div className="flex justify-between"><span>Total Stock Value (MRP)</span><b>₹ {fmt(1875680)}</b></div>
              <div className="flex justify-between"><span>Total Stock Value (Sales)</span><b>₹ {fmt(1642350)}</b></div>
            </div>
          </div>
        </div>

        {/* Festival Campaign Marketing Widgets */}
        <div className="mt-3 grid grid-cols-[1fr_400px] gap-3">
          <div className="erp-panel">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">Active Promotional Campaigns &amp; Broadcast Logs</div>
            <table className="erp-grid">
              <thead>
                <tr>
                  <th className="erp-grid-th">Campaign Name</th>
                  <th className="erp-grid-th">Offer Detail</th>
                  <th className="erp-grid-th">Target</th>
                  <th className="erp-grid-th text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {CAMPAIGNS.slice(0, 4).map(c => (
                  <tr key={c.id}>
                    <td className="erp-grid-td font-semibold">{c.name}</td>
                    <td className="erp-grid-td">{c.offerTitle}</td>
                    <td className="erp-grid-td text-indigo-700 font-semibold">{c.targetAudience}</td>
                    <td className="erp-grid-td text-center">
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                        c.status === "Active"
                          ? "bg-[color:var(--color-success)] text-white"
                          : c.status === "Scheduled"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-500 text-white"
                      }`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="erp-panel">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">Upcoming Festival Countdown</div>
            <table className="erp-grid">
              <thead>
                <tr>
                  <th className="erp-grid-th">Festival</th>
                  <th className="erp-grid-th">Date</th>
                  <th className="erp-grid-th text-center">Countdown</th>
                </tr>
              </thead>
              <tbody>
                {FESTIVALS.filter(f => f.daysRemaining >= 0).slice(0, 4).map(f => (
                  <tr key={f.id}>
                    <td className="erp-grid-td font-semibold">{f.name}</td>
                    <td className="erp-grid-td font-mono">{f.date}</td>
                    <td className="erp-grid-td text-center font-bold text-[#0047BA]">{f.daysRemaining} Days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Panel>

      {/* Floating Refreshing Overlay */}
      {isRefreshing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-xs">
          <div className="erp-panel p-6 flex flex-col items-center gap-3 bg-white shadow-2xl">
            <RefreshCw className="h-8 w-8 text-primary animate-spin" />
            <span className="font-semibold text-primary">Syncing database registers...</span>
          </div>
        </div>
      )}

      {/* Report Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="w-[750px] max-h-[85vh] flex flex-col rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Titlebar */}
            <div className="flex h-8 shrink-0 items-center justify-between bg-titlebar px-3 text-[12.5px] text-titlebar-foreground">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="font-semibold">
                  {activeModal === "HELP" && "System User Manual & Shortcuts [F1]"}
                  {activeModal === "SALES" && "Sales Summary & Recent Invoices [F2]"}
                  {activeModal === "PURCHASE" && "Purchase Entry Summary [F3]"}
                  {activeModal === "STOCK" && "Inventory Stock Valuation Summary [F4]"}
                  {activeModal === "RECEIVABLE" && "Customer Outstanding Receivables [F5]"}
                  {activeModal === "PAYABLE" && "Supplier Payables Summary [F6]"}
                  {activeModal === "CASHBANK" && "Cash & Bank Account Ledger [F7]"}
                  {activeModal === "DAYBOOK" && "Daily Day Book Ledger [F8]"}
                  {activeModal === "TRIAL" && "Trial Balance Statement [F9]"}
                  {activeModal === "PL" && "Profit & Loss Account [F10]"}
                  {activeModal === "BALANCE" && "Period Balance Sheet [F11]"}
                </span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-4 bg-slate-50 text-[12.5px]">
              
              {/* HELP (F1) */}
              {activeModal === "HELP" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <h3 className="text-sm font-bold text-primary flex items-center gap-1.5 border-b pb-1.5">
                    <HelpCircle className="h-4 w-4" /> System Reference Guide
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Welcome to <b>MyShop Retail Pro</b>. Use the active Hotkeys on your keyboard or tap buttons directly on the screen to trigger ledger reports, stock checks, and invoice tools instantly.
                  </p>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th w-28">Hotkey</th>
                        <th className="erp-grid-th">Function Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">System User Manual &amp; Reference Shortcuts</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Sales Summary &amp; Recent Invoices</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Purchase summary log entries</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td">Stock counts, valuations, and low-level items</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Customer outstanding receivables listing</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F6</td><td className="erp-grid-td">Supplier accounts payable balances</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Cash &amp; Bank balances ledger summary</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F8</td><td className="erp-grid-td">Daily Day Book transactional ledger</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F9</td><td className="erp-grid-td">Trial Balance status summary</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F10</td><td className="erp-grid-td">Period Gross &amp; Net Profit P&amp;L statement</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F11</td><td className="erp-grid-td">Assets vs. Liabilities Balance Sheet</td></tr>
                      <tr><td className="erp-grid-td font-bold font-mono">F12</td><td className="erp-grid-td">Full sync with server databases</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* SALES (F2) */}
              {activeModal === "SALES" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Monthly Sales Invoices Summary</span>
                    <span className="font-mono text-xs text-muted-foreground">Filter: Current Month</span>
                  </div>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th">Date</th>
                        <th className="erp-grid-th">Invoice No</th>
                        <th className="erp-grid-th">Particulars</th>
                        <th className="erp-grid-th text-right">Inflow Amt (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CASH_BOOK.filter(item => item.type === "Sale").map((s, idx) => (
                        <tr key={idx}>
                          <td className="erp-grid-td font-mono">15/06/2026</td>
                          <td className="erp-grid-td font-semibold text-primary">{s.particulars.split(" - ")[1] || "INV/142"}</td>
                          <td className="erp-grid-td">{s.particulars}</td>
                          <td className="erp-grid-td text-right font-bold text-success">{fmt(s.inflow)}</td>
                        </tr>
                      ))}
                      <tr className="bg-secondary font-semibold">
                        <td className="erp-grid-td" colSpan={3}>Aggregate Inflow</td>
                        <td className="erp-grid-td text-right text-success">{fmt(4910)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* PURCHASE (F3) */}
              {activeModal === "PURCHASE" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Recent Supplier Purchases Log</span>
                    <span className="font-mono text-xs text-muted-foreground">Filter: All Vendors</span>
                  </div>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th">Voucher Date</th>
                        <th className="erp-grid-th">Purchase No</th>
                        <th className="erp-grid-th">Supplier Vendor</th>
                        <th className="erp-grid-th text-right">Outflow Amt (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="erp-grid-td font-mono">12/06/2026</td>
                        <td className="erp-grid-td font-mono">PUR/890</td>
                        <td className="erp-grid-td font-semibold text-primary">Devgiri Traders</td>
                        <td className="erp-grid-td text-right font-bold text-destructive">{fmt(12500)}</td>
                      </tr>
                      <tr>
                        <td className="erp-grid-td font-mono">14/06/2026</td>
                        <td className="erp-grid-td font-mono">PUR/891</td>
                        <td className="erp-grid-td font-semibold text-primary">Shree Distributors</td>
                        <td className="erp-grid-td text-right font-bold text-destructive">{fmt(8450)}</td>
                      </tr>
                      <tr className="bg-secondary font-semibold">
                        <td className="erp-grid-td" colSpan={3}>Aggregate Outflow</td>
                        <td className="erp-grid-td text-right text-destructive">{fmt(20950)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* STOCK (F4) */}
              {activeModal === "STOCK" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Real-time Stock Items Inventory</span>
                    <span className="font-mono text-xs text-muted-foreground">Total: {productList.length} Skus</span>
                  </div>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th">Code</th>
                        <th className="erp-grid-th">Item Name</th>
                        <th className="erp-grid-th">Brand</th>
                        <th className="erp-grid-th text-right">MRP (₹)</th>
                        <th className="erp-grid-th text-right">Current Stock</th>
                        <th className="erp-grid-th text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((p) => {
                        const isLow = p.stock <= p.reorder;
                        return (
                          <tr key={p.code}>
                            <td className="erp-grid-td font-mono">{p.code}</td>
                            <td className="erp-grid-td font-semibold">{p.name}</td>
                            <td className="erp-grid-td text-muted-foreground">{p.brand}</td>
                            <td className="erp-grid-td text-right">{fmt(p.mrp)}</td>
                            <td className="erp-grid-td text-right font-mono font-bold">{p.stock}</td>
                            <td className="erp-grid-td text-center">
                              <span className={`px-1.5 py-0.5 rounded-xs text-[9.5px] font-bold ${
                                isLow ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                              }`}>{isLow ? "Low Stock" : "Healthy"}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* RECEIVABLE (F5) */}
              {activeModal === "RECEIVABLE" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Customer Outstanding Receivables</span>
                    <span className="font-mono text-xs text-muted-foreground">Credit Ledger</span>
                  </div>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th">Code</th>
                        <th className="erp-grid-th">Customer Name</th>
                        <th className="erp-grid-th">Mobile</th>
                        <th className="erp-grid-th text-right font-mono">Limit (₹)</th>
                        <th className="erp-grid-th text-right">Outstanding Bal (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CUSTOMERS.map((c) => (
                        <tr key={c.code}>
                          <td className="erp-grid-td font-mono">{c.code}</td>
                          <td className="erp-grid-td font-semibold text-primary">{c.name}</td>
                          <td className="erp-grid-td text-muted-foreground font-mono">{c.mobile}</td>
                          <td className="erp-grid-td text-right font-mono">{fmt(c.limit)}</td>
                          <td className={`erp-grid-td text-right font-bold ${c.opening > 5000 ? "text-destructive" : ""}`}>{fmt(c.opening)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PAYABLE (F6) */}
              {activeModal === "PAYABLE" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Supplier Accounts Payable Outstanding</span>
                    <span className="font-mono text-xs text-muted-foreground">Vendor Ledger</span>
                  </div>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th">Code</th>
                        <th className="erp-grid-th">Supplier Vendor</th>
                        <th className="erp-grid-th">City Location</th>
                        <th className="erp-grid-th text-right">Credit Limit (₹)</th>
                        <th className="erp-grid-th text-right">Payable Balance (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SUPPLIERS.map((s) => (
                        <tr key={s.code}>
                          <td className="erp-grid-td font-mono">{s.code}</td>
                          <td className="erp-grid-td font-semibold text-primary">{s.name}</td>
                          <td className="erp-grid-td text-muted-foreground">{s.city}</td>
                          <td className="erp-grid-td text-right font-mono">{fmt(s.limit)}</td>
                          <td className="erp-grid-td text-right font-bold text-destructive">{fmt(s.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* CASHBANK (F7) */}
              {activeModal === "CASHBANK" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <div className="border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Cash Register &amp; Bank Accounts Balances</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="erp-panel p-3 bg-slate-50">
                      <div className="text-[11px] text-muted-foreground font-semibold uppercase">Cash In-Hand Register</div>
                      <div className="text-lg font-mono font-bold mt-1 text-primary">₹ {fmt(85430)}</div>
                    </div>
                    <div className="erp-panel p-3 bg-slate-50">
                      <div className="text-[11px] text-muted-foreground font-semibold uppercase">HDFC Main Bank A/c</div>
                      <div className="text-lg font-mono font-bold mt-1 text-success">₹ {fmt(450000)}</div>
                    </div>
                    <div className="erp-panel p-3 bg-slate-50">
                      <div className="text-[11px] text-muted-foreground font-semibold uppercase">UPI Wallet Balance</div>
                      <div className="text-lg font-mono font-bold mt-1 text-indigo-600">₹ {fmt(124300)}</div>
                    </div>
                  </div>
                  <h4 className="font-bold text-primary mt-2">Active Banking Details</h4>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th">Account Type</th>
                        <th className="erp-grid-th">Account Number</th>
                        <th className="erp-grid-th text-right">Active Balance (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="erp-grid-td font-semibold">Cash Ledger</td><td className="erp-grid-td text-muted-foreground">Drawer Balance Primary</td><td className="erp-grid-td text-right font-bold">85,430.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Current Account</td><td className="erp-grid-td text-muted-foreground">9087123045610 (HDFC)</td><td className="erp-grid-td text-right font-bold text-success">4,50,000.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Merchant UPI Wallet</td><td className="erp-grid-td text-muted-foreground">myshopretail@okhdfc</td><td className="erp-grid-td text-right font-bold text-success">1,24,300.00</td></tr>
                      <tr className="bg-secondary font-bold"><td className="erp-grid-td" colSpan={2}>Aggregate Liquidity</td><td className="erp-grid-td text-right text-success">₹ {fmt(659730)}</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* DAYBOOK (F8) */}
              {activeModal === "DAYBOOK" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Chronological Daily Day Book Ledger</span>
                    <span className="font-mono text-xs text-muted-foreground">Date: 17/06/2024</span>
                  </div>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th w-16">Time</th>
                        <th className="erp-grid-th w-20">Voucher Type</th>
                        <th className="erp-grid-th">Particulars Narration</th>
                        <th className="erp-grid-th text-right">Inflow (₹)</th>
                        <th className="erp-grid-th text-right">Outflow (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CASH_BOOK.map((cb, idx) => (
                        <tr key={idx}>
                          <td className="erp-grid-td font-mono">{cb.time}</td>
                          <td className="erp-grid-td text-primary font-semibold">{cb.type}</td>
                          <td className="erp-grid-td text-muted-foreground">{cb.particulars}</td>
                          <td className="erp-grid-td text-right font-mono text-success font-semibold">{cb.inflow > 0 ? fmt(cb.inflow) : "0.00"}</td>
                          <td className="erp-grid-td text-right font-mono text-destructive font-semibold">{cb.outflow > 0 ? fmt(cb.outflow) : "0.00"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TRIAL (F9) */}
              {activeModal === "TRIAL" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Period Trial Balance Statement</span>
                    <span className="font-mono text-xs text-muted-foreground">As on Date</span>
                  </div>
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th">Ledger Account Group Name</th>
                        <th className="erp-grid-th text-right">Debit Balance (₹)</th>
                        <th className="erp-grid-th text-right">Credit Balance (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="erp-grid-td font-semibold">Opening Stock Inventory Account</td><td className="erp-grid-td text-right font-mono">12,65,430.00</td><td className="erp-grid-td text-right font-mono">0.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Sales Revenue Accounts</td><td className="erp-grid-td text-right font-mono">0.00</td><td className="erp-grid-td text-right font-mono">1,25,430.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Purchase ledger accounts</td><td className="erp-grid-td text-right font-mono">98,350.00</td><td className="erp-grid-td text-right font-mono">0.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Customer outstanding debts (F5)</td><td className="erp-grid-td text-right font-mono">37,860.00</td><td className="erp-grid-td text-right font-mono">0.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Supplier outstanding payables (F6)</td><td className="erp-grid-td text-right font-mono">0.00</td><td className="erp-grid-td text-right font-mono">53,270.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Cash Drawer ledger balance</td><td className="erp-grid-td text-right font-mono">85,430.00</td><td className="erp-grid-td text-right font-mono">0.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Bank Accounts balances (F7)</td><td className="erp-grid-td text-right font-mono">5,74,300.00</td><td className="erp-grid-td text-right font-mono">0.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Operating expenses accounts (Utilities)</td><td className="erp-grid-td text-right font-mono">9,650.00</td><td className="erp-grid-td text-right font-mono">0.00</td></tr>
                      <tr><td className="erp-grid-td font-semibold">Owners Equity Capital reserves</td><td className="erp-grid-td text-right font-mono">0.00</td><td className="erp-grid-td text-right font-mono">18,92,320.00</td></tr>
                      <tr className="bg-secondary font-bold">
                        <td className="erp-grid-td">Total Balances</td>
                        <td className="erp-grid-td text-right font-mono">₹ 20,71,020.00</td>
                        <td className="erp-grid-td text-right font-mono">₹ 20,71,020.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* PL (F10) */}
              {activeModal === "PL" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm text-xs">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm">Profit &amp; Loss Statement</span>
                    <span className="font-mono text-xs text-muted-foreground">Period: 01/06 - 17/06</span>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border border">
                    {/* Left: Debit/Expenses */}
                    <div className="p-2 space-y-2">
                      <div className="font-bold text-primary border-b pb-1">Expenses / Debits</div>
                      <div className="flex justify-between"><span>To Purchase Cost (COGS)</span><span className="font-mono">{fmt(98350)}</span></div>
                      <div className="flex justify-between"><span>To Store Rent Category</span><span className="font-mono">{fmt(25000)}</span></div>
                      <div className="flex justify-between"><span>To Electricity Utilities</span><span className="font-mono">{fmt(4800)}</span></div>
                      <div className="flex justify-between"><span>To Staff Salaries Category</span><span className="font-mono">{fmt(32000)}</span></div>
                      <div className="flex justify-between"><span>To AC &amp; Broadband Maintenance</span><span className="font-mono">{fmt(4999)}</span></div>
                      <div className="border-t pt-1.5 flex justify-between font-bold text-primary">
                        <span>Net Net Profit Transfer</span>
                        <span className="font-mono">₹ 17,430.00</span>
                      </div>
                    </div>

                    {/* Right: Credit/Revenue */}
                    <div className="p-2 space-y-2">
                      <div className="font-bold text-primary border-b pb-1">Revenues / Credits</div>
                      <div className="flex justify-between"><span>By Sales Invoices (F2)</span><span className="font-mono">{fmt(125430)}</span></div>
                      <div className="flex justify-between"><span>By Gross Profit Margin Transfer</span><span className="font-mono">{fmt(27080)}</span></div>
                      <div className="flex justify-between"><span>By Other Store Commission Rec.</span><span className="font-mono">{fmt(30069)}</span></div>
                    </div>
                  </div>
                  <div className="flex justify-between bg-secondary p-2 font-bold text-primary border-t">
                    <span>Overall P&amp;L Balances</span>
                    <span className="font-mono">₹ 1,82,579.00</span>
                  </div>
                </div>
              )}

              {/* BALANCE (F11) */}
              {activeModal === "BALANCE" && (
                <div className="space-y-3 bg-white p-3 border rounded-sm text-xs">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-primary text-sm font-semibold">Business Balance Sheet</span>
                    <span className="font-mono text-xs text-muted-foreground">Valuation Date: Current</span>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border border">
                    {/* Left: Liabilities */}
                    <div className="p-2 space-y-2">
                      <div className="font-bold text-primary border-b pb-1">Liabilities &amp; Equity</div>
                      <div className="flex justify-between"><span>Capital Reserve Account</span><span className="font-mono">18,92,320.00</span></div>
                      <div className="flex justify-between"><span>Supplier Accounts Payables (F6)</span><span className="font-mono">53,270.00</span></div>
                      <div className="flex justify-between font-bold border-t pt-1 text-primary"><span>Total Capital &amp; Liabilities</span><span className="font-mono">₹ 19,45,590.00</span></div>
                    </div>

                    {/* Right: Assets */}
                    <div className="p-2 space-y-2">
                      <div className="font-bold text-primary border-b pb-1">Assets (Value)</div>
                      <div className="flex justify-between"><span>Stock Valuations Cost (F4)</span><span className="font-mono">12,65,430.00</span></div>
                      <div className="flex justify-between"><span>Customer Outstanding Debts (F5)</span><span className="font-mono">37,860.00</span></div>
                      <div className="flex justify-between"><span>Cash Balance In-Hand Register</span><span className="font-mono">85,430.00</span></div>
                      <div className="flex justify-between"><span>HDFC Current Bank A/c Balances</span><span className="font-mono">5,56,870.00</span></div>
                      <div className="flex justify-between font-bold border-t pt-1 text-primary"><span>Total Assets value</span><span className="font-mono">₹ 19,45,590.00</span></div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="flex h-10 shrink-0 items-center justify-end gap-2 border-t border-border bg-slate-100 px-3">
              <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-1 text-[12px] font-semibold hover:bg-slate-200 transition-colors">
                Close [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}


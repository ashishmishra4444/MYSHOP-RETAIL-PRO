import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import { SALES_TREND, TOP_SELLING, CUSTOMERS, SUPPLIERS, fmt } from "@/lib/sample-data";
import { TrendingUp, ShoppingBag, ReceiptText, CreditCard } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — MyShop Retail Pro" }, { name: "description", content: "Business summary, sales, purchases and profit overview." }] }),
  component: Dashboard,
});

function Kpi({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: string }) {
  return (
    <div className="erp-panel flex items-center gap-3 px-3 py-3">
      <div className={`grid h-10 w-10 place-items-center rounded-sm ${tone}`}><Icon className="h-5 w-5 text-white"/></div>
      <div>
        <div className="text-[12px] text-primary font-medium">{label}</div>
        <div className="text-lg font-bold text-foreground">{value}</div>
      </div>
    </div>
  );
}
function Mini({ label, value, tone = "" }: any) {
  return (
    <div className="erp-panel px-3 py-2.5">
      <div className="text-[12px] text-muted-foreground">{label}</div>
      <div className={`text-lg font-bold ${tone}`}>{value}</div>
    </div>
  );
}

function Dashboard() {
  const profit = [{ name: "Gross", value: 27080, c: "var(--color-chart-2)" }, { name: "Exp", value: 9650, c: "var(--color-destructive)" }];
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "Sales Summary" }, { key: "F3", label: "Purchase Summary" },
      { key: "F4", label: "Stock Summary" }, { key: "F5", label: "Receivable" }, { key: "F6", label: "Payable" },
      { key: "F7", label: "Cash/Bank" }, { key: "F8", label: "Day Book" }, { key: "F9", label: "Trial Balance" },
      { key: "F10", label: "Profit & Loss" }, { key: "F11", label: "Balance Sheet" }, { key: "F12", label: "Refresh", tone: "primary" },
    ]}>
      <Panel title="Dashboard / Business Summary">
        <div className="grid grid-cols-[220px_1fr] gap-3">
          <div className="erp-panel p-3 space-y-2">
            <div className="text-[12px] font-semibold text-primary">Date Filter</div>
            <label className="block text-[12px]">From Date<input className="erp-input mt-1 w-full" defaultValue="01/06/2024"/></label>
            <label className="block text-[12px]">To Date<input className="erp-input mt-1 w-full" defaultValue="17/06/2024"/></label>
            <button className="mt-2 w-full rounded-sm bg-primary py-1.5 text-primary-foreground text-[12.5px] hover:bg-primary/90">↻ Refresh</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <Kpi icon={TrendingUp} label="Sales (This Month)" value={`₹ ${fmt(125430)}`} tone="bg-[color:var(--color-chart-1)]"/>
            <Kpi icon={ShoppingBag} label="Purchase (This Month)" value={`₹ ${fmt(98350)}`} tone="bg-[color:var(--color-chart-2)]"/>
            <Kpi icon={ReceiptText} label="Receipt (This Month)" value={`₹ ${fmt(130000)}`} tone="bg-[color:var(--color-chart-3)]"/>
            <Kpi icon={CreditCard} label="Payment (This Month)" value={`₹ ${fmt(92650)}`} tone="bg-[color:var(--color-chart-4)]"/>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2">
          <Mini label="Total Items" value="1,256"/>
          <Mini label="Low Stock" value="15" tone="text-[color:var(--color-warning)]"/>
          <Mini label="Out of Stock" value="7" tone="text-destructive"/>
          <Mini label="Customers" value="320"/>
          <Mini label="Suppliers" value="125"/>
          <Mini label="Invoices (Mo)" value="285"/>
          <Mini label="Quotations (Mo)" value="12"/>
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
      </Panel>
    </DesktopLayout>
  );
}

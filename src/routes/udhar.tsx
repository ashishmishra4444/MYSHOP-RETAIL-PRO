import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { LEDGER, CUSTOMERS, fmt } from "@/lib/sample-data";
import { MessageCircle, Bell } from "lucide-react";

export const Route = createFileRoute("/udhar")({
  head: () => ({ meta: [{ title: "Udhar Khata — MyShop Retail Pro" }] }),
  component: Udhar,
});

function Udhar() {
  const c = CUSTOMERS[0];
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "Refresh" }, { key: "F3", label: "Search" },
      { key: "F4", label: "Receipt", tone: "primary" }, { key: "F5", label: "Payment" }, { key: "F6", label: "Adjust" },
      { key: "F7", label: "Statement" }, { key: "F8", label: "Export" }, { key: "F9", label: "E-Mail" },
      { key: "F10", label: "SMS" }, { key: "F11", label: "Notes" }, { key: "F12", label: "Close" },
    ]}>
      <Panel title="Select Customer">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 text-[12.5px]">
          <div className="space-y-1">
            <div><b>{c.code} — {c.name}</b></div>
            <div className="text-muted-foreground">{c.city}, Madhya Pradesh - 452001</div>
            <div className="text-muted-foreground">{c.mobile}</div>
          </div>
          <div className="space-y-1">
            <Row k="Opening Balance" v={`${fmt(c.opening)} Dr`} tone="text-destructive"/>
            <Row k="Credit Limit" v={fmt(c.limit)}/>
            <Row k="Current Balance" v={`${fmt(12750)} Dr`} tone="text-destructive font-bold"/>
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
            <button className="rounded-sm bg-primary px-3 py-1 text-primary-foreground">Search (F3)</button>
            <button className="flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-3 py-1 text-white"><MessageCircle className="h-3.5 w-3.5"/> WhatsApp Reminder</button>
            <button className="flex items-center gap-1 rounded-sm border border-border bg-white px-3 py-1"><Bell className="h-3.5 w-3.5"/> Reminder Status</button>
          </div>
          <table className="erp-grid">
            <thead><tr>
              <th className="erp-grid-th">Date</th><th className="erp-grid-th">Voucher No</th><th className="erp-grid-th">Type</th>
              <th className="erp-grid-th">Ref / Narration</th><th className="erp-grid-th text-right">Debit (₹)</th>
              <th className="erp-grid-th text-right">Credit (₹)</th><th className="erp-grid-th text-right">Balance</th><th className="erp-grid-th">Bal Type</th>
            </tr></thead>
            <tbody>{LEDGER.map((l, i) => (
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
            <Stat label="Opening Balance" value={`${fmt(12750)} Dr`} tone="text-destructive"/>
            <Stat label="Total Debit" value={fmt(51130)}/>
            <Stat label="Total Credit" value={fmt(38380)} tone="text-[color:var(--color-success)]"/>
            <Stat label="Adjustments" value="0.00"/>
            <Stat label="Current Balance" value={`${fmt(12750)} Dr`} tone="text-destructive"/>
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="Aging Analysis (17/06/2024)">
            <div className="space-y-1 text-[12.5px]">
              <Row k="Current (0-30 Days)" v={fmt(12750)}/>
              <Row k="1 - 30 Days" v="0.00"/>
              <Row k="31 - 60 Days" v="0.00"/>
              <Row k="61 - 90 Days" v="0.00"/>
              <Row k="Above 90 Days" v="0.00"/>
              <div className="flex justify-between border-t border-border pt-1.5"><span>Total</span><b>{fmt(12750)}</b></div>
            </div>
          </Panel>
          <Panel title="Last 5 Receipts">
            <table className="erp-grid">
              <thead><tr><th className="erp-grid-th">Date</th><th className="erp-grid-th">Receipt No</th><th className="erp-grid-th text-right">Amount</th></tr></thead>
              <tbody>{[
                ["05/06/2024","RCPT/68",1840],["25/05/2024","RCPT/60",6000],
                ["15/05/2024","RCPT/52",3670],["07/05/2024","RCPT/45",5000],["26/04/2024","RCPT/33",8870]
              ].map(([d,n,a]: any, i) => (
                <tr key={i}><td className="erp-grid-td">{d}</td><td className="erp-grid-td">{n}</td><td className="erp-grid-td text-right">{fmt(a)}</td></tr>
              ))}</tbody>
            </table>
          </Panel>
        </div>
      </div>
    </DesktopLayout>
  );
}
function Row({ k, v, tone="" }: any) { return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className={tone}>{v}</span></div>; }
function Stat({ label, value, tone="" }: any) { return <div className="erp-panel px-3 py-2"><div className="text-[11.5px] text-primary">{label}</div><div className={`text-[13px] font-bold ${tone}`}>{value}</div></div>; }

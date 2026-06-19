import { createFileRoute } from "@tanstack/react-router";
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
  const s = SUPPLIERS[0];
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "Refresh" }, { key: "F3", label: "Search" },
      { key: "F4", label: "Payment", tone: "primary" }, { key: "F5", label: "Adjust" }, { key: "F6", label: "Statement" },
      { key: "F7", label: "Export" }, { key: "F8", label: "Print" }, { key: "F9", label: "E-Mail" },
      { key: "F10", label: "SMS" }, { key: "F11", label: "Notes" }, { key: "F12", label: "Close" },
    ]}>
      <Panel title="Select Supplier">
        <div className="grid grid-cols-3 gap-3 text-[12.5px]">
          <div>
            <div><b>{s.code} — {s.name}</b></div>
            <div className="text-muted-foreground">21, Laxmi Market, Navlakha</div>
            <div className="text-muted-foreground">Indore, MP - 452001</div>
          </div>
          <div className="space-y-1">
            <Row k="Opening Balance" v={`${fmt(s.balance)} Dr`} tone="text-destructive"/>
            <Row k="Credit Limit" v="1,00,000.00"/>
            <Row k="Current Balance" v={`${fmt(s.balance)} Dr`} tone="text-destructive font-bold"/>
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
            <tbody>{ROWS.map((r, i) => (
              <tr key={i} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                <td className="erp-grid-td">{r[0]}</td><td className="erp-grid-td">{r[1]}</td>
                <td className="erp-grid-td">{r[2]}</td><td className="erp-grid-td">{r[3]}</td>
                <td className="erp-grid-td text-right">{r[4] ? fmt(r[4]) : "0.00"}</td>
                <td className="erp-grid-td text-right text-[color:var(--color-success)]">{r[5] ? fmt(r[5]) : "0.00"}</td>
                <td className="erp-grid-td text-right text-destructive">{fmt(r[6])} Dr</td>
              </tr>
            ))}</tbody>
          </table>
          <div className="mt-2 grid grid-cols-5 gap-2">
            <Stat label="Opening Balance" value={`${fmt(s.balance)} Dr`} tone="text-destructive"/>
            <Stat label="Total Purchases" value={fmt(98350)}/>
            <Stat label="Total Payments" value={fmt(79490)} tone="text-[color:var(--color-success)]"/>
            <Stat label="Adjustments" value="0.00"/>
            <Stat label="Current Balance" value={`${fmt(s.balance)} Dr`} tone="text-destructive"/>
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="Aging Analysis">
            <div className="space-y-1 text-[12.5px]">
              <Row k="Current (0-30)" v={fmt(s.balance)}/>
              <Row k="1 - 30 Days" v="0.00"/><Row k="31 - 60 Days" v="0.00"/>
              <Row k="61 - 90 Days" v="0.00"/><Row k="Above 90 Days" v="0.00"/>
              <div className="flex justify-between border-t border-border pt-1.5"><span>Total</span><b>{fmt(s.balance)}</b></div>
            </div>
          </Panel>
          <Panel title="Last 5 Purchases">
            <table className="erp-grid">
              <thead><tr><th className="erp-grid-th">Date</th><th className="erp-grid-th">Invoice</th><th className="erp-grid-th text-right">Amount</th></tr></thead>
              <tbody>{[
                ["17/06/2024","PUR/210",19910],["14/06/2024","PUR/205",9750],
                ["05/06/2024","PUR/195",13660],["25/05/2024","PUR/181",16300],["15/05/2024","PUR/168",9750]
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

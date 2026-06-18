import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { CASH_BOOK, fmt } from "@/lib/sample-data";

export const Route = createFileRoute("/cashbook")({
  head: () => ({ meta: [{ title: "Daily Cash Book — MyShop Retail Pro" }] }),
  component: CashBook,
});

function CashBook() {
  const inflow = CASH_BOOK.reduce((a, c) => a + c.inflow, 0);
  const outflow = CASH_BOOK.reduce((a, c) => a + c.outflow, 0);
  const closing = inflow - outflow;
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "Cash In", tone: "primary" }, { key: "F3", label: "Cash Out", tone: "danger" },
      { key: "F4", label: "Adjust" }, { key: "F5", label: "Print" }, { key: "F6", label: "Export" },
      { key: "F7", label: "Filter" }, { key: "F8", label: "Bank Book" }, { key: "F9", label: "Reconcile" },
      { key: "F10", label: "Report" }, { key: "F11", label: "Refresh" }, { key: "F12", label: "Close" },
    ]}>
      <div className="mb-2 flex items-center gap-2 text-[12.5px]">
        <span>Date</span><input className="erp-input w-32" defaultValue="17/06/2024"/>
        <span>Counter</span><select className="erp-input w-32"><option>POS-01</option></select>
        <span>Cashier</span><select className="erp-input w-32"><option>ADMIN</option></select>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-3">
        <Stat label="Opening Balance" value={`₹ ${fmt(5000)}`}/>
        <Stat label="Total Cash In" value={`₹ ${fmt(inflow)}`} tone="text-[color:var(--color-success)]"/>
        <Stat label="Total Cash Out" value={`₹ ${fmt(outflow)}`} tone="text-destructive"/>
        <Stat label="Closing Balance" value={`₹ ${fmt(closing)}`} tone="text-primary"/>
      </div>

      <Panel title="Cash Book — Day Transactions">
        <table className="erp-grid">
          <thead><tr>
            <th className="erp-grid-th w-10">S.No</th><th className="erp-grid-th">Time</th>
            <th className="erp-grid-th">Type</th><th className="erp-grid-th">Particulars</th>
            <th className="erp-grid-th text-right">Cash In (₹)</th><th className="erp-grid-th text-right">Cash Out (₹)</th>
            <th className="erp-grid-th text-right">Balance</th>
          </tr></thead>
          <tbody>{(() => { let bal = 0; return CASH_BOOK.map((c, i) => {
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
          }); })()}
          <tr className="bg-secondary font-bold">
            <td className="erp-grid-td" colSpan={4}>Day Total</td>
            <td className="erp-grid-td text-right">{fmt(inflow)}</td>
            <td className="erp-grid-td text-right">{fmt(outflow)}</td>
            <td className="erp-grid-td text-right text-primary">{fmt(closing)}</td>
          </tr>
          </tbody>
        </table>
      </Panel>
    </DesktopLayout>
  );
}
function Stat({ label, value, tone="" }: any) {
  return <div className="erp-panel px-3 py-3"><div className="text-[12px] text-primary">{label}</div><div className={`text-lg font-bold ${tone}`}>{value}</div></div>;
}

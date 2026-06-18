import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { EXPENSES, fmt } from "@/lib/sample-data";

export const Route = createFileRoute("/expenses")({
  head: () => ({ meta: [{ title: "Expenses — MyShop Retail Pro" }] }),
  component: Expenses,
});

function Expenses() {
  const total = EXPENSES.reduce((a, e) => a + e.amount, 0);
  const byCat = Object.entries(EXPENSES.reduce<Record<string, number>>((m, e) => ({ ...m, [e.category]: (m[e.category]||0) + e.amount }), {}));
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "New", tone: "primary" }, { key: "F3", label: "Edit" },
      { key: "F4", label: "Delete", tone: "danger" }, { key: "F5", label: "Save" }, { key: "F6", label: "Print" },
      { key: "F7", label: "Export" }, { key: "F8", label: "Filter" }, { key: "F9", label: "Report" },
      { key: "F10", label: "Category" }, { key: "F11", label: "Summary" }, { key: "F12", label: "Close" },
    ]}>
      <div className="grid grid-cols-[1fr_360px] gap-3">
        <Panel title="Expense Entries">
          <div className="mb-2 flex gap-2">
            <select className="erp-input w-40"><option>All Categories</option></select>
            <input className="erp-input w-32" defaultValue="01/06/2024"/>
            <span className="self-center text-[12.5px]">to</span>
            <input className="erp-input w-32" defaultValue="17/06/2024"/>
            <button className="rounded-sm bg-primary px-3 text-primary-foreground text-[12.5px]">Search</button>
          </div>
          <table className="erp-grid">
            <thead><tr>
              <th className="erp-grid-th w-10">S.No</th><th className="erp-grid-th">Date</th>
              <th className="erp-grid-th">Category</th><th className="erp-grid-th">Notes</th>
              <th className="erp-grid-th text-right">Amount</th>
            </tr></thead>
            <tbody>{EXPENSES.map((e, i) => (
              <tr key={i} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                <td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{e.date}</td>
                <td className="erp-grid-td">{e.category}</td><td className="erp-grid-td">{e.notes}</td>
                <td className="erp-grid-td text-right">{fmt(e.amount)}</td>
              </tr>
            ))}
            <tr className="bg-secondary font-bold"><td className="erp-grid-td" colSpan={4}>Total</td><td className="erp-grid-td text-right text-destructive">{fmt(total)}</td></tr>
            </tbody>
          </table>
        </Panel>

        <div className="space-y-3">
          <Panel title="Add Expense">
            <div className="space-y-2">
              <Field label="Date"><Input defaultValue="17/06/2024"/></Field>
              <Field label="Category"><Select><option>Rent</option><option>Electricity</option><option>Staff Salary</option><option>Transport</option><option>Internet</option><option>Maintenance</option></Select></Field>
              <Field label="Amount"><Input className="text-right" defaultValue="0.00"/></Field>
              <Field label="Payment Mode"><Select><option>Cash</option><option>Bank</option><option>UPI</option></Select></Field>
              <Field label="Notes"><Input/></Field>
              <button className="mt-2 w-full rounded-sm bg-primary py-2 text-primary-foreground font-semibold">Save Expense</button>
            </div>
          </Panel>
          <Panel title="Monthly Summary">
            <div className="space-y-1 text-[12.5px]">
              {byCat.map(([k,v]) => (
                <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><b>{fmt(v)}</b></div>
              ))}
              <div className="flex justify-between border-t border-border pt-1.5"><span>Total Expenses</span><b className="text-destructive">{fmt(total)}</b></div>
            </div>
          </Panel>
        </div>
      </div>
    </DesktopLayout>
  );
}

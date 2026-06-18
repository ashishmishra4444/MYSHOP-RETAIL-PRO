import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { CUSTOMERS, fmt } from "@/lib/sample-data";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "Customer Master — MyShop Retail Pro" }] }),
  component: Customers,
});

function Customers() {
  const c = CUSTOMERS[0];
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "New" }, { key: "F3", label: "Edit" },
      { key: "F4", label: "Delete", tone: "danger" }, { key: "F5", label: "Save", tone: "primary" },
      { key: "F6", label: "Print" }, { key: "F7", label: "Ledger" }, { key: "F8", label: "Receivable" },
      { key: "F9", label: "SMS" }, { key: "F10", label: "E-Mail" }, { key: "F11", label: "Import" }, { key: "F12", label: "Close" },
    ]}>
      <div className="grid grid-cols-2 gap-3">
        <Panel title="Search / Select Customer">
          <div className="mb-2 flex gap-2">
            <select className="erp-input w-36"><option>Customer Name</option></select>
            <input className="erp-input flex-1" placeholder="Search Text"/>
            <button className="rounded-sm bg-primary px-3 text-primary-foreground text-[12.5px]">Search (F3)</button>
          </div>
          <table className="erp-grid">
            <thead><tr>
              <th className="erp-grid-th w-10">S.No</th><th className="erp-grid-th">Code</th><th className="erp-grid-th">Name</th>
              <th className="erp-grid-th">Mobile</th><th className="erp-grid-th">City</th>
              <th className="erp-grid-th text-right">Opening Bal</th><th className="erp-grid-th text-right">Limit</th><th className="erp-grid-th">Status</th>
            </tr></thead>
            <tbody>{CUSTOMERS.map((c, i) => (
              <tr key={c.code} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                <td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{c.code}</td>
                <td className="erp-grid-td">{c.name}</td><td className="erp-grid-td">{c.mobile}</td>
                <td className="erp-grid-td">{c.city}</td>
                <td className="erp-grid-td text-right text-destructive">{fmt(c.opening)} Dr</td>
                <td className="erp-grid-td text-right">{fmt(c.limit)}</td>
                <td className="erp-grid-td text-[color:var(--color-success)] font-semibold">{c.status}</td>
              </tr>
            ))}</tbody>
          </table>
          <div className="mt-2 grid grid-cols-5 gap-2">
            <Stat label="Total Customers" value="320"/>
            <Stat label="Active" value="315" tone="text-[color:var(--color-success)]"/>
            <Stat label="Inactive" value="5" tone="text-destructive"/>
            <Stat label="Receivable" value={`₹ ${fmt(51130)}`}/>
            <Stat label="Credit Limit" value={`₹ ${fmt(875000)}`}/>
          </div>
        </Panel>

        <Panel title="Customer Details (Edit Mode)">
          <div className="space-y-2">
            <Field label="Customer Code"><Input defaultValue={c.code}/></Field>
            <Field label="Customer Name"><Input defaultValue={c.name}/></Field>
            <Field label="Group"><Select><option>RETAIL CUSTOMERS</option></Select></Field>
            <Field label="Mobile No"><Input defaultValue={c.mobile}/></Field>
            <Field label="E-Mail"><Input defaultValue="rahulkumar@gmail.com"/></Field>
            <Field label="City"><Select><option>{c.city}</option></Select></Field>
            <Field label="Address"><Input defaultValue="Madhya Pradesh — 452001"/></Field>
            <Field label="GST Number"><Input defaultValue="23ABCDE1234F1Z5"/></Field>
            <Field label="Opening Balance"><Input defaultValue={fmt(c.opening)} className="text-right text-destructive"/></Field>
            <Field label="Credit Limit"><Input defaultValue={fmt(c.limit)} className="text-right"/></Field>
            <Field label="Credit Days"><Input defaultValue="30"/></Field>
            <Field label="Price Level"><Select><option>LEVEL 1</option></Select></Field>
            <Field label="Salesman"><Select><option>AMIT</option></Select></Field>
            <Field label="Remarks"><Input defaultValue="Regular customer. Good payment."/></Field>
            <label className="flex items-center gap-2 pt-1"><input type="checkbox" defaultChecked/> Active</label>
          </div>
        </Panel>
      </div>
    </DesktopLayout>
  );
}
function Stat({ label, value, tone="" }: any) {
  return <div className="erp-panel px-3 py-2"><div className="text-[11.5px] text-primary">{label}</div><div className={`text-[14px] font-bold ${tone}`}>{value}</div></div>;
}

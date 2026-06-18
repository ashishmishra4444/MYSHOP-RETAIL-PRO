import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { PRODUCTS, fmt } from "@/lib/sample-data";
import { X, Plus } from "lucide-react";

export const Route = createFileRoute("/sales-invoice")({
  head: () => ({ meta: [{ title: "Sales Invoice — MyShop Retail Pro" }] }),
  component: SalesInvoice,
});

function SalesInvoice() {
  const items = PRODUCTS.slice(0,5).map((p, i) => ({ ...p, qty: [5,3,2,2,4][i] }));
  const taxable = items.reduce((a, it) => a + it.rate * it.qty, 0);
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "New", tone: "primary" }, { key: "F3", label: "Edit" },
      { key: "F4", label: "Delete", tone: "danger" }, { key: "F5", label: "Save" }, { key: "F6", label: "Print" },
      { key: "F7", label: "Email" }, { key: "F8", label: "Payment" }, { key: "F9", label: "Receipt" },
      { key: "F10", label: "PDF Export" }, { key: "F11", label: "Refresh" }, { key: "F12", label: "Close" },
    ]}>
      <div className="grid grid-cols-[1fr_320px] gap-3">
        <div className="space-y-3">
          <Panel title="Invoice Details">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <Field label="Invoice No"><Input defaultValue="INV/125/24-25"/></Field>
              <Field label="Bill To"><Select><option>CUST001 — RAHUL KUMAR</option></Select></Field>
              <Field label="Invoice Date"><Input defaultValue="17/06/2024"/></Field>
              <Field label="Price Level"><Select><option>LEVEL 1</option></Select></Field>
              <Field label="Due Date"><Input defaultValue="17/06/2024"/></Field>
              <Field label="Payment Terms"><Select><option>15 Days</option></Select></Field>
              <Field label="Salesman"><Select><option>AMIT</option></Select></Field>
              <Field label="Credit Days"><Input defaultValue="15"/></Field>
              <Field label="Reference"><Input defaultValue="Walk-in Customer"/></Field>
              <Field label="Currency"><Select><option>INR</option></Select></Field>
              <Field label="Remarks"><Input defaultValue="Thank you for your business."/></Field>
              <Field label="Delivery Note"><Input defaultValue="DN/125/24-25"/></Field>
            </div>
          </Panel>

          <Panel title="Invoice Items" right={<button className="flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-2 py-1 text-white text-[11px]"><Plus className="h-3.5 w-3.5"/>Add</button>}>
            <table className="erp-grid">
              <thead><tr>
                <th className="erp-grid-th w-10">S.No</th><th className="erp-grid-th">Item Code</th><th className="erp-grid-th">Item Name</th>
                <th className="erp-grid-th">HSN</th><th className="erp-grid-th">Unit</th><th className="erp-grid-th text-right">Qty</th>
                <th className="erp-grid-th text-right">Rate</th><th className="erp-grid-th text-right">Taxable</th>
                <th className="erp-grid-th text-right">CGST</th><th className="erp-grid-th text-right">SGST</th>
                <th className="erp-grid-th text-right">Total</th><th className="erp-grid-th w-6"></th>
              </tr></thead>
              <tbody>{items.map((it, i) => {
                const tax = it.rate * it.qty;
                const c = (tax * it.gst/2)/100;
                return (
                  <tr key={it.code} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                    <td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{it.code}</td>
                    <td className="erp-grid-td">{it.name}</td><td className="erp-grid-td">{it.hsn}</td>
                    <td className="erp-grid-td">{it.unit}</td><td className="erp-grid-td text-right">{it.qty.toFixed(3)}</td>
                    <td className="erp-grid-td text-right">{fmt(it.rate)}</td><td className="erp-grid-td text-right">{fmt(tax)}</td>
                    <td className="erp-grid-td text-right">{fmt(c)}</td><td className="erp-grid-td text-right">{fmt(c)}</td>
                    <td className="erp-grid-td text-right font-semibold">{fmt(tax + 2*c)}</td>
                    <td className="erp-grid-td text-center"><X className="mx-auto h-3.5 w-3.5 text-destructive"/></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </Panel>

          <div className="grid grid-cols-3 gap-3">
            <Panel title="Tax Summary">
              <table className="erp-grid"><thead><tr><th className="erp-grid-th">Type</th><th className="erp-grid-th text-right">Taxable</th><th className="erp-grid-th text-right">CGST</th><th className="erp-grid-th text-right">SGST</th></tr></thead>
              <tbody>
                <tr><td className="erp-grid-td">CGST 2.5%</td><td className="erp-grid-td text-right">{fmt(2086)}</td><td className="erp-grid-td text-right">52.15</td><td className="erp-grid-td text-right">—</td></tr>
                <tr><td className="erp-grid-td">SGST 2.5%</td><td className="erp-grid-td text-right">{fmt(2086)}</td><td className="erp-grid-td text-right">—</td><td className="erp-grid-td text-right">52.15</td></tr>
              </tbody></table>
            </Panel>
            <Panel title="Amount Summary">
              <div className="space-y-1.5 text-[12.5px]">
                <Row k="Total Items" v="16.000"/>
                <Row k="Total Qty" v="16.000"/>
                <Row k="Total Taxable" v={fmt(2086)}/>
                <Row k="Total Tax Amount" v="₹ 104.30"/>
                <div className="flex justify-between border-t border-border pt-1.5"><span>Invoice Total</span><b className="text-primary">₹ {fmt(2190.30)}</b></div>
              </div>
            </Panel>
            <Panel title="Payment">
              <div className="space-y-2 text-[12.5px]">
                <Field label="Payment Mode"><Select><option>Credit</option><option>Cash</option><option>UPI</option></Select></Field>
                <Field label="Advance Received"><Input defaultValue="0.00" className="text-right"/></Field>
                <div className="flex justify-between border-t border-border pt-1.5"><span>Balance Due</span><b className="text-destructive">₹ {fmt(2190.30)}</b></div>
              </div>
            </Panel>
          </div>
        </div>

        <Panel title="Customer Details">
          <div className="space-y-1 text-[12.5px]">
            <Row k="Opening Balance" v={`${fmt(12750)} Dr`} tone="text-destructive"/>
            <Row k="Credit Limit" v={fmt(25000)}/>
            <Row k="Current Balance" v={`${fmt(12750)} Dr`} tone="text-destructive"/>
            <Row k="Available Credit" v={fmt(12250)}/>
            <Row k="Last Invoice" v="INV/124 (15/05)"/>
            <Row k="Last Payment" v="RCPT/124 (15/05)"/>
          </div>
          <div className="mt-3 border-t border-border pt-2 text-[12.5px]">
            <div className="font-semibold text-primary">Amount in Words</div>
            <div>Two Thousand One Hundred Ninety Rupees and Thirty Paise Only.</div>
          </div>
          <div className="mt-3 border-t border-border pt-2 text-[12.5px]">
            <div className="font-semibold text-primary">Terms &amp; Conditions</div>
            <div>1. Goods once sold will not be taken back.</div>
            <div>2. Subject to Indore Jurisdiction only.</div>
          </div>
        </Panel>
      </div>
    </DesktopLayout>
  );
}
function Row({ k, v, tone="" }: any) { return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className={tone}>{v}</span></div>; }

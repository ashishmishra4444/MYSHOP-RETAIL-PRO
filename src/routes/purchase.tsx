import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { PRODUCTS, SUPPLIERS, fmt } from "@/lib/sample-data";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/purchase")({
  head: () => ({ meta: [{ title: "Purchase Entry — MyShop Retail Pro" }] }),
  component: Purchase,
});

function Purchase() {
  const items = PRODUCTS.slice(0, 7).map((p, i) => ({ ...p, qty: [25,20,10,10,20,10,5][i], disc: 0 }));
  const gross = items.reduce((a, it) => a + it.rate * it.qty, 0);
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "Edit" }, { key: "F3", label: "Delete", tone: "danger" },
      { key: "F4", label: "Save", tone: "primary" }, { key: "F5", label: "Print" }, { key: "F6", label: "Barcode" },
      { key: "F7", label: "Previous" }, { key: "F8", label: "Next" }, { key: "F9", label: "Clear" },
      { key: "F10", label: "Hold" }, { key: "F11", label: "Payment" }, { key: "F12", label: "Close" },
    ]}>
      <div className="grid grid-cols-[1fr_300px] gap-3">
        <div className="space-y-3">
          <Panel title="Purchase Details">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <Field label="Supplier Name"><Select>{SUPPLIERS.map((s) => <option key={s.code}>{s.name}</option>)}</Select></Field>
              <Field label="Invoice No"><Input defaultValue="INV/456/24-25"/></Field>
              <Field label="Bill No"><Input defaultValue="456"/></Field>
              <Field label="Invoice Date"><Input defaultValue="17/06/2024"/></Field>
              <Field label="Purchase Type"><Select><option>CREDIT PURCHASE</option><option>CASH PURCHASE</option></Select></Field>
              <Field label="GRN Date"><Input defaultValue="17/06/2024"/></Field>
              <Field label="GRN No"><Input defaultValue="GRN25"/></Field>
              <Field label="Due Date"><Input defaultValue="27/06/2024"/></Field>
              <Field label="Transport"><Input defaultValue="500.00"/></Field>
              <Field label="Payment Terms"><Select><option>10 Days</option></Select></Field>
              <Field label="Vehicle No"><Input defaultValue="MH12 AB 1234"/></Field>
              <Field label="Narration"><Input defaultValue="Purchase of Grocery Items"/></Field>
            </div>
          </Panel>

          <Panel title="Enter Items" right={<button className="flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-2 py-1 text-white text-[11px]"><Plus className="h-3.5 w-3.5"/>Add Item</button>}>
            <table className="erp-grid">
              <thead><tr>
                <th className="erp-grid-th w-10">S.No</th><th className="erp-grid-th">Code</th><th className="erp-grid-th">Item</th>
                <th className="erp-grid-th">HSN</th><th className="erp-grid-th text-right">Qty</th><th className="erp-grid-th text-right">Rate</th>
                <th className="erp-grid-th text-right">Disc</th><th className="erp-grid-th text-right">GST %</th>
                <th className="erp-grid-th text-right">GST Amt</th><th className="erp-grid-th text-right">Amount</th><th className="erp-grid-th w-8"></th>
              </tr></thead>
              <tbody>{items.map((it, i) => {
                const amt = it.rate * it.qty;
                const gstAmt = (amt * it.gst) / 100;
                return (
                  <tr key={it.code} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                    <td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{it.code}</td>
                    <td className="erp-grid-td">{it.name}</td><td className="erp-grid-td">{it.hsn}</td>
                    <td className="erp-grid-td text-right">{it.qty.toFixed(3)}</td><td className="erp-grid-td text-right">{fmt(it.rate)}</td>
                    <td className="erp-grid-td text-right">0.00</td><td className="erp-grid-td text-right">{it.gst}</td>
                    <td className="erp-grid-td text-right">{fmt(gstAmt)}</td><td className="erp-grid-td text-right font-semibold">{fmt(amt + gstAmt)}</td>
                    <td className="erp-grid-td text-center"><Trash2 className="mx-auto h-3.5 w-3.5 text-destructive"/></td>
                  </tr>
                );
              })}</tbody>
            </table>
            <div className="mt-2 flex justify-between border-t border-border pt-2 text-[12.5px]">
              <span>Total Items : <b>{items.length}</b></span>
              <span>Total Qty : <b>100.000</b></span>
              <span>Total Amount : <b className="text-primary">{fmt(gross)}</b></span>
            </div>
          </Panel>
        </div>

        <div className="space-y-3">
          <Panel title="Bill Summary">
            <div className="space-y-2 text-[12.5px]">
              {[
                ["Items", "7"], ["Total Qty", "100.000"], ["Total Disc", "0.00"],
                ["Taxable Amt", fmt(gross)], ["Total GST", fmt(2560)],
              ].map(([k,v]) => <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><b>{v}</b></div>)}
              <div className="flex justify-between border-t border-border pt-1.5"><span>Net Amount</span><b className="text-primary">₹ {fmt(18860)}</b></div>
              <div className="flex justify-between"><span>Amount Paid</span><b>0.00</b></div>
              <div className="flex justify-between border-t border-border pt-1.5"><span>Balance</span><b className="text-destructive">{fmt(18860)}</b></div>
            </div>
          </Panel>
          <Panel title="Previous Balances">
            <div className="space-y-1.5 text-[12.5px]">
              <Row k="Opening Balance" v="25,430.00 Dr"/>
              <Row k="Purchase (This Month)" v="98,350.00"/>
              <Row k="Paid (This Month)" v="72,650.00"/>
              <div className="flex justify-between border-t border-border pt-1.5"><span>Current Balance</span><b className="text-destructive">51,130.00 Dr</b></div>
            </div>
          </Panel>
        </div>
      </div>
    </DesktopLayout>
  );
}
function Row({ k, v }: any) { return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><b>{v}</b></div>; }

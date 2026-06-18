import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { PRODUCTS, fmt } from "@/lib/sample-data";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Product Master — MyShop Retail Pro" }] }),
  component: ProductMaster,
});

function ProductMaster() {
  const [tab, setTab] = useState("General");
  const tabs = ["General", "Other Details", "GST Details", "Stock Details", "Image"];
  const p = PRODUCTS[0];
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "New" }, { key: "F3", label: "Edit" },
      { key: "F4", label: "Delete", tone: "danger" }, { key: "F5", label: "Save", tone: "primary" },
      { key: "F6", label: "Clear" }, { key: "F7", label: "Find" }, { key: "F8", label: "Barcode" },
      { key: "F9", label: "Import" }, { key: "F10", label: "Export" }, { key: "F11", label: "Print" }, { key: "F12", label: "Close" },
    ]}>
      <div className="grid grid-cols-[1fr_460px] gap-3">
        <Panel title="Product List">
          <table className="erp-grid">
            <thead><tr>
              <th className="erp-grid-th w-12">S.No</th><th className="erp-grid-th">Code</th><th className="erp-grid-th">Barcode</th>
              <th className="erp-grid-th">Name</th><th className="erp-grid-th">Group</th><th className="erp-grid-th text-right">MRP</th>
              <th className="erp-grid-th text-right">Rate</th><th className="erp-grid-th text-right">Stock</th>
            </tr></thead>
            <tbody>{PRODUCTS.map((it, i) => (
              <tr key={it.code} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                <td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{it.code}</td>
                <td className="erp-grid-td">{it.barcode}</td><td className="erp-grid-td">{it.name}</td>
                <td className="erp-grid-td">{it.group}</td><td className="erp-grid-td text-right">{fmt(it.mrp)}</td>
                <td className="erp-grid-td text-right">{fmt(it.rate)}</td>
                <td className={`erp-grid-td text-right ${it.stock < it.reorder ? "text-destructive font-semibold" : ""}`}>{it.stock}.000</td>
              </tr>
            ))}</tbody>
          </table>
        </Panel>

        <Panel title="Product Master — [Mode : New]">
          <div className="flex gap-1 border-b border-border">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-[12.5px] ${tab===t ? "border-b-2 border-primary font-semibold text-primary" : "text-muted-foreground"}`}>{t}</button>
            ))}
          </div>
          <div className="space-y-2 pt-3">
            <Field label="Item Code"><Input defaultValue={p.code}/></Field>
            <Field label="Barcode"><Input defaultValue={p.barcode}/></Field>
            <Field label="Item Name"><Input defaultValue={p.name}/></Field>
            <Field label="Item Group"><Select defaultValue={p.group}><option>{p.group}</option></Select></Field>
            <Field label="Sub Group"><Select><option>{p.subGroup}</option></Select></Field>
            <Field label="Brand"><Select><option>{p.brand}</option></Select></Field>
            <Field label="MRP"><Input defaultValue={p.mrp.toFixed(2)} className="text-right"/></Field>
            <Field label="Rate"><Input defaultValue={p.rate.toFixed(2)} className="text-right"/></Field>
            <Field label="Selling Price"><Input defaultValue={p.rate.toFixed(2)} className="text-right"/></Field>
            <Field label="Tax %"><Input defaultValue={p.gst.toFixed(2)} className="text-right"/></Field>
            <Field label="HSN Code"><Input defaultValue={p.hsn}/></Field>
            <Field label="Unit"><Select><option>{p.unit}</option></Select></Field>
            <Field label="Reorder Level"><Input defaultValue={p.reorder.toFixed(3)} className="text-right"/></Field>
            <label className="flex items-center gap-2 pt-1"><input type="checkbox" defaultChecked/> Active</label>
            <div className="flex justify-center pt-3">
              <div className="grid h-24 w-24 place-items-center rounded-sm border border-dashed border-border bg-secondary text-muted-foreground"><ImageIcon className="h-8 w-8"/></div>
            </div>
          </div>
        </Panel>
      </div>
    </DesktopLayout>
  );
}

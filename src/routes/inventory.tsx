import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { PRODUCTS, fmt } from "@/lib/sample-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/inventory")({
  head: () => ({ meta: [{ title: "Inventory — MyShop Retail Pro" }] }),
  component: Inventory,
});

function Inventory() {
  const groups = ["All Groups","Grocery","Beverages","Dairy","Personal Care","Home Care","Snacks","Frozen","Bakery","Pulses & Grains","Oils & Spices","Stationery","General"];
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "New Item" }, { key: "F3", label: "Edit Item" },
      { key: "F4", label: "Transfer" }, { key: "F5", label: "Adjust" }, { key: "F6", label: "Physical" },
      { key: "F7", label: "Reorder" }, { key: "F8", label: "Batch / Serial" }, { key: "F9", label: "Report" },
      { key: "F10", label: "Barcode" }, { key: "F11", label: "Excel Export" }, { key: "F12", label: "Close" },
    ]}>
      <div className="mb-2 flex items-center gap-2">
        <select className="erp-input w-40"><option>All Groups</option></select>
        <select className="erp-input w-40"><option>All Sub Groups</option></select>
        <select className="erp-input w-40"><option>All Brands</option></select>
        <label className="flex items-center gap-1.5 text-[12.5px]"><input type="checkbox"/> Low Stock Only</label>
        <div className="relative flex-1">
          <input className="erp-input w-full pl-8" placeholder="Search Item (F3)"/>
          <Search className="absolute left-2 top-1.5 h-4 w-4 text-muted-foreground"/>
        </div>
      </div>

      <div className="grid grid-cols-[200px_1fr] gap-3">
        <Panel title="Stock Groups">
          <ul className="space-y-0.5 text-[12.5px]">
            {groups.map((g, i) => (
              <li key={g} className={`cursor-pointer rounded-sm px-2 py-1 ${i===0 ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>+ {g}</li>
            ))}
          </ul>
        </Panel>

        <div>
          <Panel title="Stock List">
            <table className="erp-grid">
              <thead><tr>
                <th className="erp-grid-th w-10">S.No</th><th className="erp-grid-th">Code</th><th className="erp-grid-th">Barcode</th>
                <th className="erp-grid-th">Item Name</th><th className="erp-grid-th">Group</th><th className="erp-grid-th">Sub Group</th>
                <th className="erp-grid-th text-right">MRP</th><th className="erp-grid-th text-right">Rate</th>
                <th className="erp-grid-th text-right">Stock</th><th className="erp-grid-th">Unit</th>
                <th className="erp-grid-th text-right">Reorder</th><th className="erp-grid-th">Status</th>
              </tr></thead>
              <tbody>{PRODUCTS.map((it, i) => {
                const low = it.stock < it.reorder;
                return (
                  <tr key={it.code} className={i%2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                    <td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{it.code}</td>
                    <td className="erp-grid-td">{it.barcode}</td><td className="erp-grid-td">{it.name}</td>
                    <td className="erp-grid-td">{it.group}</td><td className="erp-grid-td">{it.subGroup}</td>
                    <td className="erp-grid-td text-right">{fmt(it.mrp)}</td><td className="erp-grid-td text-right">{fmt(it.rate)}</td>
                    <td className={`erp-grid-td text-right ${low ? "text-destructive font-semibold" : ""}`}>{it.stock}.000</td>
                    <td className="erp-grid-td">{it.unit}</td><td className="erp-grid-td text-right">{it.reorder}.000</td>
                    <td className={`erp-grid-td font-semibold ${low ? "text-destructive" : "text-[color:var(--color-success)]"}`}>{low ? "LOW STOCK" : "OK"}</td>
                  </tr>
                );
              })}</tbody>
            </table>
          </Panel>
          <div className="mt-2 grid grid-cols-6 gap-2">
            <Stat label="Total Items" value="245"/>
            <Stat label="Total Stock Qty" value="2,584.500"/>
            <Stat label="Low Stock Items" value="15" tone="text-[color:var(--color-warning)]"/>
            <Stat label="Out of Stock" value="7" tone="text-destructive"/>
            <Stat label="Stock Value (Cost)" value={`₹ ${fmt(1265430)}`}/>
            <Stat label="Stock Value (MRP)" value={`₹ ${fmt(1875680)}`}/>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
function Stat({ label, value, tone="" }: any) {
  return <div className="erp-panel px-3 py-2"><div className="text-[11.5px] text-primary">{label}</div><div className={`text-[14px] font-bold ${tone}`}>{value}</div></div>;
}

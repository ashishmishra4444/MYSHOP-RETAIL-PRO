import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DesktopLayout } from "@/components/desktop/DesktopLayout";
import { CART_INITIAL, fmt } from "@/lib/sample-data";
import { Search, Settings, Trash2 } from "lucide-react";

export const Route = createFileRoute("/pos")({
  head: () => ({ meta: [{ title: "POS Billing — MyShop Retail Pro" }] }),
  component: POS,
});

function POS() {
  const [cart, setCart] = useState(CART_INITIAL.map((c) => ({ ...c })));
  const totals = useMemo(() => {
    const sub = cart.reduce((a, c) => a + c.rate * c.qty - c.disc, 0);
    const qty = cart.reduce((a, c) => a + c.qty, 0);
    return { sub, qty, total: sub };
  }, [cart]);

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Cash", tone: "primary" }, { key: "F2", label: "Card" }, { key: "F3", label: "UPI" },
      { key: "F4", label: "Multi Pay" }, { key: "F5", label: "Quick Add" }, { key: "F6", label: "Save" },
      { key: "F7", label: "Bill Print" }, { key: "F8", label: "Hold Bill" }, { key: "F9", label: "Recall Bill" },
      { key: "F10", label: "Stock Check" }, { key: "F11", label: "Cash In/Out" }, { key: "F12", label: "Cancel Bill", tone: "danger" },
    ]}>
      <div className="mb-2 flex items-center gap-2">
        <select className="erp-input w-32"><option>BILL VIEW</option><option>TOUCH</option></select>
        <select className="erp-input w-56"><option>MYSHOP SUPERMARKET</option></select>
        <select className="erp-input w-44"><option>Main Division</option></select>
        <select className="erp-input w-44"><option>Main Location</option></select>
        <div className="relative flex-1">
          <input className="erp-input w-full pl-8" placeholder="Scan Barcode / Search Item (F3)"/>
          <Search className="absolute left-2 top-1.5 h-4 w-4 text-muted-foreground"/>
        </div>
        <button className="grid h-7 w-7 place-items-center rounded-sm border border-border bg-white hover:bg-accent"><Settings className="h-4 w-4"/></button>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-2">
        <div className="erp-panel flex flex-col">
          <div className="flex-1 overflow-auto bg-white">
            <table className="erp-grid w-full">
              <thead className="sticky top-0 z-10 bg-secondary"><tr>
                <th className="erp-grid-th w-12">S.No</th><th className="erp-grid-th">Barcode</th><th className="erp-grid-th">Item Code</th>
                <th className="erp-grid-th">Item Name</th><th className="erp-grid-th text-right">MRP</th><th className="erp-grid-th text-right">Rate</th>
                <th className="erp-grid-th text-right">Qty</th><th className="erp-grid-th text-right">Disc %</th><th className="erp-grid-th text-right">Amount</th><th className="erp-grid-th w-8"></th>
              </tr></thead>
              <tbody>
                {cart.map((c, i) => (
                  <tr key={c.code} className={i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                    <td className="erp-grid-td text-center">{i+1}</td>
                    <td className="erp-grid-td">{c.barcode}</td>
                    <td className="erp-grid-td">{c.code}</td>
                    <td className="erp-grid-td">{c.name}</td>
                    <td className="erp-grid-td text-right">{fmt(c.mrp)}</td>
                    <td className="erp-grid-td text-right">{fmt(c.rate)}</td>
                    <td className="erp-grid-td text-right">
                      <input value={c.qty} onChange={(e) => {
                        const v = Number(e.target.value)||0;
                        setCart(cart.map((x, j) => j===i ? { ...x, qty: v } : x));
                      }} className="w-14 border border-input px-1 text-right"/>
                    </td>
                    <td className="erp-grid-td text-right">{fmt(c.disc)}</td>
                    <td className="erp-grid-td text-right font-semibold text-primary">{fmt(c.rate * c.qty - c.disc)}</td>
                    <td className="erp-grid-td text-center">
                      <button onClick={() => setCart(cart.filter((_, j) => j!==i))}><Trash2 className="h-3.5 w-3.5 text-destructive"/></button>
                    </td>
                  </tr>
                ))}
                <tr><td className="erp-grid-td text-center text-muted-foreground border-b-transparent">*</td>{Array.from({length:9}).map((_,k) => <td key={k} className="erp-grid-td border-b-transparent">&nbsp;</td>)}</tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-6 gap-2 border-t border-border bg-secondary p-2 text-[12.5px]">
            <Stat label="Total Items" value={cart.length.toString()}/>
            <Stat label="Total Qty" value={totals.qty.toFixed(3)}/>
            <Stat label="Total Disc" value="0.00"/>
            <Stat label="Taxable Amt" value={fmt(totals.sub)}/>
            <Stat label="Total GST" value="0.00"/>
            <Stat label="Bill Weight" value="0.000"/>
          </div>
          <div className="grid grid-cols-6 gap-2 border-t border-border bg-secondary p-2 text-[12.5px]">
            <Stat label="Salesman" value="---"/>
            <Stat label="Customer" value="CASH"/>
            <Stat label="Credit Limit" value="0.00"/>
            <Stat label="Available Limit" value="0.00"/>
            <Stat label="Points" value="0.00"/>
            <Stat label="Credit Balance" value="0.00"/>
          </div>
        </div>

        <div className="erp-panel flex flex-col">
          <div className="erp-panel-header flex items-center justify-between"><span>Bill Details</span><span>Session : 1</span></div>
          <div className="divide-y divide-border text-[12.5px]">
            {[
              ["Bill Date", new Date().toLocaleDateString("en-GB")],
              ["Bill No", "RC433"],
              ["Gross Amount", fmt(totals.sub)],
              ["Item Discount", "0.00"],
              ["Scheme Discount", "0.00"],
            ].map(([k, v]) => <Row key={k} k={k} v={v}/>)}
            <Row k="Sub Total" v={fmt(totals.sub)} bold/>
            <Row k="GST" v="0.00"/>
            <Row k="Round Off" v="0.00"/>
            <div className="flex items-center justify-between bg-secondary px-3 py-3">
              <span className="text-base font-bold">Total</span>
              <span className="text-2xl font-bold text-destructive">{fmt(totals.total)}</span>
            </div>
            <Row k="Last Tendered" v="0.00"/>
            <Row k="Change Given" v="0.00"/>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="erp-panel px-2 py-1.5">
      <div className="text-[11px] text-primary font-medium">{label}</div>
      <div className="text-[13px] font-bold">{value}</div>
    </div>
  );
}
function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5">
      <span className="text-muted-foreground">{k}</span>
      <span className={bold ? "font-bold text-primary" : ""}>{v}</span>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DesktopLayout } from "@/components/desktop/DesktopLayout";
import { CART_INITIAL, fmt } from "@/lib/sample-data";
import { Search, Settings, Trash2, X } from "lucide-react";
import { useERPCommands } from "@/lib/erp-context";

export const Route = createFileRoute("/pos")({
  head: () => ({ meta: [{ title: "POS Billing — MyShop Retail Pro" }] }),
  component: POS,
});

function POS() {
  const [recallOpen, setRecallOpen] = useState(false);

  // Register POS page with the ERP Toolbar Command framework
  const { context } = useERPCommands({
    pageName: "pos",
    availableCommands: ["NEW", "SAVE", "PRINT", "HOLD", "RECALL"],
    onCommand: (cmd) => {
      if (cmd === "NEW") {
        context.createPOSSession();
      } else if (cmd === "SAVE") {
        handleSave();
      } else if (cmd === "PRINT") {
        handlePrint();
      } else if (cmd === "HOLD") {
        if (context.activeSessionId) {
          context.holdPOSSession(context.activeSessionId);
          alert(`POS Bill session placed on Hold.`);
        }
      } else if (cmd === "RECALL") {
        setRecallOpen(true);
      }
    }
  });

  const activeSession = context.posSessions.find((s) => s.id === context.activeSessionId) || {
    id: "POS-001",
    cart: [],
    customer: "CASH"
  };

  const cart = activeSession.cart;

  const setCart = (newCart: any[]) => {
    if (context.activeSessionId) {
      context.updatePOSSessionCart(context.activeSessionId, newCart);
    }
  };

  const handleSave = () => {
    alert(`POS Bill ${activeSession.id} saved successfully!`);
    setCart([]);
  };

  const handlePrint = () => {
    alert(`Opening print preview for ${activeSession.id}...`);
    window.print();
  };

  const totals = useMemo(() => {
    const sub = cart.reduce((a, c) => a + c.rate * c.qty - c.disc, 0);
    const qty = cart.reduce((a, c) => a + c.qty, 0);
    return { sub, qty, total: sub };
  }, [cart]);

  // Load initial demo items if cart is empty and it's the first session
  const initializeDemoItems = () => {
    setCart(CART_INITIAL.map((c) => ({ ...c })));
  };

  return (
    <DesktopLayout
      fnKeys={[
        { key: "F1", label: "Cash (Save)", tone: "primary", onClick: handleSave },
        { key: "F2", label: "Card", onClick: handleSave },
        { key: "F3", label: "UPI", onClick: handleSave },
        { key: "F4", label: "Multi Pay", onClick: handleSave },
        { key: "F5", label: "Demo Items", onClick: initializeDemoItems },
        { key: "F6", label: "Save (F6)", onClick: handleSave },
        { key: "F7", label: "Bill Print", onClick: handlePrint },
        { key: "F8", label: "Hold Bill", onClick: () => context.activeSessionId && context.holdPOSSession(context.activeSessionId) },
        { key: "F9", label: "Recall Bill", onClick: () => setRecallOpen(true) },
        { key: "F10", label: "Stock Check", onClick: () => context.dispatchCommand("STOCK") },
        { key: "F11", label: "Customers", onClick: () => context.dispatchCommand("USER") },
        { key: "F12", label: "Cancel", tone: "danger", onClick: () => setCart([]) }
      ]}
    >
      {/* Session/Bill Tabs */}
      <div className="mb-2 flex items-center gap-1 border-b border-border bg-slate-100 p-1 rounded-sm">
        {context.posSessions.map((s) => (
          <div
            key={s.id}
            onClick={() => context.setActiveSessionId(s.id)}
            className={`flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-t-sm border border-b-0 cursor-pointer transition-colors ${
              context.activeSessionId === s.id
                ? "bg-white border-border text-primary"
                : "bg-slate-200 border-transparent text-muted-foreground hover:bg-slate-300"
            }`}
          >
            <span>{s.id}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                context.closePOSSession(s.id);
              }}
              className="text-muted-foreground hover:text-destructive text-[9px] font-bold"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => context.createPOSSession()}
          className="px-2 py-0.5 text-[11px] bg-primary text-primary-foreground rounded-sm font-semibold ml-2 hover:bg-primary/95 transition-colors cursor-pointer"
        >
          + New Tab
        </button>
      </div>

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
          <div className="flex-1 overflow-auto bg-white min-h-[300px]">
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
                      <input
                        type="number"
                        value={c.qty}
                        onChange={(e) => {
                          const v = Number(e.target.value) || 0;
                          setCart(cart.map((x, j) => j === i ? { ...x, qty: v } : x));
                        }}
                        className="w-14 border border-input px-1 text-right"
                      />
                    </td>
                    <td className="erp-grid-td text-right">{fmt(c.disc)}</td>
                    <td className="erp-grid-td text-right font-semibold text-primary">{fmt(c.rate * c.qty - c.disc)}</td>
                    <td className="erp-grid-td text-center">
                      <button onClick={() => setCart(cart.filter((_, j) => j !== i))}><Trash2 className="h-3.5 w-3.5 text-destructive"/></button>
                    </td>
                  </tr>
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-muted-foreground text-sm">
                      No items in cart. Scan barcodes or click <b>F5 (Demo Items)</b> to load sample stock items.
                    </td>
                  </tr>
                )}
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
            <Stat label="Customer" value={activeSession.customer}/>
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
              ["Bill No", activeSession.id],
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

      {/* Held Bills Recall Dialog Overlay */}
      {recallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-[12.5px] text-titlebar-foreground">
              <span className="font-semibold">Recall Held Bill Session</span>
              <button onClick={() => setRecallOpen(false)} className="grid h-6 w-8 place-items-center hover:bg-destructive"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-3">
              <table className="erp-grid w-full">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Hold ID</th>
                    <th className="erp-grid-th">Items Count</th>
                    <th className="erp-grid-th">Held Time</th>
                    <th className="erp-grid-th w-20 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {context.heldBills.map((b) => (
                    <tr key={b.id}>
                      <td className="erp-grid-td font-semibold">{b.id}</td>
                      <td className="erp-grid-td">{b.cart.length} items</td>
                      <td className="erp-grid-td">{b.heldAt}</td>
                      <td className="erp-grid-td text-center">
                        <button
                          type="button"
                          onClick={() => {
                            context.recallPOSSession(b.id);
                            setRecallOpen(false);
                          }}
                          className="px-2.5 py-1 text-xs bg-primary text-primary-foreground rounded-sm"
                        >
                          Recall
                        </button>
                      </td>
                    </tr>
                  ))}
                  {context.heldBills.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-muted-foreground text-xs">
                        No bills on hold currently.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
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

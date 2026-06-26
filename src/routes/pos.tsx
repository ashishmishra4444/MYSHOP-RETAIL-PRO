import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { DesktopLayout } from "@/components/desktop/DesktopLayout";
import { CART_INITIAL, fmt } from "@/lib/sample-data";
import { Search, Settings, Trash2, X } from "lucide-react";
import { useERPCommands } from "@/lib/erp-context";

export const Route = createFileRoute("/pos")({
  head: () => ({ meta: [{ title: "POS Billing — MyShop Retail Pro" }] }),
  component: POS,
});

import { PRODUCTS, CUSTOMERS } from "@/lib/sample-data";

function POS() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const [productList, setProductList] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_products");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load products from localStorage", e);
        }
      }
    }
    return PRODUCTS;
  });

  // Sync state from localStorage when route is loaded/changed
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_products");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (JSON.stringify(parsed) !== JSON.stringify(productList)) {
            setProductList(parsed);
          }
        } catch (e) {
          console.error("Failed to sync products from localStorage", e);
        }
      }
    }
  }, [pathname]);
  const [recallOpen, setRecallOpen] = useState(false);
  const [activePOSModal, setActivePOSModal] = useState<"PAYMENT" | "STOCK_CHECK" | "CUSTOMER_PICK" | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CARD" | "UPI" | "MULTI">("CASH");
  const [amountTendered, setAmountTendered] = useState<string>("");
  const [stockSearch, setStockSearch] = useState<string>("");
  const [customerSearch, setCustomerSearch] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRecallOpen(false);
        setActivePOSModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Register POS page with the ERP Toolbar Command framework
  const { context } = useERPCommands({
    pageName: "pos",
    availableCommands: ["NEW", "SAVE", "PRINT", "HOLD", "RECALL"],
    onCommand: (cmd) => {
      if (cmd === "NEW") {
        context.createPOSSession();
      } else if (cmd === "SAVE") {
        setPaymentMethod("CASH");
        setAmountTendered("");
        setActivePOSModal("PAYMENT");
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
        { key: "F1", label: "Cash (Save)", tone: "primary", onClick: () => { setPaymentMethod("CASH"); setAmountTendered(""); setActivePOSModal("PAYMENT"); } },
        { key: "F2", label: "Card", onClick: () => { setPaymentMethod("CARD"); setActivePOSModal("PAYMENT"); } },
        { key: "F3", label: "UPI", onClick: () => { setPaymentMethod("UPI"); setActivePOSModal("PAYMENT"); } },
        { key: "F4", label: "Multi Pay", onClick: () => { setPaymentMethod("MULTI"); setActivePOSModal("PAYMENT"); } },
        { key: "F5", label: "Demo Items", onClick: initializeDemoItems },
        { key: "F6", label: "Save (F6)", onClick: handleSave },
        { key: "F7", label: "Bill Print", onClick: handlePrint },
        { key: "F8", label: "Hold Bill", onClick: () => context.activeSessionId && context.holdPOSSession(context.activeSessionId) },
        { key: "F9", label: "Recall Bill", onClick: () => setRecallOpen(true) },
        { key: "F10", label: "Stock Check", onClick: () => { setStockSearch(""); setActivePOSModal("STOCK_CHECK"); } },
        { key: "F11", label: "Customers", onClick: () => { setCustomerSearch(""); setActivePOSModal("CUSTOMER_PICK"); } },
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


      {/* Interactive Payment / Tender Dialog Modal */}
      {activePOSModal === "PAYMENT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <span>Finalize Bill &amp; Process Payment [{paymentMethod}]</span>
              <button onClick={() => setActivePOSModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center bg-slate-100 p-3 rounded-sm border">
                <span className="font-semibold text-muted-foreground text-sm">TOTAL AMOUNT DUE</span>
                <span className="text-2xl font-bold text-destructive">₹ {fmt(totals.total)}</span>
              </div>

              {paymentMethod === "CASH" && (
                <div className="space-y-3">
                  <label className="block">
                    <span className="font-semibold text-primary block mb-1">Enter Cash Tendered (₹)</span>
                    <input
                      type="number"
                      autoFocus
                      value={amountTendered}
                      onChange={(e) => setAmountTendered(e.target.value)}
                      placeholder="e.g. 500, 1000"
                      className="erp-input w-full h-10 text-lg font-mono font-bold"
                    />
                  </label>
                  {Number(amountTendered) > 0 && (
                    <div className="flex justify-between items-center bg-amber-50 p-2.5 rounded-sm border border-amber-200">
                      <span className="font-semibold text-amber-800">CHANGE TO RETURN</span>
                      <span className="text-xl font-bold text-success font-mono">
                        ₹ {fmt(Math.max(0, Number(amountTendered) - totals.total))}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === "CARD" && (
                <div className="p-4 border border-dashed rounded-sm bg-slate-50 flex flex-col items-center gap-2">
                  <span className="font-semibold text-primary">Card Reader Transaction</span>
                  <p className="text-muted-foreground text-xs text-center">Swipe or tap customer card on the physical terminal now...</p>
                  <div className="h-2 w-24 bg-slate-200 overflow-hidden rounded-full relative mt-2">
                    <div className="absolute inset-y-0 bg-primary w-8 animate-infinite animate-duration-1000" style={{ animationName: 'slide' }} />
                  </div>
                </div>
              )}

              {paymentMethod === "UPI" && (
                <div className="p-4 border rounded-sm bg-slate-50 flex flex-col items-center gap-3">
                  <span className="font-semibold text-primary">UPI QR Code Payment</span>
                  <div className="h-32 w-32 bg-white border flex items-center justify-center font-bold text-muted-foreground select-none relative">
                    <div className="absolute inset-2 border-2 border-primary opacity-60 rounded-xs" />
                    [QR CODE]
                  </div>
                  <p className="text-muted-foreground text-[11px] text-center">Scan QR code using GooglePay, PhonePe, Paytm, or BHIM UPI.</p>
                </div>
              )}

              {paymentMethod === "MULTI" && (
                <div className="space-y-3 p-3 border rounded-sm bg-slate-50">
                  <span className="font-semibold text-primary block border-b pb-1">Split Payment Modes</span>
                  <div className="grid grid-cols-3 gap-2">
                    <label className="block text-xs">Cash Amt<input type="number" className="erp-input w-full mt-1" placeholder="Cash"/></label>
                    <label className="block text-xs">Card Amt<input type="number" className="erp-input w-full mt-1" placeholder="Card"/></label>
                    <label className="block text-xs">UPI Amt<input type="number" className="erp-input w-full mt-1" placeholder="UPI"/></label>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setActivePOSModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel [ESC]</button>
                <button
                  onClick={() => {
                    alert(`Payment processed successfully for POS Bill ${activeSession.id}!`);
                    setCart([]);
                    setActivePOSModal(null);
                  }}
                  disabled={totals.total === 0 || (paymentMethod === "CASH" && Number(amountTendered) < totals.total)}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm Payment &amp; Save (F6)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Lookup Checker Dialog Modal */}
      {activePOSModal === "STOCK_CHECK" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[600px] max-h-[80vh] flex flex-col rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <span>Quick Product Stock Checker</span>
              <button onClick={() => setActivePOSModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-3 bg-slate-100 border-b border-border flex items-center gap-2">
              <input
                type="text"
                autoFocus
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                placeholder="Search by SKU Code or Name..."
                className="erp-input flex-1"
              />
            </div>
            <div className="flex-1 overflow-auto p-3">
              <table className="erp-grid w-full">
                <thead>
                  <tr>
                    <th className="erp-grid-th">SKU</th>
                    <th className="erp-grid-th">Product Name</th>
                    <th className="erp-grid-th text-right">MRP</th>
                    <th className="erp-grid-th text-right">Stock</th>
                    <th className="erp-grid-th text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.filter(p => p.name.toLowerCase().includes(stockSearch.toLowerCase()) || p.code.toLowerCase().includes(stockSearch.toLowerCase())).map((p) => (
                    <tr key={p.code}>
                      <td className="erp-grid-td font-mono">{p.code}</td>
                      <td className="erp-grid-td font-semibold">{p.name}</td>
                      <td className="erp-grid-td text-right">{fmt(p.mrp)}</td>
                      <td className={`erp-grid-td text-right font-bold ${p.stock <= p.reorder ? "text-amber-600" : "text-success"}`}>{p.stock}</td>
                      <td className="erp-grid-td text-center">
                        <button
                          onClick={() => {
                            // Add item to cart
                            const existing = cart.find(x => x.code === p.code);
                            if (existing) {
                              setCart(cart.map(x => x.code === p.code ? { ...x, qty: x.qty + 1 } : x));
                            } else {
                              setCart([...cart, { ...p, qty: 1, disc: 0 }]);
                            }
                            setActivePOSModal(null);
                          }}
                          className="px-2 py-0.5 bg-primary text-primary-foreground text-[11px] rounded-sm font-semibold"
                        >
                          + Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customer Pick Selector Dialog Modal */}
      {activePOSModal === "CUSTOMER_PICK" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[600px] max-h-[80vh] flex flex-col rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <span>Customer Registry Selector</span>
              <button onClick={() => setActivePOSModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-3 bg-slate-100 border-b border-border">
              <input
                type="text"
                autoFocus
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Search by customer name..."
                className="erp-input w-full"
              />
            </div>
            <div className="flex-1 overflow-auto p-3">
              <table className="erp-grid w-full">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Name</th>
                    <th className="erp-grid-th">Mobile</th>
                    <th className="erp-grid-th text-right">O/S Debt</th>
                    <th className="erp-grid-th text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CUSTOMERS.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase())).map((c) => (
                    <tr key={c.code}>
                      <td className="erp-grid-td font-semibold">{c.name}</td>
                      <td className="erp-grid-td font-mono">{c.mobile}</td>
                      <td className="erp-grid-td text-right font-mono font-bold text-destructive">{fmt(c.opening)}</td>
                      <td className="erp-grid-td text-center">
                        <button
                          onClick={() => {
                            context.updatePOSSessionCustomer(activeSession.id, c.name);
                            setActivePOSModal(null);
                          }}
                          className="px-2.5 py-1 bg-primary text-primary-foreground text-[11px] rounded-sm font-semibold"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
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

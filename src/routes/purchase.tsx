import { createFileRoute, useRouter, useRouterState } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { PRODUCTS, SUPPLIERS, fmt } from "@/lib/sample-data";
import { Plus, Trash2, HelpCircle, FileText, Printer, Barcode, ArrowLeft, ArrowRight, RotateCcw, Pause, CreditCard, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/purchase")({
  head: () => ({ meta: [{ title: "Purchase Entry — MyShop Retail Pro" }] }),
  component: Purchase,
});

interface PurchaseItem {
  code: string;
  name: string;
  hsn: string;
  qty: number;
  rate: number;
  disc: number;
  gst: number;
}

// Mock database of saved invoices for F7/F8 navigation
const MOCK_PAST_INVOICES = [
  {
    invoiceNo: "INV/450/24-25",
    supplier: "Devgiri Traders",
    date: "10/06/2024",
    items: [
      { code: "P1001", name: "Whole Wheat Atta 5KG", hsn: "110100", qty: 10, rate: 245, disc: 0, gst: 5 },
      { code: "P1002", name: "Basmati Rice 1KG", hsn: "100630", qty: 15, rate: 115, disc: 0, gst: 5 },
    ],
    transport: 200,
    paid: 4175,
  },
  {
    invoiceNo: "INV/455/24-25",
    supplier: "Global Foods",
    date: "14/06/2024",
    items: [
      { code: "P1003", name: "Sunflower Oil 1L", hsn: "151211", qty: 5, rate: 155, disc: 0, gst: 18 },
    ],
    transport: 100,
    paid: 0,
  }
];

function Purchase() {
  const router = useRouter();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // Master Form States
  const [supplier, setSupplier] = useState(SUPPLIERS[0]?.name || "");
  const [invoiceNo, setInvoiceNo] = useState("INV/456/24-25");
  const [billNo, setBillNo] = useState("456");
  const [invoiceDate, setInvoiceDate] = useState("17/06/2024");
  const [purchaseType, setPurchaseType] = useState("CREDIT PURCHASE");
  const [grnNo, setGrnNo] = useState("GRN25");
  const [grnDate, setGRNDate] = useState("17/06/2024");
  const [dueDate, setDueDate] = useState("27/06/2024");
  const [transport, setTransport] = useState("500.00");
  const [paymentTerms, setPaymentTerms] = useState("10 Days");
  const [vehicleNo, setVehicleNo] = useState("MH12 AB 1234");
  const [narration, setNarration] = useState("Purchase of Grocery Items");

  // Items Cart State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<PurchaseItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_purchase_cart");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      { code: "P1001", name: "Whole Wheat Atta 5KG", hsn: "110100", qty: 25, rate: 245, disc: 0, gst: 5 },
      { code: "P1002", name: "Basmati Rice 1KG", hsn: "100630", qty: 20, rate: 115, disc: 0, gst: 5 },
      { code: "P1003", name: "Sunflower Oil 1L", hsn: "151211", qty: 10, rate: 155, disc: 0, gst: 18 },
      { code: "P1004", name: "Iodised Salt 1KG", hsn: "250100", qty: 10, rate: 18, disc: 0, gst: 0 },
      { code: "P1005", name: "Instant Noodles 70g", hsn: "190230", qty: 20, rate: 12, disc: 0, gst: 12 }
    ];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_purchase_cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<"HELP" | "ADD_ITEM" | "EDIT_ITEM" | "PAYMENT" | "BARCODE" | null>(null);

  // Past invoice navigation index
  const [pastInvoiceIdx, setPastInvoiceIdx] = useState<number | null>(null);

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

  // Add/Edit Product Item State
  const [selectedProductCode, setSelectedProductCode] = useState(() => productList[0]?.code || "");
  const [inputQty, setInputQty] = useState("1");
  const [inputRate, setInputRate] = useState("100");
  const [inputDisc, setInputDisc] = useState("0");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync rate when product selection changes in Add Item modal
  useEffect(() => {
    const prod = productList.find(p => p.code === selectedProductCode);
    if (prod) {
      setInputRate(prod.rate.toString());
    }
  }, [selectedProductCode]);

  // Calculations
  const totalQty = cartItems.reduce((acc, it) => acc + it.qty, 0);
  const taxableAmt = cartItems.reduce((acc, it) => acc + (it.rate * it.qty - it.disc), 0);
  const totalGst = cartItems.reduce((acc, it) => acc + ((it.rate * it.qty - it.disc) * it.gst / 100), 0);
  const transportVal = parseFloat(transport) || 0;
  const netAmount = taxableAmt + totalGst + transportVal;
  const balance = netAmount - amountPaid;

  const handleAddItem = () => {
    const prod = productList.find(p => p.code === selectedProductCode);
    if (!prod) return;

    const qty = parseFloat(inputQty);
    const rate = parseFloat(inputRate);
    const disc = parseFloat(inputDisc) || 0;

    if (isNaN(qty) || qty <= 0 || isNaN(rate) || rate <= 0) {
      toast.error("Please enter a valid quantity and purchase rate.");
      return;
    }

    const newItem: PurchaseItem = {
      code: prod.code,
      name: prod.name,
      hsn: prod.hsn || "190531",
      qty,
      rate,
      disc,
      gst: prod.gst || 0
    };

    setCartItems([...cartItems, newItem]);
    toast.success(`${prod.name} added to purchase cart.`);
    setActiveModal(null);
  };

  const handleEditItem = () => {
    if (selectedIdx === null) return;
    const qty = parseFloat(inputQty);
    const rate = parseFloat(inputRate);
    const disc = parseFloat(inputDisc) || 0;

    if (isNaN(qty) || qty <= 0 || isNaN(rate) || rate <= 0) {
      toast.error("Please enter valid quantities.");
      return;
    }

    const updated = [...cartItems];
    updated[selectedIdx] = {
      ...updated[selectedIdx],
      qty,
      rate,
      disc
    };
    setCartItems(updated);
    toast.success("Item details updated in cart.");
    setActiveModal(null);
  };

  const handleDeleteItem = (idx: number) => {
    const updated = cartItems.filter((_, i) => i !== idx);
    setCartItems(updated);
    setSelectedIdx(null);
    toast.info("Item removed from purchase invoice.");
  };

  const handleSaveInvoice = () => {
    if (cartItems.length === 0) {
      toast.error("Cannot save an empty purchase invoice.");
      return;
    }
    toast.success(`Purchase Invoice ${invoiceNo} recorded successfully! Supplier ledger balance updated.`);
  };

  const handleClear = () => {
    setCartItems([]);
    setAmountPaid(0);
    setInvoiceNo(`INV/${Math.floor(100 + Math.random() * 900)}/24-25`);
    setBillNo(Math.floor(100 + Math.random() * 900).toString());
    setNarration("");
    setSelectedIdx(null);
    toast.success("Purchase entry form reset successfully.");
  };

  const handleHold = () => {
    if (cartItems.length === 0) return;
    toast.success(`Invoice ${invoiceNo} placed on hold.`);
  };

  const handlePreviousInvoice = () => {
    const nextIdx = pastInvoiceIdx === null ? 0 : Math.min(pastInvoiceIdx + 1, MOCK_PAST_INVOICES.length - 1);
    setPastInvoiceIdx(nextIdx);
    const invoice = MOCK_PAST_INVOICES[nextIdx];
    setInvoiceNo(invoice.invoiceNo);
    setSupplier(invoice.supplier);
    setInvoiceDate(invoice.date);
    setCartItems(invoice.items);
    setTransport(invoice.transport.toString());
    setAmountPaid(invoice.paid);
    toast.info(`Loading historical invoice: ${invoice.invoiceNo}`);
  };

  const handleNextInvoice = () => {
    if (pastInvoiceIdx === null || pastInvoiceIdx === 0) {
      setPastInvoiceIdx(null);
      handleClear();
      toast.info("Returned to new active invoice creation.");
    } else {
      const nextIdx = pastInvoiceIdx - 1;
      setPastInvoiceIdx(nextIdx);
      const invoice = MOCK_PAST_INVOICES[nextIdx];
      setInvoiceNo(invoice.invoiceNo);
      setSupplier(invoice.supplier);
      setInvoiceDate(invoice.date);
      setCartItems(invoice.items);
      setTransport(invoice.transport.toString());
      setAmountPaid(invoice.paid);
      toast.info(`Loading historical invoice: ${invoice.invoiceNo}`);
    }
  };

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => { setActiveModal("HELP"); toast.info("Opening Purchase Entry Guide..."); } },
      { key: "F2", label: "Edit", onClick: () => { if (selectedIdx !== null) { setInputQty(cartItems[selectedIdx].qty.toString()); setInputRate(cartItems[selectedIdx].rate.toString()); setInputDisc(cartItems[selectedIdx].disc.toString()); setActiveModal("EDIT_ITEM"); } else { toast.warning("Please select an item row in the table first."); } } },
      { key: "F3", label: "Delete", tone: "danger", onClick: () => { if (selectedIdx !== null) { handleDeleteItem(selectedIdx); } else { toast.warning("Please select a row to delete."); } } },
      { key: "F4", label: "Save", tone: "primary", onClick: handleSaveInvoice },
      { key: "F5", label: "Print", onClick: () => { toast.info("Printing purchase voucher..."); window.print(); } },
      { key: "F6", label: "Barcode", onClick: () => { if (cartItems.length > 0) { setActiveModal("BARCODE"); } else { toast.warning("Purchase entry must have items to generate barcodes."); } } },
      { key: "F7", label: "Previous", onClick: handlePreviousInvoice },
      { key: "F8", label: "Next", onClick: handleNextInvoice },
      { key: "F9", label: "Clear", onClick: handleClear },
      { key: "F10", label: "Hold", onClick: handleHold },
      { key: "F11", label: "Payment", onClick: () => setActiveModal("PAYMENT") },
      { key: "F12", label: "Close", onClick: () => router.navigate({ to: "/" }) },
    ]}>
      <div className="grid grid-cols-[1fr_300px] gap-3">
        <div className="space-y-3">
          <Panel title="Purchase Details">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <Field label="Supplier Name">
                <Select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
                  {SUPPLIERS.map((s) => <option key={s.code} value={s.name}>{s.name}</option>)}
                </Select>
              </Field>
              <Field label="Invoice No"><Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)}/></Field>
              <Field label="Bill No"><Input value={billNo} onChange={(e) => setBillNo(e.target.value)}/></Field>
              <Field label="Invoice Date"><Input value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)}/></Field>
              <Field label="Purchase Type">
                <Select value={purchaseType} onChange={(e) => setPurchaseType(e.target.value)}>
                  <option value="CREDIT PURCHASE">CREDIT PURCHASE</option>
                  <option value="CASH PURCHASE">CASH PURCHASE</option>
                </Select>
              </Field>
              <Field label="GRN Date"><Input value={grnDate} onChange={(e) => setGRNDate(e.target.value)}/></Field>
              <Field label="GRN No"><Input value={grnNo} onChange={(e) => setGrnNo(e.target.value)}/></Field>
              <Field label="Due Date"><Input value={dueDate} onChange={(e) => setDueDate(e.target.value)}/></Field>
              <Field label="Transport"><Input value={transport} onChange={(e) => setTransport(e.target.value)}/></Field>
              <Field label="Payment Terms">
                <Select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)}>
                  <option value="10 Days">10 Days</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="Immediate">Immediate Cash</option>
                </Select>
              </Field>
              <Field label="Vehicle No"><Input value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)}/></Field>
              <Field label="Narration"><Input value={narration} onChange={(e) => setNarration(e.target.value)}/></Field>
            </div>
          </Panel>

          <Panel title="Enter Items" right={<button onClick={() => setActiveModal("ADD_ITEM")} className="flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-2 py-1 text-white text-[11px] cursor-pointer hover:opacity-90"><Plus className="h-3.5 w-3.5"/>Add Item</button>}>
            <table className="erp-grid">
              <thead>
                <tr>
                  <th className="erp-grid-th w-10">S.No</th>
                  <th className="erp-grid-th">Code</th>
                  <th className="erp-grid-th">Item</th>
                  <th className="erp-grid-th">HSN</th>
                  <th className="erp-grid-th text-right">Qty</th>
                  <th className="erp-grid-th text-right">Rate</th>
                  <th className="erp-grid-th text-right">Disc</th>
                  <th className="erp-grid-th text-right">GST %</th>
                  <th className="erp-grid-th text-right">GST Amt</th>
                  <th className="erp-grid-th text-right">Amount</th>
                  <th className="erp-grid-th w-8"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((it, i) => {
                  const amt = it.rate * it.qty - it.disc;
                  const gstAmt = (amt * it.gst) / 100;
                  const isSelected = selectedIdx === i;
                  return (
                    <tr 
                      key={it.code + i} 
                      onClick={() => setSelectedIdx(i)}
                      className={`cursor-pointer hover:bg-primary/10 transition-colors ${isSelected ? "bg-primary/15 font-semibold text-primary" : (i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "")}`}
                    >
                      <td className="erp-grid-td text-center">{i + 1}</td>
                      <td className="erp-grid-td font-mono">{it.code}</td>
                      <td className="erp-grid-td">{it.name}</td>
                      <td className="erp-grid-td font-mono text-xs">{it.hsn}</td>
                      <td className="erp-grid-td text-right font-mono">{it.qty.toFixed(3)}</td>
                      <td className="erp-grid-td text-right font-mono">{fmt(it.rate)}</td>
                      <td className="erp-grid-td text-right font-mono">{fmt(it.disc)}</td>
                      <td className="erp-grid-td text-right font-mono">{it.gst}</td>
                      <td className="erp-grid-td text-right font-mono">{fmt(gstAmt)}</td>
                      <td className="erp-grid-td text-right font-mono font-bold text-primary">{fmt(amt + gstAmt)}</td>
                      <td className="erp-grid-td text-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteItem(i); }} 
                          className="text-destructive hover:bg-red-50 p-1 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5"/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {cartItems.length === 0 && (
                  <tr><td colSpan={11} className="erp-grid-td text-center text-muted-foreground py-6">Purchase cart is empty. Click "+ Add Item" to populate.</td></tr>
                )}
              </tbody>
            </table>
            <div className="mt-2 flex justify-between border-t border-border pt-2 text-[12.5px]">
              <span>Total Items : <b>{cartItems.length}</b></span>
              <span>Total Qty : <b>{totalQty.toFixed(3)}</b></span>
              <span>Total Amount : <b className="text-primary">₹ {fmt(taxableAmt + totalGst)}</b></span>
            </div>
          </Panel>
        </div>

        {/* Bill Summary Right Side */}
        <div className="space-y-3">
          <Panel title="Bill Summary">
            <div className="space-y-2 text-[12.5px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Items</span><b>{cartItems.length}</b></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Qty</span><b>{totalQty.toFixed(3)}</b></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Disc</span><b>₹ {fmt(cartItems.reduce((a,it)=>a+it.disc,0))}</b></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Taxable Amt</span><b>₹ {fmt(taxableAmt)}</b></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total GST</span><b>₹ {fmt(totalGst)}</b></div>
              {transportVal > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Freight Transport</span><b>₹ {fmt(transportVal)}</b></div>}
              <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>Net Amount</span><b className="text-primary">₹ {fmt(netAmount)}</b></div>
              <div className="flex justify-between"><span>Amount Paid</span><b className="text-success">₹ {fmt(amountPaid)}</b></div>
              <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>Balance</span><b className="text-destructive">₹ {fmt(balance)}</b></div>
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

      {/* HELP DIALOG MANUAL MODAL [F1] */}
      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[480px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Purchase Entry Manual Guide [F1]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <table className="erp-grid w-full bg-white">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Key</th>
                    <th className="erp-grid-th">Action Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">View this help manual dialog</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Edit selected item count or price rate</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td text-destructive font-semibold">Delete selected item from entry list</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td text-primary font-semibold">Save complete invoice to supplier records</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Print purchase order / GRN slip</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F6</td><td className="erp-grid-td">Generate and print barcodes for cart</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Load previous historical saved purchase</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F8</td><td className="erp-grid-td">Load next saved purchase / clear back to new</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F9</td><td className="erp-grid-td">Clear all items and reset active inputs</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F10</td><td className="erp-grid-td">Hold current session without posting</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F11</td><td className="erp-grid-td">Record payment cash / bank transaction values</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F12</td><td className="erp-grid-td">Close and exit back to Dashboard</td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD ITEM MODAL [F2] / EDIT ITEM MODAL [F3] */}
      {(activeModal === "ADD_ITEM" || activeModal === "EDIT_ITEM") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{activeModal === "ADD_ITEM" ? "Add Inward Item" : "Edit Item Configuration"}</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="space-y-2">
                {activeModal === "ADD_ITEM" ? (
                  <Field label="Choose Product">
                    <Select value={selectedProductCode} onChange={(e) => setSelectedProductCode(e.target.value)}>
                      {productList.map(p => <option key={p.code} value={p.code}>{p.name} ({p.code})</option>)}
                    </Select>
                  </Field>
                ) : (
                  <Field label="Selected Item"><Input value={cartItems[selectedIdx || 0]?.name} disabled /></Field>
                )}
                <Field label="Purchase Quantity"><Input type="number" value={inputQty} onChange={(e) => setInputQty(e.target.value)} className="text-right" /></Field>
                <Field label="Purchase Cost Rate"><Input type="number" value={inputRate} onChange={(e) => setInputRate(e.target.value)} className="text-right" /></Field>
                <Field label="Item Discount Amount"><Input type="number" value={inputDisc} onChange={(e) => setInputDisc(e.target.value)} className="text-right" /></Field>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Discard</button>
                <button onClick={activeModal === "ADD_ITEM" ? handleAddItem : handleEditItem} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">
                  {activeModal === "ADD_ITEM" ? "Add to Cart" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RECORD PAYMENT MODAL [F11] */}
      {activeModal === "PAYMENT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[380px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Record Supplier Payment [F11]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 mb-2 space-y-1 text-xs">
                <div className="text-muted-foreground">Supplier:</div>
                <div className="font-semibold text-primary text-sm">{supplier}</div>
                <div className="flex justify-between border-t pt-1 mt-1"><span>Net Bill Value:</span><span className="font-bold font-mono text-primary">₹ {fmt(netAmount)}</span></div>
              </div>
              <Field label="Amount Paid"><Input type="number" value={amountPaid.toString()} onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)} className="text-right font-bold text-success" /></Field>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Close</button>
                <button onClick={() => { toast.success("Payment recorded. Remaining balance updated."); setActiveModal(null); }} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">Apply Payment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BARCODE TAGS GENERATOR [F6] */}
      {activeModal === "BARCODE" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Barcode className="h-4 w-4" />
                <span>Print Barcodes for Inward Stock [F6]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 max-h-48 overflow-y-auto space-y-1.5">
                <div className="font-bold border-b pb-1 text-primary">Barcode Tag Quantities list</div>
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span>{item.name} ({item.code})</span>
                    <span className="font-bold font-mono">{item.qty} tags</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel</button>
                <button 
                  onClick={() => {
                    toast.success("Printed barcode tag labels successfully dispatched to printer!");
                    setActiveModal(null);
                  }}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors"
                >
                  Print Stickers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}

function Row({ k, v }: any) { 
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <b>{v}</b>
    </div>
  ); 
}

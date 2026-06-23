import { createFileRoute, useRouter } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { PRODUCTS, CUSTOMERS, fmt } from "@/lib/sample-data";
import { X, Plus, HelpCircle, FileText, Printer, Mail, CreditCard, Receipt, FileDown, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-invoice")({
  head: () => ({ meta: [{ title: "Sales Invoice — MyShop Retail Pro" }] }),
  component: SalesInvoice,
});

interface InvoiceItem {
  code: string;
  name: string;
  hsn: string;
  unit: string;
  qty: number;
  rate: number;
  gst: number;
}

function SalesInvoice() {
  const router = useRouter();

  // Invoice Form State
  const [invoiceNo, setInvoiceNo] = useState("INV/125/24-25");
  const [selectedCustCode, setSelectedCustCode] = useState(CUSTOMERS[0]?.code || "");
  const [invoiceDate, setInvoiceDate] = useState("17/06/2024");
  const [dueDate, setDueDate] = useState("17/06/2024");
  const [remarks, setRemarks] = useState("Thank you for your business.");
  const [deliveryNote, setDeliveryNote] = useState("DN/125/24-25");
  const [paymentMode, setPaymentMode] = useState("Credit");
  const [advancePaid, setAdvancePaid] = useState("0.00");
  const [salesman, setSalesman] = useState("AMIT");

  // Items State
  const [cartItems, setCartItems] = useState<InvoiceItem[]>([
    { code: "P1001", name: "Whole Wheat Atta 5KG", hsn: "110100", unit: "PCS", qty: 5, rate: 245, gst: 5 },
    { code: "P1002", name: "Basmati Rice 1KG", hsn: "100630", unit: "PCS", qty: 3, rate: 115, gst: 5 },
    { code: "P1003", name: "Sunflower Oil 1L", hsn: "151211", unit: "PCS", qty: 2, rate: 155, gst: 18 },
    { code: "P1004", name: "Iodised Salt 1KG", hsn: "250100", unit: "PCS", qty: 2, rate: 18, gst: 0 },
    { code: "P1005", name: "Instant Noodles 70g", hsn: "190230", unit: "PCS", qty: 4, rate: 12, gst: 12 }
  ]);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<"HELP" | "ADD_ITEM" | "EDIT_ITEM" | "RECEIPT" | null>(null);

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

  // Modal Input state
  const [selectedProductCode, setSelectedProductCode] = useState(() => productList[0]?.code || "");
  const [inputQty, setInputQty] = useState("1");
  const [inputRate, setInputRate] = useState("100");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const prod = productList.find(p => p.code === selectedProductCode);
    if (prod) {
      setInputRate(prod.rate.toString());
    }
  }, [selectedProductCode]);

  // Calculations
  const activeCustomer = CUSTOMERS.find(c => c.code === selectedCustCode) || CUSTOMERS[0];
  const totalQty = cartItems.reduce((acc, it) => acc + it.qty, 0);
  const totalTaxable = cartItems.reduce((acc, it) => acc + it.rate * it.qty, 0);
  
  // Tax Details Calculation
  const totalCgst = cartItems.reduce((acc, it) => acc + (it.rate * it.qty * (it.gst / 2) / 100), 0);
  const totalSgst = totalCgst; // SGST equals CGST in CGST+SGST systems
  const totalTaxAmt = totalCgst + totalSgst;
  const invoiceTotal = totalTaxable + totalTaxAmt;
  
  const advanceVal = parseFloat(advancePaid) || 0;
  const balanceDue = invoiceTotal - advanceVal;

  const handleAddItem = () => {
    const prod = productList.find(p => p.code === selectedProductCode);
    if (!prod) return;

    const qty = parseFloat(inputQty);
    const rate = parseFloat(inputRate);

    if (isNaN(qty) || qty <= 0 || isNaN(rate) || rate <= 0) {
      toast.error("Please enter a valid quantity and rate.");
      return;
    }

    const newItem: InvoiceItem = {
      code: prod.code,
      name: prod.name,
      hsn: prod.hsn || "190531",
      unit: prod.unit,
      qty,
      rate,
      gst: prod.gst || 0
    };

    setCartItems([...cartItems, newItem]);
    toast.success(`${prod.name} added to invoice items list.`);
    setActiveModal(null);
  };

  const handleEditItem = () => {
    if (selectedIdx === null) return;
    const qty = parseFloat(inputQty);
    const rate = parseFloat(inputRate);

    if (isNaN(qty) || qty <= 0 || isNaN(rate) || rate <= 0) {
      toast.error("Please enter valid quantity and rate.");
      return;
    }

    const updated = [...cartItems];
    updated[selectedIdx] = {
      ...updated[selectedIdx],
      qty,
      rate
    };
    setCartItems(updated);
    toast.success("Invoice item details modified.");
    setActiveModal(null);
  };

  const handleDeleteItem = (idx: number) => {
    const updated = cartItems.filter((_, i) => i !== idx);
    setCartItems(updated);
    setSelectedIdx(null);
    toast.info("Item deleted from invoice.");
  };

  const handleSaveInvoice = () => {
    if (cartItems.length === 0) {
      toast.error("Cannot save an empty invoice.");
      return;
    }
    toast.success(`Sales Invoice ${invoiceNo} saved successfully! Customer ledger updated.`);
  };

  const handleNew = () => {
    setCartItems([]);
    setInvoiceNo(`INV/${Math.floor(120 + Math.random() * 800)}/24-25`);
    setAdvancePaid("0.00");
    setRemarks("");
    setSelectedIdx(null);
    toast.success("Cleared invoice layout. Ready for a new entry.");
  };

  const handleEmail = () => {
    toast.success(`Invoicing copy emailed to customer ${activeCustomer.name} (${activeCustomer.mobile}@myshop.in)`);
  };

  const handlePDFExport = () => {
    toast.info("Generating invoice PDF document...");
    setTimeout(() => {
      toast.success(`Invoice_${invoiceNo.replace(/\//g, "_")}.pdf downloaded successfully.`);
    }, 800);
  };

  const handleRefresh = () => {
    toast.success("Synchronized tax slabs and item pricing rules.");
  };

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => { setActiveModal("HELP"); toast.info("Opening Sales Invoice Manual..."); } },
      { key: "F2", label: "New", tone: "primary", onClick: handleNew },
      { key: "F3", label: "Edit", onClick: () => { if (selectedIdx !== null) { setInputQty(cartItems[selectedIdx].qty.toString()); setInputRate(cartItems[selectedIdx].rate.toString()); setActiveModal("EDIT_ITEM"); } else { toast.warning("Please select a product row to edit."); } } },
      { key: "F4", label: "Delete", tone: "danger", onClick: () => { if (selectedIdx !== null) { handleDeleteItem(selectedIdx); } else { toast.warning("Please select an item row to delete."); } } },
      { key: "F5", label: "Save", onClick: handleSaveInvoice },
      { key: "F6", label: "Print", onClick: () => { toast.info("Dispatching invoice to thermal printer..."); window.print(); } },
      { key: "F7", label: "Email", onClick: handleEmail },
      { key: "F8", label: "Payment", onClick: () => { setActiveModal("RECEIPT"); toast.info("Awaiting payment terms..."); } },
      { key: "F9", label: "Receipt", onClick: () => { setActiveModal("RECEIPT"); toast.info("Entering payment details..."); } },
      { key: "F10", label: "PDF Export", onClick: handlePDFExport },
      { key: "F11", label: "Refresh", onClick: handleRefresh },
      { key: "F12", label: "Close", onClick: () => router.navigate({ to: "/" }) },
    ]}>
      <div className="grid grid-cols-[1fr_320px] gap-3">
        <div className="space-y-3">
          {/* Invoice Details panel */}
          <Panel title="Invoice Details">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <Field label="Invoice No"><Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} /></Field>
              <Field label="Bill To">
                <Select value={selectedCustCode} onChange={(e) => setSelectedCustCode(e.target.value)}>
                  {CUSTOMERS.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name.toUpperCase()}</option>)}
                </Select>
              </Field>
              <Field label="Invoice Date"><Input value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} /></Field>
              <Field label="Price Level">
                <Select><option>LEVEL 1</option><option>LEVEL 2</option></Select>
              </Field>
              <Field label="Due Date"><Input value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></Field>
              <Field label="Payment Terms">
                <Select><option>15 Days</option><option>Immediate Cash</option><option>30 Days</option></Select>
              </Field>
              <Field label="Salesman">
                <Select value={salesman} onChange={(e) => setSalesman(e.target.value)}><option value="AMIT">AMIT</option><option value="VIKRAM">VIKRAM</option></Select>
              </Field>
              <Field label="Credit Days"><Input defaultValue="15" /></Field>
              <Field label="Reference"><Input defaultValue="Walk-in Customer" /></Field>
              <Field label="Currency"><Select><option>INR</option></Select></Field>
              <Field label="Remarks"><Input value={remarks} onChange={(e) => setRemarks(e.target.value)} /></Field>
              <Field label="Delivery Note"><Input value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} /></Field>
            </div>
          </Panel>

          {/* Invoice Items table */}
          <Panel title="Invoice Items" right={<button onClick={() => setActiveModal("ADD_ITEM")} className="flex items-center gap-1 rounded-sm bg-[color:var(--color-success)] px-2 py-1 text-white text-[11px] cursor-pointer hover:opacity-95"><Plus className="h-3.5 w-3.5"/>Add</button>}>
            <table className="erp-grid">
              <thead>
                <tr>
                  <th className="erp-grid-th w-10">S.No</th>
                  <th className="erp-grid-th w-20">Item Code</th>
                  <th className="erp-grid-th">Item Name</th>
                  <th className="erp-grid-th">HSN</th>
                  <th className="erp-grid-th">Unit</th>
                  <th className="erp-grid-th text-right">Qty</th>
                  <th className="erp-grid-th text-right">Rate</th>
                  <th className="erp-grid-th text-right">Taxable</th>
                  <th className="erp-grid-th text-right">CGST</th>
                  <th className="erp-grid-th text-right">SGST</th>
                  <th className="erp-grid-th text-right">Total</th>
                  <th className="erp-grid-th w-6"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((it, i) => {
                  const tax = it.rate * it.qty;
                  const c = (tax * it.gst / 2) / 100;
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
                      <td className="erp-grid-td text-center">{it.unit}</td>
                      <td className="erp-grid-td text-right font-mono">{it.qty.toFixed(3)}</td>
                      <td className="erp-grid-td text-right font-mono">{fmt(it.rate)}</td>
                      <td className="erp-grid-td text-right font-mono">{fmt(tax)}</td>
                      <td className="erp-grid-td text-right font-mono text-muted-foreground">{fmt(c)}</td>
                      <td className="erp-grid-td text-right font-mono text-muted-foreground">{fmt(c)}</td>
                      <td className="erp-grid-td text-right font-mono font-bold text-primary">{fmt(tax + 2 * c)}</td>
                      <td className="erp-grid-td text-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteItem(i); }}
                          className="text-destructive hover:bg-red-50 p-0.5 rounded transition-colors"
                        >
                          <X className="h-3.5 w-3.5"/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {cartItems.length === 0 && (
                  <tr><td colSpan={12} className="erp-grid-td text-center text-muted-foreground py-6">Billing list is empty. Click "Add" to select items.</td></tr>
                )}
              </tbody>
            </table>
          </Panel>

          {/* Bottom Summaries */}
          <div className="grid grid-cols-3 gap-3">
            <Panel title="Tax Summary">
              <table className="erp-grid">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Type</th>
                    <th className="erp-grid-th text-right">Taxable</th>
                    <th className="erp-grid-th text-right">CGST</th>
                    <th className="erp-grid-th text-right">SGST</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="erp-grid-td">GST Outwards (Taxes)</td>
                    <td className="erp-grid-td text-right font-mono">{fmt(totalTaxable)}</td>
                    <td className="erp-grid-td text-right font-mono text-success">{fmt(totalCgst)}</td>
                    <td className="erp-grid-td text-right font-mono text-success">{fmt(totalSgst)}</td>
                  </tr>
                </tbody>
              </table>
            </Panel>
            <Panel title="Amount Summary">
              <div className="space-y-1.5 text-[12.5px]">
                <Row k="Total Items" v={cartItems.length.toString()}/>
                <Row k="Total Qty" v={totalQty.toFixed(3)}/>
                <Row k="Total Taxable" v={fmt(totalTaxable)}/>
                <Row k="Total Tax Amount" v={`₹ ${fmt(totalTaxAmt)}`}/>
                <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>Invoice Total</span><b className="text-primary">₹ {fmt(invoiceTotal)}</b></div>
              </div>
            </Panel>
            <Panel title="Payment">
              <div className="space-y-2 text-[12.5px]">
                <Field label="Payment Mode">
                  <Select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                    <option value="Credit">Credit</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI Portal</option>
                  </Select>
                </Field>
                <Field label="Advance Received">
                  <Input value={advancePaid} onChange={(e) => setAdvancePaid(e.target.value)} className="text-right font-mono font-semibold" />
                </Field>
                <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>Balance Due</span><b className="text-destructive">₹ {fmt(balanceDue)}</b></div>
              </div>
            </Panel>
          </div>
        </div>

        {/* Customer Details Side Panel */}
        <Panel title="Customer Details">
          <div className="space-y-1.5 text-[12.5px]">
            <Row k="Opening Balance" v={`${fmt(activeCustomer.opening)} Dr`} tone="text-destructive font-mono"/>
            <Row k="Credit Limit" v={fmt(activeCustomer.limit)}/>
            <Row k="Current Balance" v={`${fmt(activeCustomer.opening + balanceDue)} Dr`} tone="text-destructive font-mono"/>
            <Row k="Available Credit" v={fmt(activeCustomer.limit - activeCustomer.opening - balanceDue)}/>
            <Row k="Last Invoice" v="INV/124 (15/05)"/>
            <Row k="Last Payment" v="RCPT/124 (15/05)"/>
          </div>
          <div className="mt-3 border-t border-border pt-2 text-[12.5px]">
            <div className="font-semibold text-primary mb-1">Amount in Words</div>
            <div className="bg-slate-50 p-2 border rounded-sm text-xs leading-relaxed text-muted-foreground italic font-medium">
              INR {invoiceTotal.toFixed(2)} Only.
            </div>
          </div>
          <div className="mt-3 border-t border-border pt-2 text-[12.5px]">
            <div className="font-semibold text-primary">Terms &amp; Conditions</div>
            <div className="text-[11.5px] text-muted-foreground space-y-0.5 mt-1">
              <div>1. Goods once sold will not be taken back.</div>
              <div>2. Subject to Indore Jurisdiction only.</div>
            </div>
          </div>
        </Panel>
      </div>

      {/* HELP DIALOG MANUAL MODAL [F1] */}
      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[480px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Sales Invoice Manual Guide [F1]</span>
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
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">View this manual reference guide</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Reset layout and start a new Sales Invoice</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Edit selected item's quantity or price slab</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td text-destructive font-semibold">Delete selected billing item from entry list</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td text-primary font-semibold">Save complete invoice and commit credit</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F6</td><td className="erp-grid-td">Dispatches invoice thermal print layout</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Email PDF copy to registered customer address</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F8 / F9</td><td className="erp-grid-td">Open payment mode or advance receipt input modals</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F10</td><td className="erp-grid-td">Download invoice layout document in PDF format</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F11</td><td className="erp-grid-td">Synchronize customer limit validations</td></tr>
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
                <span>{activeModal === "ADD_ITEM" ? "Add Sales Billing Item" : "Modify Billing Item"}</span>
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
                <Field label="Quantity"><Input type="number" value={inputQty} onChange={(e) => setInputQty(e.target.value)} className="text-right" /></Field>
                <Field label="Selling Rate"><Input type="number" value={inputRate} onChange={(e) => setInputRate(e.target.value)} className="text-right" /></Field>
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

      {/* PAYMENT / RECEIPT INPUT DIALOG [F8/F9] */}
      {activeModal === "RECEIPT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[380px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                <span>Advance Receipt / Payment [F8/F9]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 mb-2 space-y-1 text-xs">
                <div className="text-muted-foreground font-medium">Billing To:</div>
                <div className="font-semibold text-primary text-sm">{activeCustomer.name}</div>
                <div className="flex justify-between border-t pt-1.5 mt-1 font-bold"><span>Invoice Total:</span><span>₹ {fmt(invoiceTotal)}</span></div>
              </div>
              <Field label="Advance Received"><Input type="number" value={advancePaid} onChange={(e) => setAdvancePaid(e.target.value)} className="text-right font-bold text-success" /></Field>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Discard</button>
                <button onClick={() => { toast.success("Advance payment registered. Balance due recalculated."); setActiveModal(null); }} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">Apply Receipt</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}

function Row({ k, v, tone="" }: any) { 
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={tone}>{v}</span>
    </div>
  ); 
}

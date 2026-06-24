import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { PRODUCTS, fmt } from "@/lib/sample-data";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Image as ImageIcon, X, HelpCircle, FileText } from "lucide-react";
import { useERPCommands } from "@/lib/erp-context";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Product Master — MyShop Retail Pro" }] }),
  component: ProductMaster,
});

const GROUPS = ["Grocery", "Beverages", "Dairy", "Personal Care", "Home Care", "Snacks", "Frozen", "Bakery", "Pulses & Grains", "Oils & Spices", "Stationery", "General"];
const SUB_GROUPS = ["Atta/Flour", "Rice", "Cooking Oil", "Salt", "Noodles", "Biscuits", "Sugar", "Tea", "Milk", "Butter", "Dental", "Soap", "Detergent", "Health", "General"];
const BRANDS = ["Annapurna", "Royal", "Sundrop", "Tata", "Maggi", "Parle", "Madhur", "Lipton", "Amul", "Colgate", "Lux", "Surf", "Dettol", "Rajdhani", "Generic"];
const UNITS = ["PCS", "BOX", "KG", "LITER", "PACK", "BOTTLE", "GRAM", "DOZEN", "METER", "CAN", "BAG", "BOXES"];

function ProductMaster() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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
    return PRODUCTS.map((p) => ({ ...p }));
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

  const [selectedCode, setSelectedCode] = useState<string | null>(() => productList[0]?.code || null);
  const [mode, setMode] = useState<"View" | "New" | "Edit">("View");
  const [tab, setTab] = useState("General");
  const [activeModal, setActiveModal] = useState<"HELP" | "STOCK_ADJUST" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustReason, setAdjustReason] = useState("Physical Count Verify");
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_products", JSON.stringify(productList));
    }
  }, [productList]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  
  // Fields for forms (local edit state)
  const selectedProduct = productList.find((p) => p.code === selectedCode) || productList[0];
  const [formName, setFormName] = useState(selectedProduct?.name || "");
  const [formRate, setFormRate] = useState(selectedProduct?.rate || 0);
  const [formMrp, setFormMrp] = useState(selectedProduct?.mrp || 0);
  const [formGst, setFormGst] = useState(selectedProduct?.gst || 0);
  const [formImage, setFormImage] = useState<string | null>(selectedProduct?.image || null);
  const [formGroup, setFormGroup] = useState(selectedProduct?.group || "Grocery");
  const [formSubGroup, setFormSubGroup] = useState(selectedProduct?.subGroup || "General");
  const [formBrand, setFormBrand] = useState(selectedProduct?.brand || "Generic");
  const [formUnit, setFormUnit] = useState(selectedProduct?.unit || "PCS");

  // Sync state on change selection
  const handleSelectProduct = (code: string) => {
    const prod = productList.find((p) => p.code === code);
    if (prod) {
      setSelectedCode(code);
      setFormName(prod.name);
      setFormRate(prod.rate);
      setFormMrp(prod.mrp);
      setFormGst(prod.gst || 0);
      setFormImage(prod.image || null);
      setFormGroup(prod.group || "Grocery");
      setFormSubGroup(prod.subGroup || "General");
      setFormBrand(prod.brand || "Generic");
      setFormUnit(prod.unit || "PCS");
      setMode("View");
    }
  };

  const handleSave = () => {
    if (mode === "New") {
      const newCode = `P${1000 + productList.length + 1}`;
      const newProduct = {
        code: newCode,
        barcode: `890${Math.floor(Math.random() * 1000000000)}`,
        name: formName,
        group: formGroup,
        subGroup: formSubGroup,
        brand: formBrand,
        mrp: formMrp,
        rate: formRate,
        stock: 0,
        unit: formUnit,
        reorder: 5,
        hsn: "000000",
        gst: formGst,
        image: formImage
      };
      setProductList([...productList, newProduct]);
      setSelectedCode(newCode);
      alert("Product saved successfully!");
    } else if (mode === "Edit" && selectedCode) {
      setProductList(
        productList.map((p) =>
          p.code === selectedCode ? { ...p, name: formName, rate: formRate, mrp: formMrp, gst: formGst, image: formImage, group: formGroup, subGroup: formSubGroup, brand: formBrand, unit: formUnit } : p
        )
      );
      alert("Product changes updated successfully!");
    }
    setMode("View");
  };

  const handleAdjustStock = () => {
    if (!selectedCode) return;
    const diff = parseFloat(adjustQty);
    if (isNaN(diff) || diff === 0) {
      alert("Please enter a valid non-zero quantity.");
      return;
    }
    const updated = productList.map((p) => {
      if (p.code === selectedCode) {
        const nextStock = Math.max(0, p.stock + diff);
        return { ...p, stock: nextStock };
      }
      return p;
    });
    setProductList(updated);
    alert(`Stock adjusted successfully by ${diff > 0 ? "+" : ""}${diff} units.`);
    setAdjustQty("");
    setActiveModal(null);
  };

  const handleDelete = () => {
    if (!selectedCode) return;
    if (confirm(`Are you sure you want to delete product ${selectedCode}?`)) {
      const updated = productList.filter((p) => p.code !== selectedCode);
      setProductList(updated);
      setSelectedCode(updated[0]?.code || null);
      if (updated[0]) {
        setFormName(updated[0].name);
        setFormRate(updated[0].rate);
        setFormMrp(updated[0].mrp);
        setFormGst(updated[0].gst || 0);
        setFormImage(updated[0].image || null);
        setFormGroup(updated[0].group || "Grocery");
        setFormSubGroup(updated[0].subGroup || "General");
        setFormBrand(updated[0].brand || "Generic");
        setFormUnit(updated[0].unit || "PCS");
      }
      setMode("View");
      alert("Product deleted!");
    }
  };

  // Register Products Page with commands Context
  const { context } = useERPCommands({
    pageName: "products",
    availableCommands: ["NEW", "EDIT", "DELETE", "SAVE", "PRINT", "STOCK"],
    selectedRecordId: selectedCode,
    isDirty: mode !== "View",
    onCommand: (cmd) => {
      if (cmd === "NEW") {
        setMode("New");
        setFormName("");
        setFormRate(0);
        setFormMrp(0);
        setFormGst(18);
        setFormImage(null);
        setFormGroup("Grocery");
        setFormSubGroup("General");
        setFormBrand("Generic");
        setFormUnit("PCS");
      } else if (cmd === "EDIT") {
        if (selectedCode) {
          setMode("Edit");
        }
      } else if (cmd === "DELETE") {
        handleDelete();
      } else if (cmd === "SAVE") {
        handleSave();
      } else if (cmd === "PRINT") {
        alert("Generating report PDF preview for current catalog list...");
        window.print();
      } else if (cmd === "STOCK") {
        if (selectedCode) {
          setActiveModal("STOCK_ADJUST");
        } else {
          alert("Please select a product from the list to adjust stock.");
        }
      }
    }
  });

  const tabs = ["General", "Other Details", "GST Details", "Stock Details", "Image"];

  return (
    <DesktopLayout
      fnKeys={[
        { key: "F1", label: "Help", onClick: () => setActiveModal("HELP") },
        { key: "F2", label: "New (F2)", onClick: () => { setMode("New"); setFormName(""); setFormRate(0); setFormMrp(0); setFormGst(18); setFormImage(null); setFormGroup("Grocery"); setFormSubGroup("General"); setFormBrand("Generic"); setFormUnit("PCS"); } },
        { key: "F3", label: "Edit (F3)", onClick: () => selectedCode && setMode("Edit") },
        { key: "F4", label: "Delete (F4)", tone: "danger", onClick: handleDelete },
        { key: "F5", label: "Save (F5)", tone: "primary", onClick: handleSave },
        { key: "F6", label: "Cancel", onClick: () => setMode("View") },
        { key: "F7", label: "Find (F7)", onClick: () => searchInputRef.current?.focus() },
        { key: "F8", label: "Barcode (F8)", onClick: () => context.setBarcodeModalOpen(true) }
      ]}
    >
      <div className="grid grid-cols-[1fr_460px] gap-3">
        <Panel title="Product List">
          <div className="p-2 border-b border-border bg-slate-50">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by Code, Barcode, or Name... (F7)"
              className="erp-input w-full"
            />
          </div>
          <table className="erp-grid">
            <thead>
              <tr>
                <th className="erp-grid-th w-12">S.No</th>
                <th className="erp-grid-th">Code</th>
                <th className="erp-grid-th">Barcode</th>
                <th className="erp-grid-th">Name</th>
                <th className="erp-grid-th">Group</th>
                <th className="erp-grid-th text-right">MRP</th>
                <th className="erp-grid-th text-right">Rate</th>
                <th className="erp-grid-th text-right">Stock</th>
              </tr>
            </thead>
            <tbody>
              {productList
                .filter(
                  (it) =>
                    it.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    it.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    it.barcode.includes(searchQuery)
                )
                .map((it, i) => (
                  <tr
                  key={it.code}
                  onClick={() => handleSelectProduct(it.code)}
                  className={`cursor-pointer transition-colors ${
                    selectedCode === it.code
                      ? "bg-primary/10 font-medium"
                      : i % 2
                      ? "bg-[color:var(--color-grid-row-alt)] hover:bg-accent/40"
                      : "hover:bg-accent/40"
                  }`}
                >
                  <td className="erp-grid-td text-center">{i + 1}</td>
                  <td className="erp-grid-td">{it.code}</td>
                  <td className="erp-grid-td">{it.barcode}</td>
                  <td className="erp-grid-td">{it.name}</td>
                  <td className="erp-grid-td">{it.group}</td>
                  <td className="erp-grid-td text-right">{fmt(it.mrp)}</td>
                  <td className="erp-grid-td text-right">{fmt(it.rate)}</td>
                  <td className={`erp-grid-td text-right ${it.stock < it.reorder ? "text-destructive font-semibold" : ""}`}>
                    {it.stock}.000
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={`Product Details — [Mode : ${mode}]`}>
          <div className="flex gap-1 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 text-[12.5px] ${
                  tab === t ? "border-b-2 border-primary font-semibold text-primary" : "text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="space-y-2 pt-3">
            {tab === "General" && (
              <>
                <Field label="Item Code">
                  <Input value={mode === "New" ? "AUTO" : selectedProduct?.code} disabled />
                </Field>
                <Field label="Barcode">
                  <Input value={mode === "New" ? "AUTO GENERATE" : selectedProduct?.barcode} disabled />
                </Field>
                <Field label="Item Name">
                  <Input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    disabled={mode === "View"}
                    placeholder="Product name"
                  />
                </Field>
                <Field label="Item Group">
                  <Select value={formGroup} onChange={(e) => setFormGroup(e.target.value)} disabled={mode === "View"}>
                    {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                  </Select>
                </Field>
                <Field label="Sub Group">
                  <Select value={formSubGroup} onChange={(e) => setFormSubGroup(e.target.value)} disabled={mode === "View"}>
                    {SUB_GROUPS.map(sg => <option key={sg} value={sg}>{sg}</option>)}
                  </Select>
                </Field>
                <Field label="Brand">
                  <Select value={formBrand} onChange={(e) => setFormBrand(e.target.value)} disabled={mode === "View"}>
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </Select>
                </Field>
              </>
            )}

            {tab === "Other Details" && (
              <>
                <Field label="MRP">
                  <Input
                    type="number"
                    value={formMrp}
                    onChange={(e) => setFormMrp(Number(e.target.value) || 0)}
                    disabled={mode === "View"}
                    className="text-right"
                  />
                </Field>
                <Field label="Rate">
                  <Input
                    type="number"
                    value={formRate}
                    onChange={(e) => setFormRate(Number(e.target.value) || 0)}
                    disabled={mode === "View"}
                    className="text-right"
                  />
                </Field>
                <Field label="Unit">
                  <Select value={formUnit} onChange={(e) => setFormUnit(e.target.value)} disabled={mode === "View"}>
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </Select>
                </Field>
                <Field label="Reorder Level">
                  <Input value={selectedProduct?.reorder} disabled className="text-right" />
                </Field>
                <label className="flex items-center gap-2 pt-1">
                  <input type="checkbox" defaultChecked disabled={mode === "View"} /> Active
                </label>
              </>
            )}

            {tab === "GST Details" && (
              <Field label="Tax %">
                <Input
                  type="number"
                  value={formGst}
                  onChange={(e) => setFormGst(Number(e.target.value) || 0)}
                  disabled={mode === "View"}
                  className="text-right"
                />
              </Field>
            )}

            {tab === "Stock Details" && (
              <div className="space-y-3 p-2 bg-slate-50 rounded-md border border-border">
                <Field label="Current Stock">
                  <Input value={selectedProduct?.stock !== undefined ? `${selectedProduct.stock}.000` : "0.000"} disabled className="text-right font-mono" />
                </Field>
                <div className="border-t border-dashed border-border my-2 pt-2">
                  <span className="text-xs font-bold text-primary block mb-2">Direct Stock Adjustment</span>
                  <div className="space-y-2">
                    <Field label="Adjustment Qty">
                      <Input
                        type="number"
                        value={adjustQty}
                        onChange={(e) => setAdjustQty(e.target.value)}
                        placeholder="Use + to add or - to deduct"
                        className="text-right font-mono"
                      />
                    </Field>
                    <Field label="Adjust Reason">
                      <Select value={adjustReason} onChange={(e) => setAdjustReason(e.target.value)}>
                        <option value="Physical Count Verify">Physical Count Verify</option>
                        <option value="Inward Correction">Inward Correction</option>
                        <option value="Damaged Goods">Damaged Goods</option>
                        <option value="Stock Audit">Stock Audit</option>
                      </Select>
                    </Field>
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={handleAdjustStock}
                        className="rounded-sm bg-primary text-primary-foreground px-4 py-1.5 text-xs font-semibold hover:bg-primary/95 transition-colors"
                      >
                        Apply Stock Correction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "Image" && (
              <div className="space-y-4 p-2">
                <div className="flex flex-col items-center justify-center gap-3">
                  {formImage ? (
                    <div className="relative group w-full max-w-[240px] aspect-square rounded-md border border-border overflow-hidden bg-slate-50 flex items-center justify-center">
                      <img src={formImage} alt="Product Preview" className="max-w-full max-h-full object-contain" />
                      {mode !== "View" && (
                        <button
                          type="button"
                          onClick={() => setFormImage(null)}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-colors"
                          title="Remove Image"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="w-full max-w-[240px] aspect-square rounded-md border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
                      <ImageIcon className="h-12 w-12 text-slate-400 mb-2" />
                      <span className="text-xs text-muted-foreground font-medium">No Image Uploaded</span>
                    </div>
                  )}

                  {mode !== "View" && (
                    <div className="w-full max-w-[240px]">
                      <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-primary rounded-md cursor-pointer bg-primary/5 hover:bg-primary/10 hover:border-primary/80 transition-all duration-150">
                        <div className="flex flex-col items-center justify-center pt-3 pb-3 px-2 text-center">
                          <svg className="w-6 h-6 text-primary mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          <p className="text-xs font-semibold text-primary">Upload Product Image</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG or WEBP</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormImage(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>

      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[750px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Product Master Manual &amp; FAQs [F1]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-bold text-primary border-b pb-1 font-sans">Hotkeys &amp; Commands Reference</h4>
                <table className="erp-grid w-full bg-white">
                  <thead>
                    <tr>
                      <th className="erp-grid-th">Key</th>
                      <th className="erp-grid-th">Action Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">Show this Help screen manual</td></tr>
                    <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Add a New product item to catalog</td></tr>
                    <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Edit selected product properties</td></tr>
                    <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td font-bold text-destructive">Delete selected product from master</td></tr>
                    <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Save new SKU details or modifications</td></tr>
                    <tr><td className="erp-grid-td font-bold font-mono">F6</td><td className="erp-grid-td">Cancel active input field additions</td></tr>
                    <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td font-bold text-primary">Focus search box to filter products</td></tr>
                    <tr><td className="erp-grid-td font-bold font-mono">F8</td><td className="erp-grid-td">Generate barcode stickers for item</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-primary border-b pb-1 font-sans">Frequently Asked Questions (FAQs)</h4>
                <div className="space-y-2 overflow-y-auto max-h-[250px] pr-1">
                  <div className="rounded border bg-white p-2.5">
                    <div className="font-bold text-slate-800">Q: How to add stocks?</div>
                    <div className="text-slate-600 mt-1">
                      Select a product, click the <strong className="text-primary font-semibold">Stock</strong> button on the toolbar to adjust, or navigate to the <strong className="font-semibold">Stock Details</strong> tab.
                    </div>
                  </div>
                  <div className="rounded border bg-white p-2.5">
                    <div className="font-bold text-slate-800">Q: How to logout?</div>
                    <div className="text-slate-600 mt-1">
                      Click the red <strong className="text-destructive font-semibold">Exit (Power)</strong> icon at the far right of the top toolbar.
                    </div>
                  </div>
                  <div className="rounded border bg-white p-2.5">
                    <div className="font-bold text-slate-800">Q: How to delete items?</div>
                    <div className="text-slate-600 mt-1">
                      Select a product in the grid and click the <strong className="text-destructive font-semibold">Delete</strong> button in the toolbar, or press the <strong className="font-mono">F4</strong> key.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "STOCK_ADJUST" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Quantity Inventory Adjustment</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="text-xs text-muted-foreground border-b pb-2 mb-2">
                Adjusting stock for: <strong className="text-foreground">{selectedProduct?.name} ({selectedProduct?.code})</strong>
                <br />
                Current Stock: <strong className="text-foreground">{selectedProduct?.stock !== undefined ? `${selectedProduct.stock}.000` : "0.000"} {selectedProduct?.unit || "PCS"}</strong>
              </div>
              <div className="space-y-2">
                <Field label="Adjustment Qty">
                  <Input
                    type="number"
                    value={adjustQty}
                    onChange={(e) => setAdjustQty(e.target.value)}
                    placeholder="Use positive to add, negative to deduct"
                    className="text-right font-mono"
                  />
                </Field>
                <Field label="Adjust Reason">
                  <Select value={adjustReason} onChange={(e) => setAdjustReason(e.target.value)}>
                    <option value="Physical Count Verify">Physical Count Verify</option>
                    <option value="Inward Correction">Inward Correction</option>
                    <option value="Damaged Goods">Damaged Goods</option>
                    <option value="Stock Audit">Stock Audit</option>
                  </Select>
                </Field>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Discard</button>
                <button onClick={handleAdjustStock} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">
                  Apply Correction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {typeof window !== "undefined" && createPortal(
        <div className="print-report hidden print:block bg-white text-black p-6">
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-2xl font-bold tracking-tight uppercase">MyShop Retail Pro</h1>
            <p className="text-sm font-semibold tracking-wide uppercase mt-1">Product Master Catalog Report</p>
            <div className="flex justify-between text-xs mt-4 px-2">
              <span><strong>Generated On:</strong> {new Date().toLocaleString("en-IN")}</span>
              <span><strong>Total SKUs:</strong> {productList.length} Items</span>
            </div>
          </div>
          <table className="w-full text-left border-collapse border border-black text-[11px]">
            <thead>
              <tr className="bg-gray-100 border-b border-black">
                <th className="border border-black p-1.5 font-bold w-10 text-center">S.No</th>
                <th className="border border-black p-1.5 font-bold w-16">Code</th>
                <th className="border border-black p-1.5 font-bold w-24">Barcode</th>
                <th className="border border-black p-1.5 font-bold">Item Name</th>
                <th className="border border-black p-1.5 font-bold w-20">Group</th>
                <th className="border border-black p-1.5 font-bold w-20">Sub Group</th>
                <th className="border border-black p-1.5 font-bold w-20">Brand</th>
                <th className="border border-black p-1.5 font-bold w-16 text-right">MRP (₹)</th>
                <th className="border border-black p-1.5 font-bold w-16 text-right">Rate (₹)</th>
                <th className="border border-black p-1.5 font-bold w-10 text-right">GST</th>
                <th className="border border-black p-1.5 font-bold w-12 text-center">Unit</th>
                <th className="border border-black p-1.5 font-bold w-16 text-right">Stock</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((p, idx) => (
                <tr key={p.code} className="border-b border-black">
                  <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                  <td className="border border-black p-1.5 font-mono">{p.code}</td>
                  <td className="border border-black p-1.5 font-mono">{p.barcode}</td>
                  <td className="border border-black p-1.5 font-semibold">{p.name}</td>
                  <td className="border border-black p-1.5">{p.group}</td>
                  <td className="border border-black p-1.5">{p.subGroup}</td>
                  <td className="border border-black p-1.5">{p.brand}</td>
                  <td className="border border-black p-1.5 text-right">{fmt(p.mrp)}</td>
                  <td className="border border-black p-1.5 text-right">{fmt(p.rate)}</td>
                  <td className="border border-black p-1.5 text-right">{p.gst}%</td>
                  <td className="border border-black p-1.5 text-center">{p.unit}</td>
                  <td className="border border-black p-1.5 text-right font-semibold">{p.stock}.000</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8 text-right text-[10px] text-gray-500 italic pr-2">
            * End of Report - Generated by MyShop Retail Pro *
          </div>
        </div>,
        document.body
      )}
    </DesktopLayout>
  );
}

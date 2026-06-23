import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { PRODUCTS, fmt } from "@/lib/sample-data";
import { useState, useRef, useEffect } from "react";
import { Image as ImageIcon, X, HelpCircle, FileText } from "lucide-react";
import { useERPCommands } from "@/lib/erp-context";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Product Master — MyShop Retail Pro" }] }),
  component: ProductMaster,
});

function ProductMaster() {
  const [productList, setProductList] = useState(PRODUCTS.map((p) => ({ ...p })));
  const [selectedCode, setSelectedCode] = useState<string | null>(PRODUCTS[0]?.code || null);
  const [mode, setMode] = useState<"View" | "New" | "Edit">("View");
  const [tab, setTab] = useState("General");
  const [activeModal, setActiveModal] = useState<"HELP" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Sync state on change selection
  const handleSelectProduct = (code: string) => {
    const prod = productList.find((p) => p.code === code);
    if (prod) {
      setSelectedCode(code);
      setFormName(prod.name);
      setFormRate(prod.rate);
      setFormMrp(prod.mrp);
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
        group: "Grocery",
        subGroup: "General",
        brand: "Generic",
        mrp: formMrp,
        rate: formRate,
        stock: 0,
        unit: "PCS",
        reorder: 5,
        hsn: "000000",
        gst: 18
      };
      setProductList([...productList, newProduct]);
      setSelectedCode(newCode);
      alert("Product saved successfully!");
    } else if (mode === "Edit" && selectedCode) {
      setProductList(
        productList.map((p) =>
          p.code === selectedCode ? { ...p, name: formName, rate: formRate, mrp: formMrp } : p
        )
      );
      alert("Product changes updated successfully!");
    }
    setMode("View");
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
      }
      setMode("View");
      alert("Product deleted!");
    }
  };

  // Register Products Page with commands Context
  const { context } = useERPCommands({
    pageName: "products",
    availableCommands: ["NEW", "EDIT", "DELETE", "SAVE", "PRINT"],
    selectedRecordId: selectedCode,
    isDirty: mode !== "View",
    onCommand: (cmd) => {
      if (cmd === "NEW") {
        setMode("New");
        setFormName("");
        setFormRate(0);
        setFormMrp(0);
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
      }
    }
  });

  const tabs = ["General", "Other Details", "GST Details", "Stock Details", "Image"];

  return (
    <DesktopLayout
      fnKeys={[
        { key: "F1", label: "Help", onClick: () => setActiveModal("HELP") },
        { key: "F2", label: "New (F2)", onClick: () => { setMode("New"); setFormName(""); setFormRate(0); setFormMrp(0); } },
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
              <Select defaultValue={selectedProduct?.group} disabled={mode === "View"}>
                <option>{selectedProduct?.group || "Grocery"}</option>
              </Select>
            </Field>
            <Field label="Sub Group">
              <Select disabled={mode === "View"}>
                <option>{selectedProduct?.subGroup || "General"}</option>
              </Select>
            </Field>
            <Field label="Brand">
              <Select disabled={mode === "View"}>
                <option>{selectedProduct?.brand || "Generic"}</option>
              </Select>
            </Field>
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
            <Field label="Tax %">
              <Input value={selectedProduct?.gst} disabled className="text-right" />
            </Field>
            <Field label="Unit">
              <Select disabled={mode === "View"}>
                <option>{selectedProduct?.unit || "PCS"}</option>
              </Select>
            </Field>
            <Field label="Reorder Level">
              <Input value={selectedProduct?.reorder} disabled className="text-right" />
            </Field>
            <label className="flex items-center gap-2 pt-1">
              <input type="checkbox" defaultChecked disabled={mode === "View"} /> Active
            </label>
            <div className="flex justify-center pt-3">
              <div className="grid h-24 w-24 place-items-center rounded-sm border border-dashed border-border bg-secondary text-muted-foreground">
                <ImageIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Product Master Manual [F1]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <h4 className="font-bold text-primary border-b pb-1">Hotkeys &amp; Commands Reference</h4>
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
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}

import { createFileRoute, useRouter, useRouterState } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { PRODUCTS as INITIAL_PRODUCTS, fmt } from "@/lib/sample-data";
import { Search, HelpCircle, Plus, Edit, RefreshCw, Barcode, Download, ArrowLeftRight, CheckSquare, Filter, ShieldAlert, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/inventory")({
  head: () => ({ meta: [{ title: "Inventory / Stock Master — MyShop Retail Pro" }] }),
  component: Inventory,
});

interface ProductItem {
  code: string;
  barcode: string;
  name: string;
  group: string;
  subGroup: string;
  brand: string;
  mrp: number;
  rate: number;
  stock: number;
  unit: string;
  reorder: number;
  hsn?: string;
  gst?: number;
}

function Inventory() {
  const router = useRouter();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // State Management
  const [productList, setProductList] = useState<ProductItem[]>(() => {
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
    return INITIAL_PRODUCTS;
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_products", JSON.stringify(productList));
    }
  }, [productList]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGroup, setFilterGroup] = useState("All Groups");
  const [filterSubGroup, setFilterSubGroup] = useState("All Sub Groups");
  const [filterBrand, setFilterBrand] = useState("All Brands");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  // Modals state
  const [activeModal, setActiveModal] = useState<"HELP" | "NEW" | "EDIT" | "TRANSFER" | "ADJUST" | "PHYSICAL" | "BATCH" | "REPORT" | "BARCODE" | null>(null);

  // Forms state
  const [itemCode, setItemCode] = useState("");
  const [itemBarcode, setItemBarcode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemGroup, setItemGroup] = useState("Grocery");
  const [itemSubGroup, setItemSubGroup] = useState("General");
  const [itemBrand, setItemBrand] = useState("Annapurna");
  const [itemMrp, setItemMrp] = useState("");
  const [itemRate, setItemRate] = useState("");
  const [itemStock, setItemStock] = useState("");
  const [itemUnit, setItemUnit] = useState("PCS");
  const [itemReorder, setItemReorder] = useState("");

  // Sub-modal temporary states
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustReason, setAdjustReason] = useState("Damage");
  const [transferQty, setTransferQty] = useState("");
  const [transferTarget, setTransferTarget] = useState("Warehouse B");
  const [physicalCount, setPhysicalCount] = useState("");
  const [batchNum, setBatchNum] = useState("");
  const [batchExpiry, setBatchExpiry] = useState("2027-12-31");

  // Keyboard and modal closing hooks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const groups = ["All Groups", "Grocery", "Beverages", "Dairy", "Personal Care", "Home Care", "Snacks", "Frozen", "Bakery", "Pulses & Grains", "Oils & Spices", "Stationery", "General"];
  const subGroups = ["All Sub Groups", "Atta/Flour", "Rice", "Cooking Oil", "Salt", "Noodles", "Biscuits", "Sugar", "Tea", "Milk", "Butter", "Dental", "Soap", "Detergent", "Health"];
  const brands = ["All Brands", "Annapurna", "Royal", "Sundrop", "Tata", "Maggi", "Parle", "Madhur", "Lipton", "Amul", "Colgate", "Lux", "Surf", "Dettol", "Rajdhani"];

  const handleSelectRow = (idx: number, item: ProductItem) => {
    setSelectedIdx(idx);
    setItemCode(item.code);
    setItemBarcode(item.barcode);
    setItemName(item.name);
    setItemGroup(item.group);
    setItemSubGroup(item.subGroup);
    setItemBrand(item.brand);
    setItemMrp(item.mrp.toString());
    setItemRate(item.rate.toString());
    setItemStock(item.stock.toString());
    setItemUnit(item.unit);
    setItemReorder(item.reorder.toString());
  };

  const handleSaveProduct = () => {
    if (!itemName || !itemMrp || !itemRate || !itemStock) {
      toast.error("Please fill in all mandatory product details.");
      return;
    }

    const mrpVal = parseFloat(itemMrp);
    const rateVal = parseFloat(itemRate);
    const stockVal = parseFloat(itemStock);
    const reorderVal = parseFloat(itemReorder) || 0;

    if (activeModal === "NEW") {
      const codeStr = `P${1000 + productList.length + 1}`;
      const newItem: ProductItem = {
        code: codeStr,
        barcode: itemBarcode || Date.now().toString(),
        name: itemName,
        group: itemGroup,
        subGroup: itemSubGroup,
        brand: itemBrand,
        mrp: mrpVal,
        rate: rateVal,
        stock: stockVal,
        unit: itemUnit,
        reorder: reorderVal
      };
      setProductList([...productList, newItem]);
      toast.success("New inventory item created successfully.");
    } else if (activeModal === "EDIT" && selectedIdx !== null) {
      const updated = [...productList];
      updated[selectedIdx] = {
        ...updated[selectedIdx],
        barcode: itemBarcode,
        name: itemName,
        group: itemGroup,
        subGroup: itemSubGroup,
        brand: itemBrand,
        mrp: mrpVal,
        rate: rateVal,
        stock: stockVal,
        unit: itemUnit,
        reorder: reorderVal
      };
      setProductList(updated);
      toast.success("Item details updated successfully.");
    }
    setActiveModal(null);
  };

  const handleAdjustStock = () => {
    if (selectedIdx === null) return;
    const diff = parseFloat(adjustQty);
    if (isNaN(diff)) {
      toast.error("Please enter a valid stock adjustment quantity.");
      return;
    }
    const updated = [...productList];
    const prev = updated[selectedIdx].stock;
    updated[selectedIdx].stock = prev + diff;
    setProductList(updated);
    toast.success(`Adjusted stock by ${diff > 0 ? "+" : ""}${diff} units. Narration: ${adjustReason}`);
    setActiveModal(null);
    setAdjustQty("");
  };

  const handleTransferStock = () => {
    if (selectedIdx === null) return;
    const qty = parseFloat(transferQty);
    if (isNaN(qty) || qty <= 0 || qty > productList[selectedIdx].stock) {
      toast.error("Invalid transfer quantity. Cannot exceed current stock level.");
      return;
    }
    const updated = [...productList];
    updated[selectedIdx].stock -= qty;
    setProductList(updated);
    toast.success(`Transferred ${qty} units of ${updated[selectedIdx].name} to ${transferTarget}.`);
    setActiveModal(null);
    setTransferQty("");
  };

  const handlePhysicalAudit = () => {
    if (selectedIdx === null) return;
    const count = parseFloat(physicalCount);
    if (isNaN(count) || count < 0) {
      toast.error("Please enter a valid physical stock count.");
      return;
    }
    const updated = [...productList];
    const systemCount = updated[selectedIdx].stock;
    updated[selectedIdx].stock = count;
    setProductList(updated);
    const variance = count - systemCount;
    if (variance === 0) {
      toast.success("Audit complete. Physical count matches system records perfectly!");
    } else {
      toast.warning(`Audit variance updated: ${variance > 0 ? "+" : ""}${variance} units discrepancy reconciled.`);
    }
    setActiveModal(null);
    setPhysicalCount("");
  };

  const handleRegisterBatch = () => {
    if (selectedIdx === null) return;
    if (!batchNum) {
      toast.error("Please provide a batch or lot number.");
      return;
    }
    toast.success(`Batch ${batchNum} (Expiry: ${batchExpiry}) registered for item.`);
    setActiveModal(null);
    setBatchNum("");
  };

  const handleExcelExport = () => {
    toast.info("Preparing Excel export for stock list...");
    const headers = ["Code", "Barcode", "Item Name", "Group", "Sub Group", "MRP (₹)", "Cost Rate (₹)", "Stock Count", "Unit", "Reorder Level"];
    const rows = filteredProducts.map(p => [
      p.code,
      p.barcode,
      p.name,
      p.group,
      p.subGroup,
      p.mrp.toString(),
      p.rate.toString(),
      p.stock.toString(),
      p.unit,
      p.reorder.toString()
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Inventory_Stock_Master_Export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Excel stock master exported successfully!");
  };

  // Calculations and dynamic filtering
  const filteredProducts = productList.filter((p) => {
    const matchesSearch = searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.code.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery);
    const matchesGroup = filterGroup === "All Groups" || p.group === filterGroup;
    const matchesSubGroup = filterSubGroup === "All Sub Groups" || p.subGroup === filterSubGroup;
    const matchesBrand = filterBrand === "All Brands" || p.brand === filterBrand;
    const matchesLowStock = !lowStockOnly || p.stock <= p.reorder;
    return matchesSearch && matchesGroup && matchesSubGroup && matchesBrand && matchesLowStock;
  });

  const totalItems = filteredProducts.length;
  const totalStockQty = filteredProducts.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = filteredProducts.filter(p => p.stock <= p.reorder && p.stock > 0).length;
  const outOfStockCount = filteredProducts.filter(p => p.stock <= 0).length;
  const valuationCost = filteredProducts.reduce((acc, p) => acc + p.stock * p.rate, 0);
  const valuationMrp = filteredProducts.reduce((acc, p) => acc + p.stock * p.mrp, 0);

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => { setActiveModal("HELP"); toast.info("Opening Inventory Manual..."); } },
      { key: "F2", label: "New Item", tone: "primary", onClick: () => { setItemBarcode(""); setItemName(""); setItemMrp(""); setItemRate(""); setItemStock(""); setItemReorder(""); setActiveModal("NEW"); toast.info("Creating a new item entry form..."); } },
      { key: "F3", label: "Edit Item", onClick: () => { if (selectedIdx !== null) { setActiveModal("EDIT"); } else { toast.warning("Please select a product row to edit."); } } },
      { key: "F4", label: "Transfer", onClick: () => { if (selectedIdx !== null) { setActiveModal("TRANSFER"); } else { toast.warning("Select a product row to initialize transfer."); } } },
      { key: "F5", label: "Adjust", onClick: () => { if (selectedIdx !== null) { setActiveModal("ADJUST"); } else { toast.warning("Select a product row to adjust quantity."); } } },
      { key: "F6", label: "Physical", onClick: () => { if (selectedIdx !== null) { setActiveModal("PHYSICAL"); } else { toast.warning("Select a product row to perform physical verification."); } } },
      { key: "F7", label: "Reorder", onClick: () => { setLowStockOnly(!lowStockOnly); toast.info(lowStockOnly ? "Displaying all products." : "Filtering by Low Stock Items."); } },
      { key: "F8", label: "Batch / Serial", onClick: () => { if (selectedIdx !== null) { setActiveModal("BATCH"); } else { toast.warning("Select a product row to view batches."); } } },
      { key: "F9", label: "Report", onClick: () => { setActiveModal("REPORT"); toast.info("Generating Inventory Reports..."); } },
      { key: "F10", label: "Barcode", onClick: () => { if (selectedIdx !== null) { setActiveModal("BARCODE"); } else { toast.warning("Select a product row to generate barcodes."); } } },
      { key: "F11", label: "Excel Export", onClick: handleExcelExport },
      { key: "F12", label: "Close", onClick: () => router.navigate({ to: "/" }) },
    ]}>
      
      {/* Top Filter Bar */}
      <div className="mb-2.5 flex items-center gap-2">
        <select value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)} className="erp-input w-40 bg-white">
          {groups.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={filterSubGroup} onChange={(e) => setFilterSubGroup(e.target.value)} className="erp-input w-40 bg-white">
          {subGroups.map(sg => <option key={sg} value={sg}>{sg}</option>)}
        </select>
        <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)} className="erp-input w-40 bg-white">
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <label className="flex items-center gap-1.5 text-[12.5px] cursor-pointer">
          <input type="checkbox" checked={lowStockOnly} onChange={(e) => setLowStockOnly(e.target.checked)}/> Low Stock Only
        </label>
        <div className="relative flex-1">
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="erp-input w-full pl-8" placeholder="Search Item (Code, Barcode, Name)"/>
          <Search className="absolute left-2 top-1.5 h-4 w-4 text-muted-foreground"/>
        </div>
      </div>

      <div className="grid grid-cols-[200px_1fr] gap-3">
        {/* Left Groups Panel */}
        <Panel title="Stock Groups">
          <ul className="space-y-0.5 text-[12.5px]">
            {groups.map((g) => (
              <li 
                key={g} 
                onClick={() => { setFilterGroup(g); toast.info(`Filtered by Group: ${g}`); }}
                className={`cursor-pointer rounded-sm px-2 py-1 transition-colors ${filterGroup === g ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-accent"}`}
              >
                + {g}
              </li>
            ))}
          </ul>
        </Panel>

        {/* Product Table List */}
        <div>
          <Panel title="Stock List">
            <div className="overflow-x-auto max-h-[440px]">
              <table className="erp-grid w-full">
                <thead>
                  <tr>
                    <th className="erp-grid-th w-10">S.No</th>
                    <th className="erp-grid-th w-20">Code</th>
                    <th className="erp-grid-th">Barcode</th>
                    <th className="erp-grid-th">Item Name</th>
                    <th className="erp-grid-th">Group</th>
                    <th className="erp-grid-th">Sub Group</th>
                    <th className="erp-grid-th text-right">MRP (₹)</th>
                    <th className="erp-grid-th text-right">Rate (₹)</th>
                    <th className="erp-grid-th text-right">Stock</th>
                    <th className="erp-grid-th">Unit</th>
                    <th className="erp-grid-th text-right">Reorder</th>
                    <th className="erp-grid-th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((it, i) => {
                    const low = it.stock <= it.reorder;
                    const isSelected = selectedIdx === productList.findIndex(p => p.code === it.code);
                    return (
                      <tr 
                        key={it.code} 
                        onClick={() => handleSelectRow(productList.findIndex(p => p.code === it.code), it)}
                        className={`cursor-pointer hover:bg-primary/10 transition-colors ${isSelected ? "bg-primary/15 font-semibold text-primary" : (i % 2 ? "bg-[color:var(--color-grid-row-alt)]" : "")}`}
                      >
                        <td className="erp-grid-td text-center">{i + 1}</td>
                        <td className="erp-grid-td font-mono font-bold">{it.code}</td>
                        <td className="erp-grid-td font-mono text-xs">{it.barcode}</td>
                        <td className="erp-grid-td">{it.name}</td>
                        <td className="erp-grid-td">{it.group}</td>
                        <td className="erp-grid-td">{it.subGroup}</td>
                        <td className="erp-grid-td text-right font-mono">{fmt(it.mrp)}</td>
                        <td className="erp-grid-td text-right font-mono">{fmt(it.rate)}</td>
                        <td className={`erp-grid-td text-right font-mono font-bold ${low ? "text-destructive" : ""}`}>{it.stock}.000</td>
                        <td className="erp-grid-td">{it.unit}</td>
                        <td className="erp-grid-td text-right font-mono">{it.reorder}.000</td>
                        <td className="erp-grid-td text-center">
                          <span className={`px-1.5 py-0.5 rounded-xs text-[9.5px] font-bold ${low ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                            {low ? "LOW STOCK" : "OK"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={12} className="erp-grid-td text-center text-muted-foreground py-6">
                        No product matches found for the active filter set.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>

          {/* Statistics Grid */}
          <div className="mt-2 grid grid-cols-6 gap-2">
            <Stat label="Total Items" value={totalItems.toString()} />
            <Stat label="Total Stock Qty" value={`${totalStockQty.toFixed(3)}`} />
            <Stat label="Low Stock Items" value={lowStockCount.toString()} tone={lowStockCount > 0 ? "text-[color:var(--color-warning)]" : ""} />
            <Stat label="Out of Stock" value={outOfStockCount.toString()} tone={outOfStockCount > 0 ? "text-destructive" : ""} />
            <Stat label="Stock Value (Cost)" value={`₹ ${fmt(valuationCost)}`} />
            <Stat label="Stock Value (MRP)" value={`₹ ${fmt(valuationMrp)}`} />
          </div>
        </div>
      </div>

      {/* HELP DIALOG MODAL [F1] */}
      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[480px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Stock Master Reference Guide [F1]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <table className="erp-grid w-full bg-white">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Key</th>
                    <th className="erp-grid-th">Inventory Action Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">View this help guide manual</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Add a new inventory catalog item</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Edit details of selected catalog row</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td">Transfer stock between outlets/warehouses</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Adjust item quantity manually (+/-)</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F6</td><td className="erp-grid-td">Perform physical inventory audit reconcile</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Toggle Low Stock Filter list view</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F8</td><td className="erp-grid-td">Manage batch/lot codes and expiry data</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F9</td><td className="erp-grid-td">View current inventory valuation reports</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F10</td><td className="erp-grid-td">Open printing barcode tag generator</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F11</td><td className="erp-grid-td">Export current grid database to CSV</td></tr>
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

      {/* NEW ITEM MODAL [F2] / EDIT ITEM MODAL [F3] */}
      {(activeModal === "NEW" || activeModal === "EDIT") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>{activeModal === "NEW" ? "Add Product Catalog Entry" : "Modify Product Details"}</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="space-y-2">
                <Field label="Item Code"><Input value={activeModal === "NEW" ? "AUTO GENERATE" : itemCode} disabled /></Field>
                <Field label="Barcode ID"><Input value={itemBarcode} onChange={(e) => setItemBarcode(e.target.value)} placeholder="89012..." /></Field>
                <Field label="Product Name"><Input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Whole Wheat Atta 5KG" /></Field>
                <Field label="Category Group">
                  <Select value={itemGroup} onChange={(e) => setItemGroup(e.target.value)}>
                    {groups.slice(1).map(g => <option key={g} value={g}>{g}</option>)}
                  </Select>
                </Field>
                <Field label="Sub Group">
                  <Select value={itemSubGroup} onChange={(e) => setItemSubGroup(e.target.value)}>
                    {subGroups.slice(1).map(sg => <option key={sg} value={sg}>{sg}</option>)}
                  </Select>
                </Field>
                <Field label="Brand / Vendor">
                  <Select value={itemBrand} onChange={(e) => setItemBrand(e.target.value)}>
                    {brands.slice(1).map(b => <option key={b} value={b}>{b}</option>)}
                  </Select>
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Cost Rate (₹)"><Input type="number" value={itemRate} onChange={(e) => setItemRate(e.target.value)} placeholder="0.00" className="text-right"/></Field>
                  <Field label="Retail MRP (₹)"><Input type="number" value={itemMrp} onChange={(e) => setItemMrp(e.target.value)} placeholder="0.00" className="text-right"/></Field>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Current Stock"><Input type="number" value={itemStock} onChange={(e) => setItemStock(e.target.value)} placeholder="0" className="text-right"/></Field>
                  <Field label="Measuring Unit">
                    <Select value={itemUnit} onChange={(e) => setItemUnit(e.target.value)}>
                      <option value="PCS">PCS</option>
                      <option value="KG">KG</option>
                      <option value="LTR">Litre</option>
                      <option value="BOX">Box Bundle</option>
                    </Select>
                  </Field>
                </div>
                <Field label="Reorder Alarm Level"><Input type="number" value={itemReorder} onChange={(e) => setItemReorder(e.target.value)} placeholder="10" className="text-right" /></Field>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel</button>
                <button onClick={handleSaveProduct} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">
                  {activeModal === "NEW" ? "Register Item" : "Update Details"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRANSFER MODAL [F4] */}
      {activeModal === "TRANSFER" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[400px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                <span>Inter-Branch Stock Transfer [F4]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 mb-2 space-y-1">
                <div className="text-muted-foreground text-xs">Selected Product:</div>
                <div className="font-semibold text-primary text-sm">{itemName} ({itemCode})</div>
                <div className="text-xs">Current Branch Stock: <span className="font-bold font-mono">{itemStock} {itemUnit}</span></div>
              </div>
              <Field label="Destination">
                <Select value={transferTarget} onChange={(e) => setTransferTarget(e.target.value)}>
                  <option value="Warehouse B">Warehouse B (Central Depot)</option>
                  <option value="Storefront POS-02">Front Display POS Outlet</option>
                  <option value="Return to Vendor">Damaged Return Return Vendor</option>
                </Select>
              </Field>
              <Field label="Quantity to Transfer">
                <Input type="number" value={transferQty} onChange={(e) => setTransferQty(e.target.value)} placeholder="0" className="text-right font-mono" />
              </Field>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Discard</button>
                <button onClick={handleTransferStock} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">Execute Transfer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADJUST STOCK MODAL [F5] */}
      {activeModal === "ADJUST" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[400px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Quantity Inventory Adjustment [F5]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 mb-2 space-y-1">
                <div className="text-muted-foreground text-xs">Selected Product:</div>
                <div className="font-semibold text-primary text-sm">{itemName}</div>
                <div className="text-xs">Current System Qty: <span className="font-bold font-mono">{itemStock} {itemUnit}</span></div>
              </div>
              <Field label="Adjustment Qty">
                <Input type="number" value={adjustQty} onChange={(e) => setAdjustQty(e.target.value)} placeholder="Use negative for subtraction" className="text-right font-mono" />
              </Field>
              <Field label="Reason Code">
                <Select value={adjustReason} onChange={(e) => setAdjustReason(e.target.value)}>
                  <option value="Damage">Damaged Goods / Scrap</option>
                  <option value="Pilferage">Theft / Shrinkage Audit</option>
                  <option value="Promo gift">Promotional Gift Distribution</option>
                  <option value="Received excess">Inward supplier variance overflow</option>
                </Select>
              </Field>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel</button>
                <button onClick={handleAdjustStock} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">Apply Correction</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHYSICAL AUDIT MODAL [F6] */}
      {activeModal === "PHYSICAL" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[400px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                <span>Physical Stock Audit Reconcile [F6]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 mb-2 space-y-1">
                <div className="text-muted-foreground text-xs">Selected Product:</div>
                <div className="font-semibold text-primary text-sm">{itemName}</div>
                <div className="text-xs">System Recorded Stock: <span className="font-bold font-mono">{itemStock} {itemUnit}</span></div>
              </div>
              <Field label="Physical Counted Qty">
                <Input type="number" value={physicalCount} onChange={(e) => setPhysicalCount(e.target.value)} placeholder="Re-counted shelf inventory" className="text-right font-mono" />
              </Field>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel</button>
                <button onClick={handlePhysicalAudit} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">Reconcile Registry</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BATCH SERIAL LOT DIALOG [F8] */}
      {activeModal === "BATCH" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[420px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Batch Code &amp; Expiry Registry [F8]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 mb-2 space-y-1">
                <div className="font-semibold text-primary text-sm">{itemName}</div>
                <div className="text-[11px] text-muted-foreground">Trace code: {itemCode}</div>
              </div>
              <Field label="Batch / Lot Number">
                <Input value={batchNum} onChange={(e) => setBatchNum(e.target.value)} placeholder="e.g. BATCH-2026-06" className="font-mono text-xs" />
              </Field>
              <Field label="Expiry Date">
                <Input type="date" value={batchExpiry} onChange={(e) => setBatchExpiry(e.target.value)} className="font-mono text-xs" />
              </Field>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Discard</button>
                <button onClick={handleRegisterBatch} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">Register Batch</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INVENTORY REPORT PREVIEW MODAL [F9] */}
      {activeModal === "REPORT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Inventory Valuation Summary [F9]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 space-y-2">
                <div className="font-bold border-b pb-1 text-primary">Warehouse Stock Summary (June 2026)</div>
                <div className="flex justify-between"><span>Unique catalog items listed:</span><span className="font-bold">{totalItems} Products</span></div>
                <div className="flex justify-between"><span>Aggregate Stock units:</span><span className="font-bold">{totalStockQty} Units</span></div>
                <div className="flex justify-between"><span>Low-level alarms:</span><span className="font-bold text-amber-600">{lowStockCount} Items</span></div>
                <div className="flex justify-between"><span>Completely Out of stock:</span><span className="font-bold text-red-600">{outOfStockCount} Items</span></div>
                <div className="flex justify-between border-t pt-1.5 font-bold text-primary"><span>Valuation at Cost Rate:</span><span>₹ {fmt(valuationCost)}</span></div>
                <div className="flex justify-between font-bold text-indigo-700"><span>Valuation at MRP Rate:</span><span>₹ {fmt(valuationMrp)}</span></div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button onClick={() => { toast.success("Valuation report sent to print spooler..."); window.print(); }} className="rounded-sm bg-primary text-primary-foreground px-4 py-2 font-semibold hover:bg-primary/95 transition-colors">Print Summary</button>
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Close [ESC]</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRINT BARCODE TAGS [F10] */}
      {activeModal === "BARCODE" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[400px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Barcode className="h-4 w-4" />
                <span>Print Barcode Tags [F10]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 mb-2 flex flex-col items-center justify-center text-center space-y-1">
                <div className="font-semibold text-primary">{itemName}</div>
                <div className="font-mono text-xs border border-dashed border-slate-300 p-2 mt-2 bg-slate-50">
                  |||||| | |||| ||| <br/>
                  {itemBarcode}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">Format: EAN-13 Standard Barcode tag</div>
              </div>
              <Field label="Print Copies count">
                <Input type="number" defaultValue="24" className="text-right font-mono" />
              </Field>
              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Cancel</button>
                <button 
                  onClick={() => {
                    toast.success("Barcode stickers sheets successfully dispatched to label printer!");
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

function Stat({ label, value, tone = "" }: any) {
  return (
    <div className="erp-panel px-3 py-2">
      <div className="text-[11.5px] text-primary">{label}</div>
      <div className={`text-[14px] font-bold ${tone}`}>{value}</div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useRouter, createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { EXPENSES as INITIAL_EXPENSES, fmt } from "@/lib/sample-data";
import { HelpCircle, FileText, X, Filter, BarChart2, Plus, Edit3, Trash2 } from "lucide-react";
import { toast } from "sonner";


export const Route = createFileRoute("/expenses")({
  head: () => ({ meta: [{ title: "Expenses — MyShop Retail Pro" }] }),
  component: Expenses,
});

interface ExpenseEntry {
  date: string;
  category: string;
  amount: number;
  notes: string;
  mode?: string;
}

function Expenses() {
  const router = useRouter();

  // State management
  const [expenseList, setExpenseList] = useState<ExpenseEntry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_expenses");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load expenses from localStorage", e);
        }
      }
    }
    return INITIAL_EXPENSES.map(e => ({ ...e, mode: "Cash" }));
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_expenses", JSON.stringify(expenseList));
    }
  }, [expenseList]);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<"HELP" | "FILTER" | "REPORT" | "CATEGORY" | null>(null);

  // Filter conditions
  const [filterCategory, setFilterCategory] = useState("All");

  // Form states
  const [formDate, setFormDate] = useState("17/06/2024");
  const [formCategory, setFormCategory] = useState("Rent");
  const [formAmount, setFormAmount] = useState("");
  const [formMode, setFormMode] = useState("Cash");
  const [formNotes, setFormNotes] = useState("");

  const [editMode, setEditMode] = useState(false);

  // Close modals on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSaveExpense = () => {
    const amt = parseFloat(formAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid expense amount.");
      return;
    }

    if (editMode && selectedIdx !== null) {
      // Update existing item
      const updated = [...expenseList];
      updated[selectedIdx] = {
        date: formDate,
        category: formCategory,
        amount: amt,
        notes: formNotes,
        mode: formMode
      };
      setExpenseList(updated);
      toast.success("Expense entry updated successfully!");
      alert("Expense entry updated successfully!");
      setEditMode(false);
      setSelectedIdx(null);
    } else {
      // Add new item
      const newEntry: ExpenseEntry = {
        date: formDate,
        category: formCategory,
        amount: amt,
        notes: formNotes,
        mode: formMode
      };
      setExpenseList([...expenseList, newEntry]);
      toast.success("New expense entry saved successfully!");
      alert("New expense entry added successfully!");
    }

    // Reset inputs
    setFormAmount("");
    setFormNotes("");
  };

  const handleDeleteExpense = () => {
    if (selectedIdx === null) {
      toast.warning("Please select a row in the table first (click on it).");
      return;
    }
    if (confirm("Are you sure you want to delete the selected expense entry?")) {
      const updated = expenseList.filter((_, idx) => idx !== selectedIdx);
      setExpenseList(updated);
      setSelectedIdx(null);
      setEditMode(false);
      setFormAmount("");
      setFormNotes("");
      toast.success("Expense entry deleted.");
    }
  };

  const handleSelectRow = (idx: number) => {
    setSelectedIdx(idx);
    const item = expenseList[idx];
    setFormDate(item.date);
    setFormCategory(item.category);
    setFormAmount(item.amount.toString());
    setFormMode(item.mode || "Cash");
    setFormNotes(item.notes);
    setEditMode(true);
  };

  const handleExportCSV = () => {
    toast.info("Generating Excel sheet...");
    const headers = ["S.No", "Date", "Category", "Payment Mode", "Notes", "Amount (INR)"];
    const rows = expenseList.map((e, i) => [
      (i + 1).toString(),
      e.date,
      e.category,
      e.mode || "Cash",
      e.notes,
      e.amount.toString()
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Expense_Entries_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Expense statement exported successfully!");
  };

  // Calculations
  const filteredExpenses = expenseList.filter(e => filterCategory === "All" || e.category === filterCategory);
  const total = filteredExpenses.reduce((a, e) => a + e.amount, 0);
  
  // Categories summary calculations
  const summaryMap = expenseList.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const byCat = Object.entries(summaryMap);

  // Distinct categories inside register
  const categoriesList = Array.from(new Set(expenseList.map(e => e.category)));

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => setActiveModal("HELP") },
      { key: "F2", label: "New", tone: "primary", onClick: () => { setEditMode(false); setSelectedIdx(null); setFormAmount(""); setFormNotes(""); } },
      { key: "F3", label: "Edit", onClick: () => { if (selectedIdx !== null) setEditMode(true); else toast.warning("Select a row in the table first."); } },
      { key: "F4", label: "Delete", tone: "danger", onClick: handleDeleteExpense },
      { key: "F5", label: "Save", onClick: handleSaveExpense },
      { key: "F6", label: "Print", onClick: () => window.print() },
      { key: "F7", label: "Export", onClick: handleExportCSV },
      { key: "F8", label: "Filter", onClick: () => setActiveModal("FILTER") },
      { key: "F9", label: "Report", onClick: () => setActiveModal("REPORT") },
      { key: "F10", label: "Category", onClick: () => setActiveModal("CATEGORY") },
      { key: "F11", label: "Summary", onClick: () => toast.info(`Total Expense logged for the month: ₹ ${fmt(total)}`) },
      { key: "F12", label: "Close", onClick: () => router.navigate({ to: "/" }) },
    ]}>
      <div className="grid grid-cols-[1fr_360px] gap-3">
        <Panel title="Expense Entries">
          <div className="mb-2 flex gap-2">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)} 
              className="erp-input w-48 bg-white"
            >
              <option value="All">All Categories</option>
              {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input className="erp-input w-32" defaultValue="01/06/2024"/>
            <span className="self-center text-[12.5px]">to</span>
            <input className="erp-input w-32" defaultValue="17/06/2024"/>
            <button className="rounded-sm bg-primary px-4 py-1 text-primary-foreground text-[12.5px] hover:opacity-90">Search</button>
            {filterCategory !== "All" && (
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[11.5px] font-semibold border border-amber-200 ml-4 flex items-center">
                Filter: {filterCategory}
              </span>
            )}
          </div>
          <table className="erp-grid">
            <thead><tr>
              <th className="erp-grid-th w-10">S.No</th><th className="erp-grid-th">Date</th>
              <th className="erp-grid-th">Category</th><th className="erp-grid-th">Notes</th>
              <th className="erp-grid-th text-right">Amount</th>
            </tr></thead>
            <tbody>
              {filteredExpenses.map((e, i) => (
                <tr 
                  key={i} 
                  onClick={() => handleSelectRow(i)}
                  className={`cursor-pointer hover:bg-primary/10 ${selectedIdx === i ? "bg-primary/15 font-semibold text-primary" : (i%2 ? "bg-[color:var(--color-grid-row-alt)]" : "")}`}
                >
                  <td className="erp-grid-td text-center">{i+1}</td><td className="erp-grid-td">{e.date}</td>
                  <td className="erp-grid-td">{e.category}</td><td className="erp-grid-td">{e.notes}</td>
                  <td className="erp-grid-td text-right">{fmt(e.amount)}</td>
                </tr>
              ))}
              <tr className="bg-secondary font-bold">
                <td className="erp-grid-td" colSpan={4}>Total</td>
                <td className="erp-grid-td text-right text-destructive">{fmt(total)}</td>
              </tr>
            </tbody>
          </table>
        </Panel>

        <div className="space-y-3">
          <Panel title={editMode ? "Edit Expense Details" : "Add Expense"}>
            <div className="space-y-2">
              <Field label="Date"><Input value={formDate} onChange={(e) => setFormDate(e.target.value)}/></Field>
              <Field label="Category">
                <Select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
                  <option value="Rent">Rent</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Staff Salary">Staff Salary</option>
                  <option value="Transport">Transport</option>
                  <option value="Internet">Internet</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </Select>
              </Field>
              <Field label="Amount (₹)">
                <Input 
                  className="text-right font-bold text-primary" 
                  value={formAmount} 
                  onChange={(e) => setFormAmount(e.target.value)}
                  placeholder="0.00"
                />
              </Field>
              <Field label="Payment Mode">
                <Select value={formMode} onChange={(e) => setFormMode(e.target.value)}>
                  <option value="Cash">Cash Account</option>
                  <option value="Bank">HDFC Bank</option>
                  <option value="UPI">UPI Portal</option>
                </Select>
              </Field>
              <Field label="Notes"><Input value={formNotes} onChange={(e) => setFormNotes(e.target.value)} placeholder="Memo narration"/></Field>
              
              <div className="flex gap-2 pt-2">
                {editMode && (
                  <button 
                    onClick={() => { setEditMode(false); setSelectedIdx(null); setFormAmount(""); setFormNotes(""); }}
                    className="flex-1 rounded-sm border border-border bg-white py-2 text-primary font-medium hover:bg-slate-50 text-[12.5px]"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  onClick={handleSaveExpense}
                  className="flex-[2] rounded-sm bg-primary py-2 text-primary-foreground font-semibold hover:opacity-90 text-[12.5px]"
                >
                  {editMode ? "Update Entry" : "Save Expense"}
                </button>
              </div>
            </div>
          </Panel>

          <Panel title="Monthly Summary">
            <div className="space-y-1 text-[12.5px]">
              {byCat.map(([k,v]) => (
                <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><b>{fmt(v)}</b></div>
              ))}
              <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>Total Expenses</span><b className="text-destructive">{fmt(total)}</b></div>
            </div>
          </Panel>
        </div>
      </div>

      {/* HELP MODAL */}
      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[480px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Expense Manager Manual [F1]</span>
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
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">View this manual guide</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Clear inputs &amp; start new entry</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Trigger edit mode on selected entry</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td text-destructive font-semibold">Delete selected expense row</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Save new or update existing expense</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F6 / F7</td><td className="erp-grid-td">Print Sheet / Export spreadsheet</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F8</td><td className="erp-grid-td">Filter table logs by category</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F9 / F10</td><td className="erp-grid-td">Show reports or categories management</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F12</td><td className="erp-grid-td">Exit and return back to Dashboard</td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}

      {/* FILTER MODAL */}
      {activeModal === "FILTER" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[350px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter Expenses Category [F8]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <label className="block">
                <span className="font-semibold block mb-1">Select Category</span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="erp-input w-full h-9 bg-white"
                >
                  <option value="All">All Categories</option>
                  {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => { setFilterCategory("All"); setActiveModal(null); }} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Reset</button>
                <button onClick={() => setActiveModal(null)} className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors">Apply Filter</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPENSE REPORT MODAL (F9) */}
      {activeModal === "REPORT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Expense Statement Report [F9]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border p-3 rounded-sm space-y-1.5 text-xs">
                <div className="font-bold border-b pb-1 text-primary mb-2">Monthly Expenditure Report (June 2024)</div>
                {byCat.map(([k, v]) => (
                  <div key={k} className="flex justify-between"><span>{k}:</span><span className="font-semibold">₹ {fmt(v)}</span></div>
                ))}
                <div className="flex justify-between border-t pt-1.5 font-bold text-destructive"><span>Aggregate Total:</span><span>₹ {fmt(total)}</span></div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button onClick={() => window.print()} className="rounded-sm bg-primary text-primary-foreground px-4 py-2 font-semibold hover:bg-primary/95 transition-colors">Print Sheet (F6)</button>
                <button onClick={() => setActiveModal(null)} className="rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors">Close [ESC]</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPENSE CATEGORIES SUMMARY MODAL (F10) */}
      {activeModal === "CATEGORY" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[400px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add / Manage Category [F10]</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border p-3 rounded-sm space-y-1 max-h-40 overflow-y-auto">
                <div className="font-bold text-[11.5px] border-b pb-1 text-primary mb-1">Registered Categories</div>
                {categoriesList.map(c => <div key={c} className="text-xs py-0.5">• {c}</div>)}
              </div>
              <div className="space-y-1">
                <div>Enter New Category Name:</div>
                <input type="text" className="erp-input w-full h-8" placeholder="e.g. Refreshments, Legal, Marketing"/>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                <button 
                  onClick={() => {
                    toast.success("Custom category registered successfully.");
                    setActiveModal(null);
                  }}
                  className="rounded-sm bg-primary text-primary-foreground px-5 py-2 font-semibold hover:bg-primary/95 transition-colors"
                >
                  Register Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}


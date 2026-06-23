import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { CUSTOMERS, fmt } from "@/lib/sample-data";
import { useState, useRef, useEffect } from "react";
import { X, HelpCircle, FileText } from "lucide-react";
import { useERPCommands } from "@/lib/erp-context";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "Customer Master — MyShop Retail Pro" }] }),
  component: Customers,
});

function Customers() {
  const [customerList, setCustomerList] = useState(CUSTOMERS.map((c) => ({ ...c })));
  const [selectedCode, setSelectedCode] = useState<string | null>(CUSTOMERS[0]?.code || null);
  const [mode, setMode] = useState<"View" | "New" | "Edit">("View");
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

  // Selection data state
  const selectedCustomer = customerList.find((c) => c.code === selectedCode) || customerList[0];
  const [formName, setFormName] = useState(selectedCustomer?.name || "");
  const [formMobile, setFormMobile] = useState(selectedCustomer?.mobile || "");
  const [formCity, setFormCity] = useState(selectedCustomer?.city || "");
  const [formOpening, setFormOpening] = useState(selectedCustomer?.opening || 0);

  const handleSelectCustomer = (code: string) => {
    const cust = customerList.find((c) => c.code === code);
    if (cust) {
      setSelectedCode(code);
      setFormName(cust.name);
      setFormMobile(cust.mobile);
      setFormCity(cust.city);
      setFormOpening(cust.opening);
      setMode("View");
    }
  };

  const handleSave = () => {
    if (mode === "New") {
      const newCode = `CUST${String(customerList.length + 1).padStart(3, "0")}`;
      const newCust = {
        code: newCode,
        name: formName,
        mobile: formMobile,
        city: formCity,
        opening: formOpening,
        limit: 10000,
        status: "Active"
      };
      setCustomerList([...customerList, newCust]);
      setSelectedCode(newCode);
      alert("New Customer saved successfully!");
    } else if (mode === "Edit" && selectedCode) {
      setCustomerList(
        customerList.map((c) =>
          c.code === selectedCode
            ? { ...c, name: formName, mobile: formMobile, city: formCity, opening: formOpening }
            : c
        )
      );
      alert("Customer details updated successfully!");
    }
    setMode("View");
  };

  const handleDelete = () => {
    if (!selectedCode) return;
    if (confirm(`Are you sure you want to delete customer ${selectedCode}?`)) {
      const updated = customerList.filter((c) => c.code !== selectedCode);
      setCustomerList(updated);
      setSelectedCode(updated[0]?.code || null);
      if (updated[0]) {
        setFormName(updated[0].name);
        setFormMobile(updated[0].mobile);
        setFormCity(updated[0].city);
        setFormOpening(updated[0].opening);
      }
      setMode("View");
      alert("Customer deleted successfully!");
    }
  };

  // Register with commands Context
  useERPCommands({
    pageName: "customers",
    availableCommands: ["NEW", "EDIT", "DELETE", "SAVE", "PRINT"],
    selectedRecordId: selectedCode,
    isDirty: mode !== "View",
    onCommand: (cmd) => {
      if (cmd === "NEW") {
        setMode("New");
        setFormName("");
        setFormMobile("");
        setFormCity("Indore");
        setFormOpening(0);
      } else if (cmd === "EDIT") {
        if (selectedCode) {
          setMode("Edit");
        }
      } else if (cmd === "DELETE") {
        handleDelete();
      } else if (cmd === "SAVE") {
        handleSave();
      } else if (cmd === "PRINT") {
        alert("Generating print preview for customer records...");
        window.print();
      }
    }
  });

  return (
    <DesktopLayout
      fnKeys={[
        { key: "F1", label: "Help", onClick: () => setActiveModal("HELP") },
        { key: "F2", label: "New (F2)", onClick: () => { setMode("New"); setFormName(""); setFormMobile(""); setFormOpening(0); } },
        { key: "F3", label: "Edit (F3)", onClick: () => selectedCode && setMode("Edit") },
        { key: "F4", label: "Delete (F4)", tone: "danger", onClick: handleDelete },
        { key: "F5", label: "Save (F5)", tone: "primary", onClick: handleSave },
        { key: "F6", label: "Cancel", onClick: () => setMode("View") },
        { key: "F7", label: "Print Ledger", onClick: () => window.print() },
        { key: "F8", label: "Find (F8)", onClick: () => searchInputRef.current?.focus() }
      ]}
    >
      <div className="grid grid-cols-2 gap-3">
        <Panel title="Search / Select Customer">
          <div className="mb-2 flex gap-2">
            <select className="erp-input w-36"><option>Customer Name</option></select>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="erp-input flex-1"
              placeholder="Search by customer name... (F8)"
            />
            <button
              onClick={() => searchInputRef.current?.focus()}
              className="rounded-sm bg-primary px-3 text-primary-foreground text-[12.5px]"
            >
              Search (F8)
            </button>
          </div>
          <table className="erp-grid">
            <thead>
              <tr>
                <th className="erp-grid-th w-10">S.No</th>
                <th className="erp-grid-th">Code</th>
                <th className="erp-grid-th">Name</th>
                <th className="erp-grid-th">Mobile</th>
                <th className="erp-grid-th">City</th>
                <th className="erp-grid-th text-right">Opening Bal</th>
                <th className="erp-grid-th text-right">Limit</th>
                <th className="erp-grid-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {customerList
                .filter(
                  (c) =>
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.mobile.includes(searchQuery) ||
                    c.city.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((c, i) => (
                <tr
                  key={c.code}
                  onClick={() => handleSelectCustomer(c.code)}
                  className={`cursor-pointer transition-colors ${
                    selectedCode === c.code
                      ? "bg-primary/10 font-medium"
                      : i % 2
                      ? "bg-[color:var(--color-grid-row-alt)] hover:bg-accent/40"
                      : "hover:bg-accent/40"
                  }`}
                >
                  <td className="erp-grid-td text-center">{i + 1}</td>
                  <td className="erp-grid-td">{c.code}</td>
                  <td className="erp-grid-td">{c.name}</td>
                  <td className="erp-grid-td">{c.mobile}</td>
                  <td className="erp-grid-td">{c.city}</td>
                  <td className="erp-grid-td text-right text-destructive">{fmt(c.opening)} Dr</td>
                  <td className="erp-grid-td text-right">{fmt(c.limit)}</td>
                  <td className="erp-grid-td text-[color:var(--color-success)] font-semibold">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 grid grid-cols-5 gap-2">
            <Stat label="Total Customers" value={customerList.length.toString()}/>
            <Stat label="Active" value={customerList.filter((c) => c.status === "Active").length.toString()} tone="text-[color:var(--color-success)]"/>
            <Stat label="Inactive" value={customerList.filter((c) => c.status !== "Active").length.toString()} tone="text-destructive"/>
            <Stat label="Receivable" value={`₹ ${fmt(customerList.reduce((acc, c) => acc + c.opening, 0))}`}/>
            <Stat label="Credit Limit" value={`₹ ${fmt(customerList.reduce((acc, c) => acc + c.limit, 0))}`}/>
          </div>
        </Panel>

        <Panel title={`Customer Details (${mode} Mode)`}>
          <div className="space-y-2">
            <Field label="Customer Code">
              <Input value={mode === "New" ? "AUTO" : selectedCustomer?.code} disabled />
            </Field>
            <Field label="Customer Name">
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                disabled={mode === "View"}
              />
            </Field>
            <Field label="Group">
              <Select disabled={mode === "View"}>
                <option>RETAIL CUSTOMERS</option>
              </Select>
            </Field>
            <Field label="Mobile No">
              <Input
                value={formMobile}
                onChange={(e) => setFormMobile(e.target.value)}
                disabled={mode === "View"}
              />
            </Field>
            <Field label="E-Mail">
              <Input defaultValue="rahulkumar@gmail.com" disabled={mode === "View"} />
            </Field>
            <Field label="City">
              <Select value={formCity} onChange={(e) => setFormCity(e.target.value)} disabled={mode === "View"}>
                <option value="Indore">Indore</option>
                <option value="Dewas">Dewas</option>
                <option value="Bhopal">Bhopal</option>
              </Select>
            </Field>
            <Field label="Address">
              <Input defaultValue="Madhya Pradesh — 452001" disabled={mode === "View"} />
            </Field>
            <Field label="GST Number">
              <Input defaultValue="23ABCDE1234F1Z5" disabled={mode === "View"} />
            </Field>
            <Field label="Opening Balance">
              <Input
                type="number"
                value={formOpening}
                onChange={(e) => setFormOpening(Number(e.target.value) || 0)}
                disabled={mode === "View"}
                className="text-right text-destructive"
              />
            </Field>
            <Field label="Credit Limit">
              <Input defaultValue={fmt(selectedCustomer?.limit || 10000)} disabled={mode === "View"} className="text-right" />
            </Field>
            <Field label="Credit Days">
              <Input defaultValue="30" disabled={mode === "View"} />
            </Field>
            <Field label="Remarks">
              <Input defaultValue="Regular customer. Good payment." disabled={mode === "View"} />
            </Field>
            <label className="flex items-center gap-2 pt-1">
              <input type="checkbox" defaultChecked disabled={mode === "View"} /> Active
            </label>
          </div>
        </Panel>
      </div>

      {activeModal === "HELP" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[500px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Customer Registry Manual [F1]</span>
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
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Create a New Customer account file</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Edit details for selected Customer</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td font-bold text-destructive">Delete selected Customer profile</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Save new Customer file or updates</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F6</td><td className="erp-grid-td">Cancel active form edits</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Print outstanding balances ledger report</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F8</td><td className="erp-grid-td font-bold text-primary">Focus query input box to filter list</td></tr>
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

function Stat({ label, value, tone="" }: any) {
  return <div className="erp-panel px-3 py-2"><div className="text-[11.5px] text-primary">{label}</div><div className={`text-[14px] font-bold ${tone}`}>{value}</div></div>;
}

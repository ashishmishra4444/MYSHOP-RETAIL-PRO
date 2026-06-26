import { createFileRoute, useRouter } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { 
  FileText, FileBarChart, FileSpreadsheet, Users, Truck, Wallet, 
  Receipt, TrendingUp, Boxes, Calculator, HelpCircle, Printer, Download, X 
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fmt } from "@/lib/sample-data";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports Centre — MyShop Retail Pro" }] }),
  component: Reports,
});

const REPORTS = [
  { icon: TrendingUp, label: "Sales Report", desc: "Daily / monthly sales analysis" },
  { icon: Truck, label: "Purchase Report", desc: "Vendor-wise purchase summary" },
  { icon: Receipt, label: "GST Report", desc: "GSTR-1, GSTR-3B, HSN summary" },
  { icon: Calculator, label: "Profit & Loss", desc: "Period P&L statement" },
  { icon: Boxes, label: "Stock Report", desc: "Stock movement & valuation" },
  { icon: Users, label: "Customer Ledger", desc: "Customer-wise account statement" },
  { icon: Truck, label: "Supplier Report", desc: "Supplier outstanding & payments" },
  { icon: Wallet, label: "Expense Report", desc: "Expense category analysis" },
  { icon: FileBarChart, label: "Day Book", desc: "Complete day transactions" },
  { icon: FileText, label: "Trial Balance", desc: "Ledger balances summary" },
  { icon: FileSpreadsheet, label: "Balance Sheet", desc: "Assets and liabilities" },
  { icon: FileBarChart, label: "Cash Flow", desc: "Operating cash flow statement" },
];

// Mock data datasets for the reports
const MOCK_DATASETS: Record<string, { headers: string[]; rows: string[][]; totals?: string[] }> = {
  "Sales Report": {
    headers: ["Invoice No", "Date", "Customer", "Taxable (₹)", "GST (₹)", "Net Amount (₹)", "Status"],
    rows: [
      ["INV/142", "17/06/2024", "Rahul Kumar", "1,761.90", "88.10", "1,850.00", "PAID"],
      ["INV/143", "17/06/2024", "Cash Sale", "685.71", "34.29", "720.00", "PAID"],
      ["INV/144", "17/06/2024", "Shyam Store", "2,228.57", "111.43", "2,340.00", "CREDIT"],
    ],
    totals: ["Total Sales", "", "", "4,676.18", "233.82", "4,910.00", ""]
  },
  "Purchase Report": {
    headers: ["PO No", "Date", "Supplier", "Taxable (₹)", "GST (₹)", "Total (₹)", "Status"],
    rows: [
      ["PO/091", "15/06/2024", "Devgiri Traders", "12,000.00", "2,160.00", "14,160.00", "RECEIVED"],
      ["PO/092", "16/06/2024", "Global Foods", "8,500.00", "425.00", "8,925.00", "PENDING"],
    ],
    totals: ["Total Purchases", "", "", "20,500.00", "2,585.00", "23,085.00", ""]
  },
  "GST Report": {
    headers: ["Voucher / Period", "Category", "HSN/SAC", "Taxable Value (₹)", "GST Rate", "CGST (₹)", "SGST (₹)", "Total Tax (₹)"],
    rows: [
      ["INV/142", "Outward (Sales)", "110100", "1,761.90", "5%", "44.05", "44.05", "88.10"],
      ["PO/091", "Inward (Purchase)", "380894", "12,000.00", "18%", "1,080.00", "1,080.00", "2,160.00"],
    ],
    totals: ["Aggregate Taxes", "", "", "13,761.90", "", "1,124.05", "1,124.05", "2,248.10"]
  },
  "Profit & Loss": {
    headers: ["Particulars", "Debit Amount (₹)", "Credit Amount (₹)"],
    rows: [
      ["Sales Revenue", "", "1,25,430.00"],
      ["Less: Cost of Goods Sold", "98,350.00", ""],
      ["Gross Profit", "", "27,080.00"],
      ["Operating Expenses (Rent, Bills, Salaries)", "9,650.00", ""],
      ["Net Profit", "", "17,430.00"],
    ]
  },
  "Stock Report": {
    headers: ["Item Code", "Item Name", "Current Stock", "Unit", "Cost Rate (₹)", "MRP (₹)", "Total Value (₹)"],
    rows: [
      ["P1001", "Whole Wheat Atta 5KG", "125", "PCS", "245.00", "260.00", "30,625.00"],
      ["P1002", "Basmati Rice 1KG", "85", "PCS", "115.00", "120.00", "9,775.00"],
      ["P1003", "Sunflower Oil 1L", "7", "PCS", "155.00", "165.00", "1,085.00"],
    ],
    totals: ["Total Inventory Valuation", "", "217", "", "", "", "41,485.00"]
  },
  "Customer Ledger": {
    headers: ["Customer Name", "Customer Code", "Mobile", "City", "Credit Limit (₹)", "Outstanding Balance (₹)"],
    rows: [
      ["Rahul Kumar", "CUST001", "9876543210", "Indore", "25,000.00", "12,750.00"],
      ["Shyam Store", "CUST002", "9827001234", "Indore", "20,000.00", "8,650.00"],
      ["Kirana Mart", "CUST003", "9755544332", "Indore", "15,000.00", "6,250.00"],
    ],
    totals: ["Aggregate Outstanding", "", "", "", "", "27,650.00"]
  },
  "Supplier Report": {
    headers: ["Supplier Name", "Supplier Code", "City", "Credit Limit (₹)", "Outstanding Balance (₹)"],
    rows: [
      ["Devgiri Traders", "SUPP001", "Indore", "1,00,000.00", "18,860.00"],
      ["Shree Distributors", "SUPP002", "Bhopal", "75,000.00", "12,450.00"],
      ["Global Foods", "SUPP003", "Indore", "50,000.00", "9,750.00"],
    ],
    totals: ["Aggregate Payables", "", "", "", "41,060.00"]
  },
  "Expense Report": {
    headers: ["Category Name", "Transaction Count", "Total Logged (₹)", "Percentage Share (%)"],
    rows: [
      ["Rent", "1", "25,000.00", "37.43%"],
      ["Electricity", "1", "4,800.00", "7.19%"],
      ["Staff Salary", "1", "32,000.00", "47.90%"],
      ["Others", "3", "4,999.00", "7.48%"],
    ],
    totals: ["Aggregate Expenses", "6", "66,799.00", "100.00%"]
  },
  "Day Book": {
    headers: ["Time", "Voucher No", "Type", "Particulars", "Inflow / Dr (₹)", "Outflow / Cr (₹)"],
    rows: [
      ["09:00", "OP-01", "Opening", "Opening Balance", "5,000.00", "0.00"],
      ["10:24", "INV/142", "Sale", "Cash Sale - INV/142", "1,850.00", "0.00"],
      ["12:15", "VCH-02", "Expense", "Tea / Snacks Payment", "0.00", "240.00"],
      ["15:22", "VCH-03", "Payment", "Paid to Devgiri Traders", "0.00", "10,000.00"],
    ],
    totals: ["Aggregate Daily Flow", "", "", "", "6,850.00", "10,240.00"]
  },
  "Trial Balance": {
    headers: ["Account Head", "Account Group", "Debit Balance (₹)", "Credit Balance (₹)"],
    rows: [
      ["Cash-in-hand", "Current Assets", "24,850.00", ""],
      ["HDFC Bank Account", "Bank Accounts", "1,45,600.00", ""],
      ["Sales Account", "Direct Revenues", "", "1,25,430.00"],
      ["Purchase Account", "Direct Cost", "98,350.00", ""],
      ["Sundry Debtors", "Current Assets", "27,650.00", ""],
      ["Sundry Creditors", "Current Liabilities", "", "41,060.00"],
    ],
    totals: ["Total Balances", "", "2,96,450.00", "2,96,450.00"]
  },
  "Balance Sheet": {
    headers: ["Liabilities & Capital", "Amount (₹)", "Assets & Resources", "Amount (₹)"],
    rows: [
      ["Owner's Capital", "1,50,000.00", "Fixed Assets (Furniture/Computers)", "65,000.00"],
      ["Retained Earnings / P&L", "17,430.00", "Stock Value (Closing Inventory)", "41,485.00"],
      ["Sundry Creditors (Payables)", "41,060.00", "Sundry Debtors (Receivables)", "27,650.00"],
      ["Outstanding Bills", "2,800.00", "Cash & Bank Balance", "77,205.00"],
    ],
    totals: ["Total Equity & Liabilities", "2,11,290.00", "Total Assets", "2,11,290.00"]
  },
  "Cash Flow": {
    headers: ["Cash Flow Categories & Particulars", "Inflow (₹)", "Outflow (₹)", "Net Change (₹)"],
    rows: [
      ["Cash Inflow from Invoices & Receipts", "1,30,000.00", "", ""],
      ["Cash Outflow for Purchases & Payments", "", "92,650.00", ""],
      ["Cash Outflow for Business Expenses", "", "9,650.00", ""],
    ],
    totals: ["Aggregate Cash Flow Summary", "1,30,000.00", "1,02,300.00", "+27,700.00"]
  }
};

function Reports() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedReport(null);
        setShowHelp(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenReport = (name: string) => {
    setSelectedReport(name);
    toast.info(`Opening ${name}...`);
  };

  const handlePrint = () => {
    if (!selectedReport) {
      toast.warning("Please open a report first to print it.");
      return;
    }
    toast.success(`Sending ${selectedReport} to print spooler...`);
    window.print();
  };

  const handleExport = () => {
    if (!selectedReport) {
      toast.warning("Please open a report first to export it.");
      return;
    }
    
    toast.info(`Preparing CSV export for ${selectedReport}...`);
    const dataset = MOCK_DATASETS[selectedReport];
    if (!dataset) {
      toast.error("Dataset not found for this report.");
      return;
    }

    const headers = dataset.headers.join(",");
    const rows = dataset.rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(","));
    let content = [headers, ...rows].join("\n");
    
    if (dataset.totals) {
      content += "\n" + dataset.totals.map(val => `"${val.replace(/"/g, '""')}"`).join(",");
    }

    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedReport.replace(/\s+/g, "_")}_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`${selectedReport} statement exported successfully!`);
  };

  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help", onClick: () => setShowHelp(true) },
      { key: "F2", label: "Sales", onClick: () => handleOpenReport("Sales Report") },
      { key: "F3", label: "Purchase", onClick: () => handleOpenReport("Purchase Report") },
      { key: "F4", label: "Stock", onClick: () => handleOpenReport("Stock Report") },
      { key: "F5", label: "GST", onClick: () => handleOpenReport("GST Report") },
      { key: "F6", label: "P&L", onClick: () => handleOpenReport("Profit & Loss") },
      { key: "F7", label: "Customer", onClick: () => handleOpenReport("Customer Ledger") },
      { key: "F8", label: "Supplier", onClick: () => handleOpenReport("Supplier Report") },
      { key: "F9", label: "Expense", onClick: () => handleOpenReport("Expense Report") },
      { key: "F10", label: "Print", onClick: handlePrint },
      { key: "F11", label: "Export", onClick: handleExport },
      { key: "F12", label: "Close", onClick: () => router.navigate({ to: "/" }) },
    ]}>
      <Panel title="Reports Centre">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {REPORTS.map((r) => (
            <button 
              key={r.label} 
              onClick={() => handleOpenReport(r.label)}
              className="erp-panel flex items-start gap-3 p-3 text-left hover:bg-primary/5 transition-colors cursor-pointer"
            >
              <div className="grid h-10 w-10 place-items-center rounded-sm bg-primary text-primary-foreground">
                <r.icon className="h-5 w-5"/>
              </div>
              <div>
                <div className="font-semibold text-primary">{r.label}</div>
                <div className="text-[12px] text-muted-foreground">{r.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </Panel>

      {/* HELP DIALOG MANUAL MODAL */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[480px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Reports Centre Manual [F1]</span>
              </div>
              <button onClick={() => setShowHelp(false)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <table className="erp-grid w-full bg-white">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Key</th>
                    <th className="erp-grid-th">Action / Report Activated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">View this help manual</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Open Sales Report preview</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Open Purchase Report preview</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td">Open Stock Report preview</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td">Open GST Report preview</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F6</td><td className="erp-grid-td">Open Profit &amp; Loss statement</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Open Customer Ledger list</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F8</td><td className="erp-grid-td">Open Supplier Outstanding report</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F9</td><td className="erp-grid-td">Open Expense Category Summary</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F10</td><td className="erp-grid-td">Print currently selected preview report</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F11</td><td className="erp-grid-td">Export current report to spreadsheet (.csv)</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F12</td><td className="erp-grid-td">Close and exit back to Dashboard</td></tr>
                </tbody>
              </table>
              <div className="text-xs text-muted-foreground italic text-center mt-2">
                Tip: You can also open any report by clicking directly on its card.
              </div>
            </div>
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setShowHelp(false)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT PREVIEW MODAL */}
      {selectedReport && MOCK_DATASETS[selectedReport] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[720px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{selectedReport} Preview</span>
              </div>
              <button onClick={() => setSelectedReport(null)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <div className="bg-white border rounded-sm p-3 max-h-[360px] overflow-y-auto">
                <div className="font-bold border-b pb-1.5 text-primary mb-3 flex justify-between">
                  <span>Statement Period: June 2024</span>
                  <span className="text-[11.5px] font-normal text-muted-foreground">Generated Live ERP Datastore</span>
                </div>
                <table className="erp-grid w-full">
                  <thead>
                    <tr>
                      {MOCK_DATASETS[selectedReport].headers.map((h, i) => (
                        <th key={i} className={`erp-grid-th ${h.includes("Amount") || h.includes("₹") || h.includes("Rate") || h.includes("Stock") || h.includes("Value") ? "text-right" : ""}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_DATASETS[selectedReport].rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className={rowIdx % 2 ? "bg-[color:var(--color-grid-row-alt)]" : ""}>
                        {row.map((cell, cellIdx) => {
                          const isNumeric = MOCK_DATASETS[selectedReport].headers[cellIdx].includes("Amount") || 
                                           MOCK_DATASETS[selectedReport].headers[cellIdx].includes("₹") || 
                                           MOCK_DATASETS[selectedReport].headers[cellIdx].includes("Rate") || 
                                           MOCK_DATASETS[selectedReport].headers[cellIdx].includes("Stock") || 
                                           MOCK_DATASETS[selectedReport].headers[cellIdx].includes("Value");
                          return (
                            <td key={cellIdx} className={`erp-grid-td ${isNumeric ? "text-right font-mono" : ""}`}>
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {MOCK_DATASETS[selectedReport].totals && (
                      <tr className="bg-secondary font-bold">
                        {MOCK_DATASETS[selectedReport].totals.map((totalVal, i) => {
                          const isNumeric = MOCK_DATASETS[selectedReport].headers[i].includes("Amount") || 
                                           MOCK_DATASETS[selectedReport].headers[i].includes("₹") || 
                                           MOCK_DATASETS[selectedReport].headers[i].includes("Value");
                          return (
                            <td key={i} className={`erp-grid-td ${isNumeric ? "text-right font-mono" : ""}`}>
                              {totalVal}
                            </td>
                          );
                        })}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Action Tools */}
              <div className="flex justify-between items-center pt-2 border-t mt-3">
                <div className="text-xs text-muted-foreground">
                  Use <span className="font-bold font-mono bg-slate-200 px-1 py-0.5 rounded">F10</span> to print, <span className="font-bold font-mono bg-slate-200 px-1 py-0.5 rounded">F11</span> to export
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 rounded-sm bg-primary text-primary-foreground px-4 py-2 font-semibold hover:bg-primary/95 transition-colors text-[12.5px]"
                  >
                    <Printer className="h-4 w-4" />
                    Print (F10)
                  </button>
                  <button 
                    onClick={handleExport}
                    className="flex items-center gap-1.5 rounded-sm bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-700 transition-colors text-[12.5px]"
                  >
                    <Download className="h-4 w-4" />
                    Export (F11)
                  </button>
                  <button 
                    onClick={() => setSelectedReport(null)} 
                    className="flex items-center gap-1.5 rounded-sm border border-border bg-white px-4 py-2 hover:bg-slate-100 transition-colors text-[12.5px]"
                  >
                    <X className="h-4 w-4" />
                    Close (ESC)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}

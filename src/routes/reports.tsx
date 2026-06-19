import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel } from "@/components/desktop/DesktopLayout";
import { FileText, FileBarChart, FileSpreadsheet, Users, Truck, Wallet, Receipt, TrendingUp, Boxes, Calculator } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — MyShop Retail Pro" }] }),
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

function Reports() {
  return (
    <DesktopLayout fnKeys={[
      { key: "F1", label: "Help" }, { key: "F2", label: "Sales" }, { key: "F3", label: "Purchase" },
      { key: "F4", label: "Stock" }, { key: "F5", label: "GST" }, { key: "F6", label: "P&L" },
      { key: "F7", label: "Customer" }, { key: "F8", label: "Supplier" }, { key: "F9", label: "Expense" },
      { key: "F10", label: "Print" }, { key: "F11", label: "Export" }, { key: "F12", label: "Close" },
    ]}>
      <Panel title="Reports Centre">
        <div className="grid grid-cols-4 gap-3">
          {REPORTS.map((r) => (
            <button key={r.label} className="erp-panel flex items-start gap-3 p-3 text-left hover:bg-accent">
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
    </DesktopLayout>
  );
}

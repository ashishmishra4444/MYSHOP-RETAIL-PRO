import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  FilePlus, Pencil, Trash2, Save, Printer, Barcode, Package, PauseCircle,
  RotateCcw, Wallet, Boxes, LayoutDashboard, Users, Calculator as CalcIcon, Power,
  Minus, Square, X, ChevronDown
} from "lucide-react";
import { useToolbar } from "@/lib/erp-context";
import Calculator from "./Calculator";
import BarcodeGenerator from "./BarcodeGenerator";

type MenuItem = { label: string; items?: { label: string; to?: string }[] };

const MENU: MenuItem[] = [
  { label: "Master", items: [
    { label: "Product Master", to: "/products" },
    { label: "Customer Master", to: "/customers" },
    { label: "Supplier Master", to: "/suppliers" },
  ]},
  { label: "Sales", items: [
    { label: "POS Billing", to: "/pos" },
    { label: "Sales Invoice", to: "/sales-invoice" },
  ]},
  { label: "Purchase", items: [{ label: "Purchase Entry", to: "/purchase" }] },
  { label: "Inventory", items: [{ label: "Stock Items", to: "/inventory" }] },
  { label: "Marketing", items: [
    { label: "Campaign Manager", to: "/campaigns" },
    { label: "Broadcast Logs", to: "/notifications" },
    { label: "Festival Calendar", to: "/festival-calendar" },
  ]},
  { label: "Accounts", items: [
    { label: "Udhar Khata (Customer Ledger)", to: "/udhar" },
    { label: "Supplier Ledger", to: "/suppliers" },
    { label: "Daily Cash Book", to: "/cashbook" },
    { label: "Expenses", to: "/expenses" },
  ]},
  { label: "Reports", items: [{ label: "All Reports", to: "/reports" }] },
  { label: "Tools", items: [
    { label: "Calculator", to: "#" },
    { label: "Data Backup", to: "#" }
  ]},
  { label: "Utilities", items: [
    { label: "Settings", to: "#" },
    { label: "User Management", to: "#" }
  ]},
  { label: "Help", items: [
    { label: "Documentation", to: "#" },
    { label: "About MyShop", to: "#" }
  ]},
];

const TOOLS = [
  { icon: FilePlus, label: "New", cmd: "NEW" },
  { icon: Pencil, label: "Edit", cmd: "EDIT" },
  { icon: Trash2, label: "Delete", danger: true, cmd: "DELETE" },
  { icon: Save, label: "Save", cmd: "SAVE" },
  { icon: Printer, label: "Print", cmd: "PRINT" },
  { icon: Barcode, label: "Barcode", cmd: "BARCODE" },
  { icon: Package, label: "Item", cmd: "ITEM" },
  { icon: PauseCircle, label: "Hold", cmd: "HOLD" },
  { icon: RotateCcw, label: "Recall", cmd: "RECALL" },
  { icon: Wallet, label: "Expense", cmd: "EXPENSE" },
  { icon: Boxes, label: "Stock", cmd: "STOCK" },
  { icon: LayoutDashboard, label: "Dashboard", cmd: "DASHBOARD" },
  { icon: Users, label: "User", cmd: "USER" },
  { icon: CalcIcon, label: "Calculator", cmd: "CALCULATOR" },
  { icon: Power, label: "Exit", danger: true, cmd: "EXIT" },
];

const TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/pos": "Billing Screen",
  "/products": "Product Master",
  "/purchase": "Purchase Entry",
  "/inventory": "Inventory / Stock",
  "/customers": "Customer Master",
  "/udhar": "Udhar Khata - Customer Ledger",
  "/suppliers": "Supplier Ledger",
  "/expenses": "Expense Management",
  "/cashbook": "Daily Cash Book",
  "/reports": "Reports",
  "/sales-invoice": "Sales Invoice",
  "/campaigns": "Campaign Manager",
  "/notifications": "Broadcast Logs",
  "/festival-calendar": "Festival Calendar",
};

export function DesktopLayout({
  children,
  fnKeys,
}: {
  children: ReactNode;
  fnKeys?: { key: string; label: string; onClick?: () => void; tone?: "primary" | "danger" }[];
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const sub = TITLES[pathname] ?? "";
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-IN", { hour12: false }));
      setDateStr(now.toLocaleDateString("en-GB"));
    };
    
    updateTime(); // set immediately on client mount
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const {
    isCommandAvailable,
    isCalculatorOpen,
    setCalculatorOpen,
    isBarcodeModalOpen,
    setBarcodeModalOpen,
    dispatchCommand
  } = useToolbar();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.startsWith("F") && e.key.length > 1) {
        const num = parseInt(e.key.substring(1));
        if (num >= 1 && num <= 12) {
          e.preventDefault();
          const targetKey = `F${num}`;
          const k = fnKeys?.find(item => item.key === targetKey);
          if (k && k.onClick) {
            k.onClick();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fnKeys]);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground select-none">
      {/* Title bar */}
      <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground">
        <div className="flex items-center gap-2 text-[12.5px] font-medium">
          <div className="grid h-5 w-5 place-items-center rounded-sm bg-white/15 text-[10px] font-bold">MS</div>
          <span>MyShop Retail Pro</span>
          <span className="opacity-70">— Main Division{sub && ` — [${sub}]`}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="grid h-6 w-9 place-items-center hover:bg-white/15"><Minus className="h-3.5 w-3.5"/></button>
          <button className="grid h-6 w-9 place-items-center hover:bg-white/15"><Square className="h-3 w-3"/></button>
          <button onClick={() => dispatchCommand("EXIT")} className="grid h-6 w-9 place-items-center hover:bg-destructive"><X className="h-3.5 w-3.5"/></button>
        </div>
      </div>

      {/* Menu bar */}
      <div className="flex h-8 items-center gap-0.5 border-b border-border bg-menubar px-2 text-[12.5px]">
        {MENU.map((m) => (
          <div key={m.label} className="group relative">
            <button className="flex items-center gap-1 rounded-sm px-2.5 py-1 hover:bg-accent hover:text-accent-foreground">
              {m.label}
              {m.items && <ChevronDown className="h-3 w-3 opacity-60"/>}
            </button>
            {m.items && (
              <div className="invisible absolute left-0 top-full z-40 min-w-[220px] border border-border bg-popover py-1 shadow-lg group-hover:visible">
                {m.items.map((it) => (
                  it.to ? (
                    <Link key={it.label} to={it.to} className="block px-3 py-1.5 hover:bg-accent hover:text-accent-foreground">
                      {it.label}
                    </Link>
                  ) : (
                    <div key={it.label} className="block px-3 py-1.5 text-muted-foreground">{it.label}</div>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-border bg-toolbar px-2 py-1.5">
        {TOOLS.map((t, i) => {
          const enabled = isCommandAvailable(t.cmd);
          return (
            <button
              key={i}
              type="button"
              disabled={!enabled}
              onClick={() => dispatchCommand(t.cmd)}
              className={`flex h-14 w-[64px] flex-col items-center justify-center gap-1 rounded-sm border border-transparent text-[11px] select-none ${
                enabled
                  ? "hover:border-border hover:bg-accent cursor-pointer opacity-100"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <t.icon className={`h-5 w-5 ${t.danger ? "text-destructive" : "text-primary"}`}/>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto bg-background p-2.5">{children}</div>

      {/* Floating global structures */}
      {isCalculatorOpen && <Calculator onClose={() => setCalculatorOpen(false)} />}
      {isBarcodeModalOpen && <BarcodeGenerator onClose={() => setBarcodeModalOpen(false)} />}


      {/* F-key bar */}
      {fnKeys && fnKeys.length > 0 && (
        <div className="grid grid-cols-12 gap-1 border-t border-border bg-toolbar p-1.5">
          {fnKeys.map((k, i) => (
            <button
              key={i}
              onClick={k.onClick}
              className={`flex h-12 flex-col items-center justify-center rounded-sm border text-[11.5px] font-medium ${
                k.tone === "primary"
                  ? "border-primary bg-primary text-primary-foreground"
                  : k.tone === "danger"
                  ? "border-destructive/40 bg-white text-destructive hover:bg-destructive/10"
                  : "border-border bg-white hover:bg-accent"
              }`}
            >
              <span className="text-[11px] opacity-70">{k.key}</span>
              <span>{k.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Status bar */}
      <div className="flex h-7 items-center justify-between border-t border-border bg-status-bar px-3 text-[12px] text-status-bar-foreground">
        <div className="flex items-center gap-4">
          <span>User : <b className="text-foreground">ADMIN</b></span>
          <span>Role : ADMIN</span>
          <span>{dateStr}</span>
          <span>{timeStr}</span>
          <span>RC433</span>
          <span>POS-01</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Tax Type : GST</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-success)]"/> LAN Connected
          </span>
        </div>
      </div>
    </div>
  );
}

export function Panel({ title, right, children, className = "" }: { title: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`erp-panel ${className}`}>
      <div className="erp-panel-header flex items-center justify-between">
        <span>{title}</span>
        {right}
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex items-center gap-2 text-[12.5px]">
      <span className="w-32 text-muted-foreground">{label}</span>
      <div className="flex-1">{children}</div>
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`erp-input w-full ${props.className ?? ""}`}/>;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`erp-input w-full ${props.className ?? ""}`}/>;
}

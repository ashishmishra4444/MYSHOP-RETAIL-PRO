import { type ReactNode } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  FilePlus, Pencil, Trash2, Save, Printer, Barcode, Package, PauseCircle,
  RotateCcw, Wallet, Boxes, LayoutDashboard, Users, Calculator, Power,
  Minus, Square, X, ChevronDown
} from "lucide-react";

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
  { icon: FilePlus, label: "New" },
  { icon: Pencil, label: "Edit" },
  { icon: Trash2, label: "Delete", danger: true },
  { icon: Save, label: "Save" },
  { icon: Printer, label: "Print" },
  { icon: Barcode, label: "Barcode" },
  { icon: Package, label: "Item" },
  { icon: PauseCircle, label: "Hold" },
  { icon: RotateCcw, label: "Recall" },
  { icon: Wallet, label: "Expense" },
  { icon: Boxes, label: "Stock" },
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: Users, label: "User" },
  { icon: Calculator, label: "Calculator" },
  { icon: Power, label: "Exit", danger: true, to: "/login" },
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
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", { hour12: false });
  const date = now.toLocaleDateString("en-GB");

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
          <button className="grid h-6 w-9 place-items-center hover:bg-destructive"><X className="h-3.5 w-3.5"/></button>
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
          const Inner = (
            <div className="flex h-14 w-[64px] flex-col items-center justify-center gap-1 rounded-sm border border-transparent text-[11px] hover:border-border hover:bg-accent">
              <t.icon className={`h-5 w-5 ${t.danger ? "text-destructive" : "text-primary"}`}/>
              <span>{t.label}</span>
            </div>
          );
          return t.to ? (
            <Link key={i} to={t.to}>{Inner}</Link>
          ) : (
            <button key={i} type="button" onClick={() => router.navigate({ to: "/pos" })}>{Inner}</button>
          );
        })}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto bg-background p-2.5">{children}</div>

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
          <span>{date}</span>
          <span>{time}</span>
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

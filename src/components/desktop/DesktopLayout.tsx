import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  FilePlus, Pencil, Trash2, Save, Printer, Barcode, Package, PauseCircle,
  RotateCcw, Wallet, Boxes, LayoutDashboard, Users, Calculator as CalcIcon, Power,
  Minus, Square, X, ChevronDown, Menu, ChevronRight
} from "lucide-react";
import { useToolbar } from "@/lib/erp-context";
import Calculator from "./Calculator";
import BarcodeGenerator from "./BarcodeGenerator";
import { toast } from "sonner";

const hashPassword = (password: string) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
};

type MenuItem = { label: string; items?: { label: string; to?: string; cmd?: string }[] };

const ROLE_PERMISSIONS: Record<string, string[]> = {
  "Cashier": ["/pos", "/login"],
  "Billing Staff": ["/pos", "/login"],
  "Inventory Clerk": ["/inventory", "/products", "/suppliers", "/login"],
  "Accountant": ["/", "/products", "/suppliers", "/customers", "/expenses", "/reports", "/login", "/udhar", "/cashbook"],
  "Administrator": ["*"]
};

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
    { label: "Calculator", cmd: "CALCULATOR" },
    { label: "Data Backup", cmd: "BACKUP" }
  ]},
  { label: "Utilities", items: [
    { label: "Settings", cmd: "SETTINGS" },
    { label: "User Management", cmd: "USER_MGMT" }
  ]},
  { label: "Help", items: [
    { label: "Documentation", cmd: "HELP_DOCS" },
    { label: "About MyShop", cmd: "HELP_ABOUT" }
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
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const router = useRouter();
  const sub = TITLES[pathname] ?? "";
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [companyName, setCompanyName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("myshop_company_name") || "MyShop Retail Pro";
    }
    return "MyShop Retail Pro";
  });

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
    dispatchCommand,
    currentUser,
    setCurrentUser,
    usersList,
    setUsersList,
    auditLogs,
    logActivity
  } = useToolbar();

  // Navigation Guard: Redirect to /login if no active session is present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionActive = localStorage.getItem("myshop_session_active");
      if (sessionActive !== "true") {
        router.navigate({ to: "/login", replace: true });
      }
    }
  }, [router, routerState.location.pathname]);

  const [isBackupOpen, setBackupOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isUserMgmtOpen, setUserMgmtOpen] = useState(false);
  const [isDocsOpen, setDocsOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [docsTab, setDocsTab] = useState("overview");

  // Settings State variables
  const [settingsTab, setSettingsTab] = useState("company");
  const [settName, setSettName] = useState(companyName);
  const [settGst, setSettGst] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("myshop_company_gst") || "23AAAAA0000A1Z1";
    }
    return "23AAAAA0000A1Z1";
  });
  const [settPrefix, setSettPrefix] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("myshop_invoice_prefix") || "INV/";
    }
    return "INV/";
  });
  const [settTaxMode, setSettTaxMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("myshop_tax_mode") || "Exclusive";
    }
    return "Exclusive";
  });
  const [settPaper, setSettPaper] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("myshop_paper_size") || "80mm";
    }
    return "80mm";
  });

  // User Management State variables
  const [userTab, setUserTab] = useState("list");

  // Add User states
  const [newUserName, setNewUserName] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [newUserRole, setNewUserRole] = useState("Cashier");
  const [newUserStatus, setNewUserStatus] = useState("Active");

  const [isSwitchUserOpen, setSwitchUserOpen] = useState(false);

  const handleMenuClick = (it: { label: string; to?: string; cmd?: string }) => {
    if (it.cmd === "BACKUP") {
      setBackupOpen(true);
    } else if (it.cmd === "SETTINGS") {
      setSettingsOpen(true);
    } else if (it.cmd === "USER_MGMT") {
      setUserMgmtOpen(true);
    } else if (it.cmd === "SWITCH_USER") {
      setSwitchUserOpen(true);
    } else if (it.cmd === "HELP_DOCS") {
      setDocsOpen(true);
    } else if (it.cmd === "HELP_ABOUT") {
      setAboutOpen(true);
    } else if (it.cmd) {
      dispatchCommand(it.cmd);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBackupOpen(false);
        setSettingsOpen(false);
        setUserMgmtOpen(false);
        setSwitchUserOpen(false);
        setDocsOpen(false);
        setAboutOpen(false);
      }
      if (e.key.startsWith("F") && e.key.length > 1) {
        const num = parseInt(e.key.substring(1));
        if (num >= 1 && num <= 12) {
          e.preventDefault();
          const targetKey = `F${num}`;
          const k = fnKeys?.find(item => item.key === targetKey);
          if (k && k.onClick) {
            k.onClick();
          } else if (targetKey === "F1") {
            setDocsOpen(true);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fnKeys]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isRouteAllowed = (path?: string) => {
    if (!path || path === "#" || !currentUser || currentUser.role === "Administrator") return true;
    const allowed = ROLE_PERMISSIONS[currentUser.role] || [];
    return allowed.includes(path);
  };

  const isCmdAllowed = (cmd?: string) => {
    if (!cmd || !currentUser || currentUser.role === "Administrator") return true;
    if (currentUser.role === "Cashier" || currentUser.role === "Billing Staff") {
      return ["CALCULATOR", "SWITCH_USER"].includes(cmd);
    }

    if (currentUser.role === "Inventory Clerk") {
      return ["CALCULATOR", "SWITCH_USER", "BACKUP"].includes(cmd);
    }
    if (currentUser.role === "Accountant") {
      return ["CALCULATOR", "SWITCH_USER"].includes(cmd);
    }
    return false;
  };

  const filteredMenu = MENU.map(m => {
    if (!m.items) return m;
    const items = m.items.filter(it => {
      if (it.to) return isRouteAllowed(it.to);
      if (it.cmd) return isCmdAllowed(it.cmd);
      return true;
    });
    return { ...m, items };
  }).filter(m => !m.items || m.items.length > 0);

  const isPageAllowed = isRouteAllowed(pathname);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground select-none">
      {/* Title bar */}
      <div className="flex h-10 lg:h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground">
        <div className="flex items-center gap-2 text-[12.5px] font-medium">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 rounded-sm hover:bg-white/15 mr-0.5 cursor-pointer"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="grid h-5 w-5 place-items-center rounded-sm bg-white/15 text-[10px] font-bold">MS</div>
          <span className="font-semibold">{companyName}</span>
          <span className="opacity-70 hidden sm:inline">— Main Division{sub && ` — [${sub}]`}</span>
          <span className="opacity-70 sm:hidden">{sub && ` — [${sub}]`}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="hidden sm:grid h-6 w-9 place-items-center hover:bg-white/15"><Minus className="h-3.5 w-3.5"/></button>
          <button className="hidden sm:grid h-6 w-9 place-items-center hover:bg-white/15"><Square className="h-3 w-3"/></button>
          <button onClick={() => dispatchCommand("EXIT")} className="grid h-6 w-9 place-items-center hover:bg-destructive"><X className="h-3.5 w-3.5"/></button>
        </div>
      </div>

      {/* Menu bar */}
      <div className="hidden lg:flex h-8 items-center gap-0.5 border-b border-border bg-menubar px-2 text-[12.5px]">
        {filteredMenu.map((m) => (
          <div key={m.label} className="group relative">
            <button className="flex items-center gap-1 rounded-sm px-2.5 py-1 hover:bg-accent hover:text-accent-foreground">
              {m.label}
              {m.items && <ChevronDown className="h-3 w-3 opacity-60"/>}
            </button>
            {m.items && (
              <div className="invisible absolute left-0 top-full z-40 min-w-[220px] border border-border bg-popover py-1 shadow-lg group-hover:visible">
                {m.items.map((it) => (
                  it.cmd ? (
                    <button
                      key={it.label}
                      type="button"
                      onClick={() => handleMenuClick(it)}
                      className="block w-full text-left px-3 py-1.5 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      {it.label}
                    </button>
                  ) : it.to ? (
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
      <div className="flex items-center gap-1 border-b border-border bg-toolbar px-2 py-1.5 overflow-x-auto select-none flex-nowrap lg:flex-wrap max-w-full scrollbar-thin">
        {TOOLS.map((t, i) => {
          const enabled = isCommandAvailable(t.cmd);
          return (
            <button
              key={i}
              type="button"
              disabled={!enabled}
              onClick={() => dispatchCommand(t.cmd)}
              className={`flex h-14 w-[64px] flex-col items-center justify-center gap-1 rounded-sm border border-transparent text-[11px] select-none shrink-0 lg:shrink ${
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
      <div className="flex-1 overflow-auto bg-background p-2.5">
        {isPageAllowed ? (
          children
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-muted/20 p-6 text-center select-text">
            <div className="erp-panel max-w-md border-destructive shadow-2xl p-6">
              <div className="flex items-center justify-center mb-4 text-destructive">
                <div className="bg-destructive/10 p-3 rounded-full">
                  <Power className="h-10 w-10" />
                </div>
              </div>
              <h1 className="text-lg font-bold text-foreground">Terminal Access Restricted</h1>
              <p className="mt-2 text-xs text-muted-foreground">
                Your logged-in profile <b>{currentUser.name}</b> (Role: <span className="text-primary font-semibold">{currentUser.role}</span>) is not authorized to access this module:
              </p>
              <div className="mt-3 rounded border border-border bg-secondary/30 p-2 text-xs font-mono font-bold text-primary">
                {pathname}
              </div>
              <div className="mt-5 flex flex-col gap-2">
                {currentUser.role === "Cashier" && (
                  <button
                    onClick={() => router.navigate({ to: "/pos" })}
                    className="w-full rounded bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 cursor-pointer"
                  >
                    Go to POS Billing Screen
                  </button>
                )}
                <button
                  onClick={() => setSwitchUserOpen(true)}
                  className="w-full rounded border border-border bg-white py-2 text-xs font-semibold hover:bg-muted cursor-pointer"
                >
                  Switch User Profile (Override)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating global structures */}
      {isCalculatorOpen && <Calculator onClose={() => setCalculatorOpen(false)} />}
      {isBarcodeModalOpen && <BarcodeGenerator onClose={() => setBarcodeModalOpen(false)} />}
      {isBackupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[400px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5">💾 MyShop Database Backup & Restore</span>
              <button type="button" onClick={() => setBackupOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-4 text-[12.5px] space-y-4">
              <p>Download your complete store ledger, inventory catalog, expenses history, and customer lists, or upload a previous file to restore state.</p>
              
              <div className="border-t border-border pt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    const backupData: Record<string, string | null> = {};
                    const keys = [
                      "myshop_expenses",
                      "myshop_products",
                      "myshop_customers",
                      "myshop_ledgers",
                      "myshop_customernotes"
                    ];
                    keys.forEach(k => {
                      backupData[k] = localStorage.getItem(k);
                    });
                    
                    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `MyShop_Backup_${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    logActivity("BACKUP_DOWNLOAD", "Complete store database ledger backup JSON downloaded successfully.");
                    toast.success("Database Backup JSON downloaded successfully!");
                  }}
                  className="w-full rounded bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 cursor-pointer"
                >
                  Download Local Backup (.json)
                </button>
              </div>

              <div className="border-t border-border pt-3 space-y-2">
                <div className="font-semibold">Restore Data from JSON</div>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const parsed = JSON.parse(event.target?.result as string);
                        let restoredCount = 0;
                        Object.keys(parsed).forEach(k => {
                          if (parsed[k] !== null) {
                            localStorage.setItem(k, parsed[k]);
                            restoredCount++;
                          }
                        });
                        if (restoredCount > 0) {
                          toast.success(`Data Restored Successfully! Loaded ${restoredCount} database entries.`);
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        } else {
                          toast.error("Invalid or empty backup file format");
                        }
                      } catch (error) {
                        toast.error("Failed to parse the backup JSON file");
                      }
                    };
                    reader.readAsText(file);
                  }}
                  className="block w-full border border-border rounded p-1 text-[11.5px] cursor-pointer"
                />
                <div className="text-[10px] text-destructive font-semibold">⚠️ Loading backup will overwrite all current clients, ledgers, products, and expenses. The page will auto-reload.</div>
              </div>

              <div className="mt-4 flex justify-end border-t border-border pt-3">
                <button
                  type="button"
                  onClick={() => setBackupOpen(false)}
                  className="rounded border border-border bg-secondary px-4 py-1.5 text-xs text-primary font-medium hover:bg-muted"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[500px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5">⚙️ Global Settings</span>
              <button type="button" onClick={() => setSettingsOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            
            <div className="flex border-b border-border bg-muted/30 text-[12px]">
              <button 
                onClick={() => setSettingsTab("company")} 
                className={`px-4 py-2 font-medium border-r border-border hover:bg-accent ${settingsTab === "company" ? "bg-white border-b-2 border-b-primary font-semibold" : ""}`}
              >
                Company Profile
              </button>
              <button 
                onClick={() => setSettingsTab("billing")} 
                className={`px-4 py-2 font-medium border-r border-border hover:bg-accent ${settingsTab === "billing" ? "bg-white border-b-2 border-b-primary font-semibold" : ""}`}
              >
                Billing Configuration
              </button>
              <button 
                onClick={() => setSettingsTab("printer")} 
                className={`px-4 py-2 font-medium border-r border-border hover:bg-accent ${settingsTab === "printer" ? "bg-white border-b-2 border-b-primary font-semibold" : ""}`}
              >
                Printer Options
              </button>
            </div>

            <div className="p-4 text-[12.5px] space-y-3 min-h-[220px]">
              {settingsTab === "company" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div>Company/Shop Name <span className="text-destructive">*</span></div>
                    <input 
                      type="text" 
                      className="erp-input w-full" 
                      value={settName} 
                      onChange={(e) => setSettName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <div>GSTIN Tax Identification No.</div>
                    <input 
                      type="text" 
                      className="erp-input w-full" 
                      value={settGst} 
                      onChange={(e) => setSettGst(e.target.value)}
                    />
                  </div>
                  <div className="text-[11px] text-muted-foreground">These fields are dynamically loaded onto invoices, estimates, ledger reports, and daily sales receipts.</div>
                </div>
              )}

              {settingsTab === "billing" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div>Sales Invoice Prefix</div>
                    <input 
                      type="text" 
                      className="erp-input w-full" 
                      value={settPrefix} 
                      onChange={(e) => setSettPrefix(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <div>Tax Mode Configuration</div>
                    <select 
                      className="erp-input w-full" 
                      value={settTaxMode} 
                      onChange={(e) => setSettTaxMode(e.target.value)}
                    >
                      <option value="Inclusive">Inclusive of Taxes (Retail Rates)</option>
                      <option value="Exclusive">Exclusive of Taxes (Add GST at checkout)</option>
                    </select>
                  </div>
                  <div className="text-[11px] text-muted-foreground">Affects the automated tax calculation engines used in POS billing screens.</div>
                </div>
              )}

              {settingsTab === "printer" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div>Default Print Format Size</div>
                    <select 
                      className="erp-input w-full" 
                      value={settPaper} 
                      onChange={(e) => setSettPaper(e.target.value)}
                    >
                      <option value="80mm">3 Inch thermal paper (80mm standard POS)</option>
                      <option value="58mm">2 Inch thermal paper (58mm hand-held)</option>
                      <option value="A4">A4/Letter sheet (Desktop laser print)</option>
                    </select>
                  </div>
                  <div className="text-[11px] text-muted-foreground">Select print layouts matched to physical hardware terminals.</div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-border p-3 bg-secondary/30">
              <button 
                type="button" 
                onClick={() => setSettingsOpen(false)}
                className="rounded border border-border bg-secondary px-4 py-1.5 text-xs text-primary font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={() => {
                  if (!settName.trim()) {
                    toast.error("Company Name cannot be empty!");
                    return;
                  }
                  localStorage.setItem("myshop_company_name", settName);
                  localStorage.setItem("myshop_company_gst", settGst);
                  localStorage.setItem("myshop_invoice_prefix", settPrefix);
                  localStorage.setItem("myshop_tax_mode", settTaxMode);
                  localStorage.setItem("myshop_paper_size", settPaper);
                  
                  setCompanyName(settName);
                  logActivity("BRANCH_UPDATE", `Updated settings for ${settName}`);
                  toast.success("Settings saved successfully!");
                  setSettingsOpen(false);
                }}
                className="rounded bg-primary px-4 py-1.5 text-xs text-primary-foreground font-semibold hover:opacity-90"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Management Modal */}
      {isUserMgmtOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[550px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5">👤 Staff Roles & Security Access</span>
              <button type="button" onClick={() => setUserMgmtOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            
            <div className="flex border-b border-border bg-muted/30 text-[12px]">
              <button 
                onClick={() => setUserTab("list")} 
                className={`px-4 py-2 font-medium border-r border-border hover:bg-accent ${userTab === "list" ? "bg-white border-b-2 border-b-primary font-semibold" : ""}`}
              >
                Registered Staff ({usersList.length})
              </button>
              <button 
                onClick={() => setUserTab("add")} 
                className={`px-4 py-2 font-medium border-r border-border hover:bg-accent ${userTab === "add" ? "bg-white border-b-2 border-b-primary font-semibold" : ""}`}
              >
                + Register New Staff
              </button>
              <button 
                onClick={() => setUserTab("roles")} 
                className={`px-4 py-2 font-medium border-r border-border hover:bg-accent ${userTab === "roles" ? "bg-white border-b-2 border-b-primary font-semibold" : ""}`}
              >
                Role Permissions List
              </button>
              <button 
                onClick={() => setUserTab("audit")} 
                className={`px-4 py-2 font-medium border-r border-border hover:bg-accent ${userTab === "audit" ? "bg-white border-b-2 border-b-primary font-semibold" : ""}`}
              >
                📜 Security Audit Log
              </button>
            </div>

            <div className="p-4 text-[12.5px] min-h-[260px] max-h-[360px] overflow-y-auto">
              {userTab === "list" && (
                <div className="space-y-2">
                  <table className="erp-grid w-full">
                    <thead>
                      <tr>
                        <th className="erp-grid-th">Name</th>
                        <th className="erp-grid-th">Username</th>
                        <th className="erp-grid-th">Role</th>
                        <th className="erp-grid-th">Status</th>
                        <th className="erp-grid-th text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((user: any) => (
                        <tr key={user.id}>
                          <td className="erp-grid-td font-semibold">{user.name}</td>
                          <td className="erp-grid-td">{user.username}</td>
                          <td className="erp-grid-td text-primary font-medium">{user.role}</td>
                          <td className="erp-grid-td">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${user.status === "Active" ? "bg-[color:var(--color-success)]/10 text-[color:var(--color-success)]" : "bg-destructive/10 text-destructive"}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="erp-grid-td text-center">
                            {user.username !== "admin" ? (
                              <button 
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete user @${user.username}?`)) {
                                    const filtered = usersList.filter((u: any) => u.id !== user.id);
                                    setUsersList(filtered);
                                    toast.success(`User @${user.username} deleted successfully.`);
                                    
                                    // Remove credentials
                                    if (typeof window !== "undefined") {
                                      const savedCreds = localStorage.getItem("myshop_credentials");
                                      if (savedCreds) {
                                        try {
                                          const credentials = JSON.parse(savedCreds);
                                          delete credentials[user.username.toLowerCase()];
                                          localStorage.setItem("myshop_credentials", JSON.stringify(credentials));
                                        } catch (e) {}
                                      }
                                    }
                                    logActivity("USER_DELETED", `Deleted staff user @${user.username} (Name: ${user.name})`);

                                    // If we deleted the active user, log back in as admin operator
                                    if (currentUser.username === user.username) {
                                      const adminUser = usersList.find((u: any) => u.username === "admin") || usersList[0];
                                      setCurrentUser(adminUser);
                                    }
                                  }
                                }}
                                className="text-destructive hover:underline text-[11px] cursor-pointer font-semibold"
                              >
                                Delete
                              </button>
                            ) : (
                              <span className="text-muted-foreground text-[11px]">Protected</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {userTab === "add" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div>Staff Member Name <span className="text-destructive">*</span></div>
                      <input 
                        type="text" 
                        placeholder="e.g. Sameer Jain" 
                        className="erp-input w-full" 
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <div>Terminal Username <span className="text-destructive">*</span></div>
                      <input 
                        type="text" 
                        placeholder="e.g. sameer88" 
                        className="erp-input w-full" 
                        value={newUserUsername}
                        onChange={(e) => setNewUserUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div>Assigned Access Role</div>
                      <select 
                        className="erp-input w-full" 
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value)}
                      >
                        <option value="Cashier">Billing Staff / Cashier (POS Only)</option>
                        <option value="Inventory Clerk">Inventory Clerk (Stock Control)</option>
                        <option value="Accountant">Accountant (Financial Reports)</option>
                        <option value="Administrator">Administrator (Unrestricted)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <div>Terminal status</div>
                      <select 
                        className="erp-input w-full" 
                        value={newUserStatus}
                        onChange={(e) => setNewUserStatus(e.target.value)}
                      >
                        <option value="Active">Active Access</option>
                        <option value="Suspended">Suspended / Locked</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!newUserName.trim() || !newUserUsername.trim()) {
                          toast.error("Please fill Name and Username fields");
                          return;
                        }
                        const exists = usersList.find((u: any) => u.username.toLowerCase() === newUserUsername.toLowerCase());
                        if (exists) {
                          toast.error("Username already registered!");
                          return;
                        }
                        const newU = {
                          id: Date.now(),
                          name: newUserName,
                          username: newUserUsername,
                          role: newUserRole as any,
                          status: newUserStatus as any
                        };
                        setUsersList([...usersList, newU]);
                        
                        // Save credentials hash to the secure store
                        if (typeof window !== "undefined") {
                          const savedCreds = localStorage.getItem("myshop_credentials");
                          let credentials = {};
                          if (savedCreds) {
                            try {
                              credentials = JSON.parse(savedCreds);
                            } catch (e) {}
                          }
                          const defaultPass = newUserUsername.toLowerCase() + "pass";
                          const hashed = hashPassword(defaultPass);
                          (credentials as any)[newUserUsername.toLowerCase()] = hashed;
                          localStorage.setItem("myshop_credentials", JSON.stringify(credentials));
                        }

                        logActivity("USER_CREATED", `Registered new staff member: ${newUserName} (@${newUserUsername}) with role ${newUserRole}`);
                        toast.success(`User ${newUserName} registered successfully!`);
                        setNewUserName("");
                        setNewUserUsername("");
                        setUserTab("list");
                      }}
                      className="rounded bg-primary px-4 py-1.5 text-xs text-primary-foreground font-semibold hover:opacity-90"
                    >
                      Save User Access Card
                    </button>
                  </div>
                </div>
              )}

              {userTab === "roles" && (
                <div className="space-y-3 text-[12px]">
                  <p className="text-muted-foreground">Permissions matrix outline for active roles:</p>
                  <table className="w-full text-left border border-border text-[11.5px]">
                    <thead>
                      <tr className="bg-secondary text-primary font-semibold border-b border-border">
                        <th className="p-1 px-2">Module</th>
                        <th className="p-1">Billing Staff</th>
                        <th className="p-1">Inventory Clerk</th>
                        <th className="p-1">Accountant</th>
                        <th className="p-1">Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-1.5 px-2 font-semibold">POS Billing</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-1.5 px-2 font-semibold">Inventory Master</td>
                        <td className="p-1.5 text-amber-600 font-semibold">View Only</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                        <td className="p-1.5 text-amber-600 font-semibold">View Only</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-1.5 px-2 font-semibold">Manage Suppliers</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                        <td className="p-1.5 text-amber-600 font-semibold">View Only</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-1.5 px-2 font-semibold">Ledger / Accounts</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {userTab === "audit" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold text-primary">System Activity Audit Log</span>
                    <button 
                      onClick={() => {
                        if (window.confirm("Are you sure you want to clear the audit logs?")) {
                          localStorage.setItem("myshop_audit_logs", JSON.stringify([]));
                          window.location.reload();
                        }
                      }}
                      className="text-destructive hover:underline text-[11px] font-semibold cursor-pointer"
                    >
                      Clear Audit Trail
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto">
                    {auditLogs.length === 0 ? (
                      <div className="text-center text-muted-foreground py-6 text-xs">No audit logs recorded yet.</div>
                    ) : (
                      auditLogs.map((log: any) => (
                        <div key={log.id} className="p-2 border border-border/60 bg-muted/10 rounded-sm text-[11.5px] space-y-1">
                          <div className="flex justify-between text-muted-foreground font-mono text-[10px]">
                            <span>{new Date(log.timestamp).toLocaleString("en-IN")}</span>
                            <span>{log.id}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-[#0047BA]">@{log.username}</span> ({log.role}): <span className="font-bold text-foreground bg-primary/10 px-1 rounded-sm text-[10.5px]">{log.actionType}</span>
                          </div>
                          <div className="text-slate-600 font-medium">{log.narration}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-border p-3 bg-secondary/30">
              <button 
                type="button" 
                onClick={() => setUserMgmtOpen(false)}
                className="rounded border border-border bg-secondary px-4 py-1.5 text-xs text-primary font-medium hover:bg-muted cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* F-key bar */}
      {fnKeys && fnKeys.length > 0 && (
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-12 gap-1 border-t border-border bg-toolbar p-1.5 flex-nowrap max-w-full scrollbar-thin">
          {fnKeys.map((k, i) => (
            <button
              key={i}
              onClick={k.onClick}
              className={`flex h-12 min-w-[90px] lg:min-w-0 flex-col items-center justify-center rounded-sm border text-[11.5px] font-medium shrink-0 lg:shrink ${
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

      {/* Mobile drawer menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="relative flex w-full max-w-[280px] flex-col bg-background border-r border-border shadow-xl">
            {/* Header */}
            <div className="flex h-12 items-center justify-between bg-primary px-4 text-primary-foreground">
              <span className="font-bold">MyShop Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded p-1 hover:bg-white/10 text-primary-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* User Info */}
            <div className="border-b border-border bg-muted/30 p-3 text-xs">
              <div className="font-semibold text-slate-700">Operator Profile</div>
              <div className="mt-1 font-bold text-primary">{currentUser.name}</div>
              <div className="text-[10px] text-muted-foreground">{currentUser.role} • @{currentUser.username}</div>
              <button
                type="button"
                onClick={() => {
                  setSwitchUserOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 text-primary font-bold hover:underline cursor-pointer"
              >
                Switch Profile
              </button>
            </div>
            {/* Menu List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 text-xs">
              {filteredMenu.map((m) => (
                <div key={m.label} className="space-y-1">
                  <div className="px-2 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">{m.label}</div>
                  {m.items && (
                    <div className="pl-2 space-y-0.5">
                      {m.items.map((it) => (
                        it.cmd ? (
                          <button
                            key={it.label}
                            type="button"
                            onClick={() => {
                              handleMenuClick(it);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded px-2 py-1.5 hover:bg-accent text-left cursor-pointer"
                          >
                            <span>{it.label}</span>
                            <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                          </button>
                        ) : it.to ? (
                          <Link
                            key={it.label}
                            to={it.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between rounded px-2 py-1.5 hover:bg-accent text-left"
                            activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
                          >
                            <span>{it.label}</span>
                            <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                          </Link>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Switch User Modal */}
      {isSwitchUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[350px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5">🔑 Switch Operator Terminal</span>
              <button type="button" onClick={() => setSwitchUserOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-3 text-[12.5px] space-y-3">
              <div>Select Terminal Operator Profile:</div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {usersList.map((u: any) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      const password = window.prompt(`Enter password for @${u.username}:`);
                      if (password === null) return;

                      const savedCreds = localStorage.getItem("myshop_credentials");
                      let credentials = {};
                      if (savedCreds) {
                        try {
                          credentials = JSON.parse(savedCreds);
                        } catch (e) {}
                      }
                      const expectedHash = (credentials as any)[u.username.toLowerCase()] || hashPassword(u.username.toLowerCase() + "pass");

                      if (hashPassword(password) !== expectedHash) {
                        logActivity("LOGIN_FAILURE", `Failed switch user override attempt to @${u.username}`);
                        toast.error("Incorrect password. Access denied.");
                        return;
                      }

                      setCurrentUser(u);
                      localStorage.setItem("myshop_current_user", JSON.stringify(u));
                      logActivity("LOGIN_SUCCESS", `Switched terminal operator to @${u.username} (${u.role})`);
                      toast.success(`Logged into terminal as ${u.name} [${u.role}]`);
                      setSwitchUserOpen(false);
                      if (u.role === "Cashier" || u.role === "Billing Staff") {
                        router.navigate({ to: "/pos" });
                      }
                    }}
                    className={`w-full text-left p-2 rounded border hover:bg-accent text-xs cursor-pointer ${currentUser.username === u.username ? "border-primary bg-primary/5 font-semibold text-primary" : "border-border"}`}
                  >
                    <div>{u.name}</div>
                    <div className="text-[10px] text-muted-foreground">{u.role} • @{u.username}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Documentation Modal */}
      {isDocsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[680px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5">📖 System Help & Documentation Guide</span>
              <button type="button" onClick={() => setDocsOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            
            <div className="grid grid-cols-[180px_1fr] h-[400px] bg-white">
              {/* Left Navigation Tabs */}
              <div className="border-r border-border bg-slate-50 p-2 space-y-1 text-xs">
                <button 
                  onClick={() => setDocsTab("overview")} 
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm font-medium transition-colors ${docsTab === "overview" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-slate-200"}`}
                >
                  Overview & Architecture
                </button>
                <button 
                  onClick={() => setDocsTab("pos")} 
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm font-medium transition-colors ${docsTab === "pos" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-slate-200"}`}
                >
                  POS Retail Billing
                </button>
                <button 
                  onClick={() => setDocsTab("ledger")} 
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm font-medium transition-colors ${docsTab === "ledger" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-slate-200"}`}
                >
                  Udhar Khata (Ledgers)
                </button>
                <button 
                  onClick={() => setDocsTab("rbac")} 
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm font-medium transition-colors ${docsTab === "rbac" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-slate-200"}`}
                >
                  Staff Roles & RBAC
                </button>
                <button 
                  onClick={() => setDocsTab("shortcuts")} 
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm font-medium transition-colors ${docsTab === "shortcuts" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-slate-200"}`}
                >
                  F1-F12 Keyboard Map
                </button>
              </div>

              {/* Right Tab Content Pane */}
              <div className="p-4 overflow-y-auto text-xs space-y-3 leading-relaxed text-slate-700">
                {docsTab === "overview" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary border-b border-border pb-1">MyShop Retail Pro System Overview</h4>
                    <p>Welcome to <b>MyShop Retail Pro</b>, a local-first, offline-ready desktop ERP designed for retail billing, stock cataloging, custom ledgers, and expense monitoring.</p>
                    <div className="font-semibold mt-2">Key Core Features:</div>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><b>Offline-First Local Storage:</b> Synchronizes immediately to localStorage indices, retaining operations across page refreshes.</li>
                      <li><b>Strict Session Security:</b> Redirects unauthenticated browsers to Login, blocking back-button session bypass.</li>
                      <li><b>Tools & Utilities Console:</b> Fully integrated global features like the on-screen Draggable Calculator and Database Backups.</li>
                    </ul>
                  </div>
                )}

                {docsTab === "pos" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary border-b border-border pb-1">Point Of Sales (POS) Checkout Guide</h4>
                    <p>The POS Billing interface is optimized for rapid cashier billing with custom barcode triggers and keybindings.</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><b>Item lookup:</b> Click item shortcuts or select from the database list.</li>
                      <li><b>Cart Quantity:</b> Clicking items increments quantities, or update quantities directly in the active grid.</li>
                      <li><b>Quick Keybindings:</b> Use <b>F12</b> to clear/reset carts or refresh the checkout layout.</li>
                      <li><b>Hold/Recall:</b> Cashiers can hold multiple active queues (e.g. if a customer walks away) and recall them later.</li>
                    </ul>
                  </div>
                )}

                {docsTab === "ledger" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary border-b border-border pb-1">Udhar Khata (Customer Ledger) Guidelines</h4>
                    <p>The Customer Ledger manages outstanding customer credits (Udhars) and payment receipts.</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><b>F4 (Receipt):</b> Post incoming customer cash, UPI, or cheque payments.</li>
                      <li><b>F5 (Payment) & F6 (Adjustment):</b> Record manual credit debits and balance shifts.</li>
                      <li><b>Credit Limits:</b> Warns when adjustments exceed a customer's credit limit, highlighting accounts with a blinking <b>OVER LIMIT</b> tag.</li>
                      <li><b>Aging Reports:</b> View chronological outstanding aging analysis (0-30 days, 31-60 days, etc.) relative to June 17, 2024.</li>
                    </ul>
                  </div>
                )}

                {docsTab === "rbac" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary border-b border-border pb-1">Role-Based Access Control (RBAC) Details</h4>
                    <p>The system dynamically filters menu access and restricts routes based on active operator sessions:</p>
                    <table className="w-full border-collapse border border-border mt-1">
                      <thead>
                        <tr className="bg-slate-50 text-[11px]">
                          <th className="border border-border p-1 text-left">Role Profile</th>
                          <th className="border border-border p-1 text-left">Allowed Modules</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-1 font-semibold">Administrator</td>
                          <td className="border border-border p-1">Full console access (POS, Ledgers, Backup, Settings, User Management, Expenses).</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-1 font-semibold">Billing Staff</td>
                          <td className="border border-border p-1">POS Billing, Sales Invoices and Quotations creation. View-only access to Items, Customers, and Low Stock.</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-1 font-semibold">Inventory Clerk</td>
                          <td className="border border-border p-1">Full access to Inventory Management, Manage Suppliers, and Low Stock records. No sales/billing or reports access.</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-1 font-semibold">Accountant</td>
                          <td className="border border-border p-1">View-only access to Suppliers, Customers, Inventory, and Low Stock. Full access to Dashboard, Invoices, Ledgers, Reports, and Expenses.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {docsTab === "shortcuts" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary border-b border-border pb-1">F-Keys Keyboard Shortcut Mapping</h4>
                    <p>Press the corresponding keys on your physical keyboard to trigger actions from any page screen:</p>
                    <table className="w-full border-collapse border border-border text-[11px]">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border border-border p-1 text-left w-20">Key</th>
                          <th className="border border-border p-1 text-left">Action Triggered</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F1</td><td className="border border-border p-1">Help Documentation Guide manual (this window)</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F2</td><td className="border border-border p-1">Sales Summary report window</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F3</td><td className="border border-border p-1">Purchase Summary report window</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F4</td><td className="border border-border p-1">Stock Valuation & Summary panel</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F5</td><td className="border border-border p-1">Open Customer Receivables report</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F6</td><td className="border border-border p-1">Open Supplier Payables report</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F7</td><td className="border border-border p-1">Cash and Bank ledger records list</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F8</td><td className="border border-border p-1">Open Daily Day Book transaction records</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F9</td><td className="border border-border p-1">Open Trial Balance sheet</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F10</td><td className="border border-border p-1">Open Profit & Loss statement</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F11</td><td className="border border-border p-1">Open Balance Sheet</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">F12</td><td className="border border-border p-1">Refresh system cache / database synchronization</td></tr>
                        <tr><td className="border border-border p-1 font-mono font-semibold">ESC</td><td className="border border-border p-1">Close any active modal popup or window utility</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end border-t border-border p-2.5 bg-secondary/30">
              <button 
                type="button" 
                onClick={() => setDocsOpen(false)}
                className="rounded border border-border bg-secondary px-4 py-1.5 text-xs text-primary font-medium hover:bg-muted cursor-pointer"
              >
                Close Help
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About MyShop Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="erp-panel w-[400px] border-primary shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-primary">
              <span className="flex items-center gap-1.5">ℹ️ About MyShop Retail Pro</span>
              <button type="button" onClick={() => setAboutOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4"/></button>
            </div>
            
            <div className="p-5 text-center text-xs space-y-4 bg-white">
              <div className="space-y-1">
                <div className="text-2xl font-bold tracking-tight text-primary italic">MyShop</div>
                <div className="text-lg font-bold text-destructive italic -mt-1 pb-1">Retail Pro</div>
                <div className="text-[11px] text-muted-foreground font-mono bg-slate-100 py-0.5 px-2 rounded inline-block">Version 1.0.0.0 (Release Build)</div>
              </div>
              
              <div className="border-y border-border py-3 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Product Type:</span>
                  <span className="font-semibold text-slate-700">Local-First Desktop ERP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License Holder:</span>
                  <span className="font-semibold text-slate-700">BEST SUPER MARKET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License Status:</span>
                  <span className="font-semibold text-[color:var(--color-success)] bg-[color:var(--color-success)]/10 px-1 rounded">Active / Valid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Database Engine:</span>
                  <span className="font-mono font-semibold text-slate-700">Web HTML5 LocalStorage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Environment:</span>
                  <span className="font-semibold text-slate-700">React 18 & TanStack Router</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 leading-normal">
                This billing & inventory client is optimized for local performance. Backup your database regularly from the Tools menu.
              </div>

              <div className="flex justify-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setAboutOpen(false)}
                  className="rounded border border-border bg-secondary px-6 py-1.5 text-xs text-primary font-medium hover:bg-muted cursor-pointer"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="flex h-7 items-center justify-between border-t border-border bg-status-bar px-3 text-[12px] text-status-bar-foreground">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => setSwitchUserOpen(true)}
            className="flex items-center gap-1.5 hover:underline cursor-pointer border-none bg-transparent p-0 text-[12px] text-status-bar-foreground align-middle"
            title="Click to Switch Operator Terminal"
          >
            <span>User : <b className="text-foreground">{currentUser.name}</b></span>
            <span className="opacity-70">({currentUser.role})</span>
          </button>
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

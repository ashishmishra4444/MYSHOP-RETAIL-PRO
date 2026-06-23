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
import { toast } from "sonner";

type MenuItem = { label: string; items?: { label: string; to?: string; cmd?: string }[] };

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
    dispatchCommand
  } = useToolbar();

  const [isBackupOpen, setBackupOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isUserMgmtOpen, setUserMgmtOpen] = useState(false);

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
  const [usersList, setUsersList] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_users");
      if (saved) return JSON.parse(saved);
    }
    return [
      { id: 1, name: "Admin Operator", username: "admin", role: "Administrator", status: "Active" },
      { id: 2, name: "Amit Kumar", username: "amit", role: "Manager", status: "Active" },
      { id: 3, name: "Cashier Terminal 1", username: "cashier1", role: "Cashier", status: "Active" }
    ];
  });

  // Sync users to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_users", JSON.stringify(usersList));
    }
  }, [usersList]);

  // Add User states
  const [newUserName, setNewUserName] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [newUserRole, setNewUserRole] = useState("Cashier");
  const [newUserStatus, setNewUserStatus] = useState("Active");

  const handleMenuClick = (it: { label: string; to?: string; cmd?: string }) => {
    if (it.cmd === "BACKUP") {
      setBackupOpen(true);
    } else if (it.cmd === "SETTINGS") {
      setSettingsOpen(true);
    } else if (it.cmd === "USER_MGMT") {
      setUserMgmtOpen(true);
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
      }
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
          <span>{companyName}</span>
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
                                  const filtered = usersList.filter((u: any) => u.id !== user.id);
                                  setUsersList(filtered);
                                  toast.success(`Removed account access for ${user.username}`);
                                }}
                                className="text-destructive hover:underline text-[11px]"
                              >
                                Revoke
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
                        <option value="Cashier">Cashier (POS Only)</option>
                        <option value="Manager">Manager (Edit stock/Limits)</option>
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
                          role: newUserRole,
                          status: newUserStatus
                        };
                        setUsersList([...usersList, newU]);
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
                        <th className="p-1">Cashier</th>
                        <th className="p-1">Manager</th>
                        <th className="p-1">Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-1.5 px-2 font-semibold">POS Sales Screen</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-1.5 px-2 font-semibold">Master/Edit Stock Prices</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-1.5 px-2 font-semibold">Purchase Entry</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-1.5 px-2 font-semibold">Cash ledger / Accounts</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-red-600 font-semibold">No</td>
                        <td className="p-1.5 text-green-600 font-semibold">Yes</td>
                      </tr>
                    </tbody>
                  </table>
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

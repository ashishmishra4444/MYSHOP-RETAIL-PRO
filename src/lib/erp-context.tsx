import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

export interface HeldBill {
  id: string;
  cart: any[];
  customer: string;
  heldAt: string;
}

export interface POSSession {
  id: string; // e.g., "POS-001"
  cart: any[];
  customer: string;
}

export interface ERPPageRegistration {
  pageName: string;
  availableCommands: string[]; // e.g. ["NEW", "EDIT", "DELETE", "SAVE", "PRINT", "HOLD", "RECALL"]
  selectedRecordId?: string | null;
  isDirty?: boolean;
  onCommand?: (command: string) => void;
}

export type UserRole = "Administrator" | "Billing Staff" | "Cashier" | "Inventory Clerk" | "Accountant";

export interface User {
  id: number;
  name: string;
  username: string;
  role: UserRole;
  status: "Active" | "Suspended";
}

export interface AuditLog {
  id: string;
  timestamp: string;
  username: string;
  role: string;
  actionType: string;
  narration: string;
}

interface ERPContextType {
  // Page Context
  activePage: ERPPageRegistration | null;
  registerPage: (page: ERPPageRegistration) => () => void;
  updatePageMeta: (meta: Partial<ERPPageRegistration>) => void;

  // Global Modals State
  isCalculatorOpen: boolean;
  setCalculatorOpen: (open: boolean) => void;
  isBarcodeModalOpen: boolean;
  setBarcodeModalOpen: (open: boolean) => void;

  // POS tabbed session state
  posSessions: POSSession[];
  activeSessionId: string | null;
  createPOSSession: () => string;
  setActiveSessionId: (id: string | null) => void;
  updatePOSSessionCart: (sessionId: string, cart: any[]) => void;
  updatePOSSessionCustomer: (sessionId: string, customer: string) => void;
  closePOSSession: (sessionId: string) => void;

  // Held Bills
  heldBills: HeldBill[];
  holdPOSSession: (sessionId: string) => void;
  recallPOSSession: (billId: string) => void;

  // Commands dispatching
  dispatchCommand: (command: string) => void;

  // Authentication & Auditing State
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  usersList: User[];
  setUsersList: React.Dispatch<React.SetStateAction<User[]>>;
  auditLogs: AuditLog[];
  logActivity: (actionType: string, narration: string) => void;
}

const ERPContext = createContext<ERPContextType | null>(null);

export function ToolbarProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [activePage, setActivePage] = useState<ERPPageRegistration | null>(null);

  // Modals state
  const [isCalculatorOpen, setCalculatorOpen] = useState(false);
  const [isBarcodeModalOpen, setBarcodeModalOpen] = useState(false);

  // POS Sessions state
  const [posSessions, setPosSessions] = useState<POSSession[]>([
    { id: "POS-001", cart: [], customer: "CASH" }
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>("POS-001");
  const [sessionCounter, setSessionCounter] = useState(1);

  // Held Bills state
  const [heldBills, setHeldBills] = useState<HeldBill[]>([]);

  // Centralized Auth State
  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_current_user");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return { id: 1, name: "Admin Operator", username: "admin", role: "Administrator", status: "Active" };
  });

  const [usersList, setUsersList] = useState<User[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_users");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [
      { id: 1, name: "Admin Operator", username: "admin", role: "Administrator", status: "Active" },
      { id: 2, name: "Amit Kumar", username: "amit", role: "Administrator", status: "Active" },
      { id: 3, name: "Cashier Terminal 1", username: "cashier1", role: "Cashier", status: "Active" }
    ];
  });

  // Sync users list to local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_users", JSON.stringify(usersList));
    }
  }, [usersList]);

  // Centralized Audit Log State
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myshop_audit_logs");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [];
  });

  // Sync audit logs to local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("myshop_audit_logs", JSON.stringify(auditLogs));
    }
  }, [auditLogs]);

  const setCurrentUser = useCallback((user: User | null) => {
    setCurrentUserState(user);
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("myshop_current_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("myshop_current_user");
      }
    }
  }, []);

  const logActivity = useCallback((actionType: string, narration: string) => {
    const userToLog = currentUser || { username: "System", role: "System" };
    const newLog: AuditLog = {
      id: `AUD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      username: userToLog.username,
      role: userToLog.role,
      actionType,
      narration
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, [currentUser]);

  // Page registration helper
  const registerPage = useCallback((page: ERPPageRegistration) => {
    setActivePage(page);
    return () => {
      setActivePage((current) => (current?.pageName === page.pageName ? null : current));
    };
  }, []);

  const updatePageMeta = useCallback((meta: Partial<ERPPageRegistration>) => {
    setActivePage((current) => {
      if (!current) return null;
      return { ...current, ...meta };
    });
  }, []);

  // POS Sessions helper methods
  const createPOSSession = useCallback(() => {
    const nextNum = sessionCounter + 1;
    setSessionCounter(nextNum);
    const newId = `POS-${String(nextNum).padStart(3, "0")}`;
    const newSession: POSSession = { id: newId, cart: [], customer: "CASH" };
    setPosSessions((prev) => [...prev, newSession]);
    setActiveSessionId(newId);
    return newId;
  }, [sessionCounter]);

  const updatePOSSessionCart = useCallback((sessionId: string, cart: any[]) => {
    setPosSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, cart } : s))
    );
  }, []);

  const updatePOSSessionCustomer = useCallback((sessionId: string, customer: string) => {
    setPosSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, customer } : s))
    );
  }, []);

  const closePOSSession = useCallback((sessionId: string) => {
    setPosSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== sessionId);
      if (filtered.length === 0) {
        // Always keep at least one active session
        const nextId = "POS-001";
        setActiveSessionId(nextId);
        return [{ id: nextId, cart: [], customer: "CASH" }];
      }
      if (activeSessionId === sessionId) {
        setActiveSessionId(filtered[filtered.length - 1].id);
      }
      return filtered;
    });
  }, [activeSessionId]);

  // Hold and Recall POS helper methods
  const holdPOSSession = useCallback((sessionId: string) => {
    const sessionToHold = posSessions.find((s) => s.id === sessionId);
    if (!sessionToHold || sessionToHold.cart.length === 0) return;

    const newHeld: HeldBill = {
      id: sessionToHold.id,
      cart: [...sessionToHold.cart],
      customer: sessionToHold.customer,
      heldAt: new Date().toLocaleTimeString("en-IN", { hour12: false })
    };

    setHeldBills((prev) => [...prev, newHeld]);
    // Reset/clear the active session cart
    updatePOSSessionCart(sessionId, []);
  }, [posSessions, updatePOSSessionCart]);

  const recallPOSSession = useCallback((billId: string) => {
    const bill = heldBills.find((b) => b.id === billId);
    if (!bill) return;

    // Restore to active session or create a new session
    if (activeSessionId) {
      updatePOSSessionCart(activeSessionId, bill.cart);
      updatePOSSessionCustomer(activeSessionId, bill.customer);
    }

    setHeldBills((prev) => prev.filter((b) => b.id !== billId));
  }, [heldBills, activeSessionId, updatePOSSessionCart, updatePOSSessionCustomer]);

  // General commands executor
  const dispatchCommand = useCallback(
    (command: string) => {
      // Handle Navigation & Global Actions
      switch (command) {
        case "ITEM":
          router.navigate({ to: "/products" });
          return;
        case "USER":
          router.navigate({ to: "/customers" });
          return;
        case "STOCK":
          router.navigate({ to: "/inventory" });
          return;
        case "EXPENSE":
          router.navigate({ to: "/expenses" });
          return;
        case "DASHBOARD":
          router.navigate({ to: "/" });
          return;
        case "CALCULATOR":
          setCalculatorOpen((prev) => !prev);
          return;
        case "BARCODE":
          setBarcodeModalOpen((prev) => !prev);
          return;
        case "EXIT":
          if (typeof window !== "undefined") {
            localStorage.removeItem("myshop_session_active");
            localStorage.removeItem("myshop_current_user");
          }
          router.navigate({ to: "/login" });
          return;
      }

      // Handle contextual page actions
      if (activePage?.onCommand) {
        activePage.onCommand(command);
      }
    },
    [activePage, router]
  );

  return (
    <ERPContext.Provider
      value={{
        activePage,
        registerPage,
        updatePageMeta,
        isCalculatorOpen,
        setCalculatorOpen,
        isBarcodeModalOpen,
        setBarcodeModalOpen,
        posSessions,
        activeSessionId,
        createPOSSession,
        setActiveSessionId,
        updatePOSSessionCart,
        updatePOSSessionCustomer,
        closePOSSession,
        heldBills,
        holdPOSSession,
        recallPOSSession,
        dispatchCommand,
        currentUser,
        setCurrentUser,
        usersList,
        setUsersList,
        auditLogs,
        logActivity
      }}
    >
      {children}
    </ERPContext.Provider>
  );
}

export function useToolbar() {
  const context = useContext(ERPContext);
  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }

  const {
    activePage,
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
  } = context;

  // Derive disabled states for toolbar buttons
  const isCommandAvailable = (cmd: string) => {
    // Navigation/Global buttons are always available
    if (["ITEM", "USER", "STOCK", "EXPENSE", "DASHBOARD", "CALCULATOR", "BARCODE", "EXIT"].includes(cmd)) {
      return true;
    }
    // Context-sensitive buttons are enabled only if registered by the active page
    return activePage?.availableCommands.includes(cmd) || false;
  };

  return {
    activePageName: activePage?.pageName ?? "",
    selectedRecordId: activePage?.selectedRecordId ?? null,
    isDirty: activePage?.isDirty ?? false,
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
  };
}

export function useERPCommands(registration: ERPPageRegistration | null) {
  const context = useContext(ERPContext);
  if (!context) {
    throw new Error("useERPCommands must be used within a ToolbarProvider");
  }

  const { registerPage, updatePageMeta } = context;

  useEffect(() => {
    if (!registration) return;
    const unregister = registerPage(registration);
    return unregister;
  }, [registration, registerPage]);

  return {
    updatePageMeta,
    context
  };
}

export const checkPermission = (role: string, feature: string): boolean => {
  if (role === "Administrator") return true;

  switch (feature) {
    case "view_dashboard":
      return ["Accountant"].includes(role);
    case "process_sales":
      return ["Billing Staff", "Cashier"].includes(role);
    case "create_invoices":
      return ["Billing Staff", "Cashier", "Accountant"].includes(role);
    case "edit_invoices":
      return ["Accountant"].includes(role);
    case "create_quotations":
      return ["Billing Staff", "Cashier"].includes(role);
    case "edit_quotations":
      return false;
    case "inventory_view":
      return ["Billing Staff", "Cashier", "Inventory Clerk", "Accountant"].includes(role);
    case "inventory_edit":
      return ["Inventory Clerk"].includes(role);
    case "suppliers_view":
      return ["Inventory Clerk", "Accountant"].includes(role);
    case "suppliers_edit":
      return ["Inventory Clerk"].includes(role);
    case "customers_view":
      return ["Billing Staff", "Cashier", "Accountant"].includes(role);
    case "customers_create":
      return ["Billing Staff", "Cashier"].includes(role);
    case "low_stock":
      return ["Billing Staff", "Cashier", "Inventory Clerk", "Accountant"].includes(role);
    case "user_management":
      return false;
    case "expense_reports":
      return ["Accountant"].includes(role);
    default:
      return false;
  }
};

export function usePermissionCheck() {
  const { currentUser } = useToolbar();
  return useCallback((feature: string) => {
    if (!currentUser) return false;
    return checkPermission(currentUser.role, feature);
  }, [currentUser]);
}

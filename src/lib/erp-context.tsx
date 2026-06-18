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
        dispatchCommand
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
    dispatchCommand
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
    dispatchCommand
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

import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/erp-context-CK6VWqph.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ERPContext = (0, import_react.createContext)(null);
function ToolbarProvider({ children }) {
	const router = useRouter();
	const [activePage, setActivePage] = (0, import_react.useState)(null);
	const [isCalculatorOpen, setCalculatorOpen] = (0, import_react.useState)(false);
	const [isBarcodeModalOpen, setBarcodeModalOpen] = (0, import_react.useState)(false);
	const [posSessions, setPosSessions] = (0, import_react.useState)([{
		id: "POS-001",
		cart: [],
		customer: "CASH"
	}]);
	const [activeSessionId, setActiveSessionId] = (0, import_react.useState)("POS-001");
	const [sessionCounter, setSessionCounter] = (0, import_react.useState)(1);
	const [heldBills, setHeldBills] = (0, import_react.useState)([]);
	const registerPage = (0, import_react.useCallback)((page) => {
		setActivePage(page);
		return () => {
			setActivePage((current) => current?.pageName === page.pageName ? null : current);
		};
	}, []);
	const updatePageMeta = (0, import_react.useCallback)((meta) => {
		setActivePage((current) => {
			if (!current) return null;
			return {
				...current,
				...meta
			};
		});
	}, []);
	const createPOSSession = (0, import_react.useCallback)(() => {
		const nextNum = sessionCounter + 1;
		setSessionCounter(nextNum);
		const newId = `POS-${String(nextNum).padStart(3, "0")}`;
		const newSession = {
			id: newId,
			cart: [],
			customer: "CASH"
		};
		setPosSessions((prev) => [...prev, newSession]);
		setActiveSessionId(newId);
		return newId;
	}, [sessionCounter]);
	const updatePOSSessionCart = (0, import_react.useCallback)((sessionId, cart) => {
		setPosSessions((prev) => prev.map((s) => s.id === sessionId ? {
			...s,
			cart
		} : s));
	}, []);
	const updatePOSSessionCustomer = (0, import_react.useCallback)((sessionId, customer) => {
		setPosSessions((prev) => prev.map((s) => s.id === sessionId ? {
			...s,
			customer
		} : s));
	}, []);
	const closePOSSession = (0, import_react.useCallback)((sessionId) => {
		setPosSessions((prev) => {
			const filtered = prev.filter((s) => s.id !== sessionId);
			if (filtered.length === 0) {
				const nextId = "POS-001";
				setActiveSessionId(nextId);
				return [{
					id: nextId,
					cart: [],
					customer: "CASH"
				}];
			}
			if (activeSessionId === sessionId) setActiveSessionId(filtered[filtered.length - 1].id);
			return filtered;
		});
	}, [activeSessionId]);
	const holdPOSSession = (0, import_react.useCallback)((sessionId) => {
		const sessionToHold = posSessions.find((s) => s.id === sessionId);
		if (!sessionToHold || sessionToHold.cart.length === 0) return;
		const newHeld = {
			id: sessionToHold.id,
			cart: [...sessionToHold.cart],
			customer: sessionToHold.customer,
			heldAt: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", { hour12: false })
		};
		setHeldBills((prev) => [...prev, newHeld]);
		updatePOSSessionCart(sessionId, []);
	}, [posSessions, updatePOSSessionCart]);
	const recallPOSSession = (0, import_react.useCallback)((billId) => {
		const bill = heldBills.find((b) => b.id === billId);
		if (!bill) return;
		if (activeSessionId) {
			updatePOSSessionCart(activeSessionId, bill.cart);
			updatePOSSessionCustomer(activeSessionId, bill.customer);
		}
		setHeldBills((prev) => prev.filter((b) => b.id !== billId));
	}, [
		heldBills,
		activeSessionId,
		updatePOSSessionCart,
		updatePOSSessionCustomer
	]);
	const dispatchCommand = (0, import_react.useCallback)((command) => {
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
		if (activePage?.onCommand) activePage.onCommand(command);
	}, [activePage, router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ERPContext.Provider, {
		value: {
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
		},
		children
	});
}
function useToolbar() {
	const context = (0, import_react.useContext)(ERPContext);
	if (!context) throw new Error("useToolbar must be used within a ToolbarProvider");
	const { activePage, isCalculatorOpen, setCalculatorOpen, isBarcodeModalOpen, setBarcodeModalOpen, dispatchCommand } = context;
	const isCommandAvailable = (cmd) => {
		if ([
			"ITEM",
			"USER",
			"STOCK",
			"EXPENSE",
			"DASHBOARD",
			"CALCULATOR",
			"BARCODE",
			"EXIT"
		].includes(cmd)) return true;
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
function useERPCommands(registration) {
	const context = (0, import_react.useContext)(ERPContext);
	if (!context) throw new Error("useERPCommands must be used within a ToolbarProvider");
	const { registerPage, updatePageMeta } = context;
	(0, import_react.useEffect)(() => {
		if (!registration) return;
		return registerPage(registration);
	}, [registration, registerPage]);
	return {
		updatePageMeta,
		context
	};
}
//#endregion
export { useERPCommands as n, useToolbar as r, ToolbarProvider as t };

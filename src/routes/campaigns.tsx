import { createFileRoute } from "@tanstack/react-router";
import { DesktopLayout, Panel, Field, Input, Select } from "@/components/desktop/DesktopLayout";
import { useState, useEffect } from "react";
import { CAMPAIGNS, Campaign, getCustomersBySegment } from "@/lib/marketing-store";
import { useERPCommands } from "@/lib/erp-context";
import { Megaphone, Users, Calendar, Award, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/campaigns")({
  head: () => ({ meta: [{ title: "Campaign Manager — MyShop Retail Pro" }] }),
  component: CampaignManager,
});

function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS.map(c => ({ ...c })));
  const [selectedId, setSelectedId] = useState<string | null>(CAMPAIGNS[0]?.id || null);
  const [mode, setMode] = useState<"View" | "New" | "Edit">("View");
  const [showHelp, setShowHelp] = useState(false);

  // Close help on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowHelp(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Selection states
  const activeCampaign = campaigns.find(c => c.id === selectedId) || campaigns[0];
  const [name, setName] = useState(activeCampaign?.name || "");
  const [offerTitle, setOfferTitle] = useState(activeCampaign?.offerTitle || "");
  const [message, setMessage] = useState(activeCampaign?.message || "");
  const [discount, setDiscount] = useState(activeCampaign?.discount || 0);
  const [targetAudience, setTargetAudience] = useState(activeCampaign?.targetAudience || "All");
  const [channels, setChannels] = useState<Campaign["deliveryChannels"]>(activeCampaign?.deliveryChannels || []);

  const handleSelectCampaign = (id: string) => {
    const camp = campaigns.find(c => c.id === id);
    if (camp) {
      setSelectedId(id);
      setName(camp.name);
      setOfferTitle(camp.offerTitle);
      setMessage(camp.message);
      setDiscount(camp.discount);
      setTargetAudience(camp.targetAudience);
      setChannels(camp.deliveryChannels);
      setMode("View");
    }
  };

  const handleSave = () => {
    if (mode === "New") {
      const nextId = `C${String(campaigns.length + 1).padStart(3, "0")}`;
      const newCamp: Campaign = {
        id: nextId,
        name,
        festival: "General",
        offerTitle,
        message,
        discount,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
        targetAudience,
        deliveryChannels: channels,
        status: "Scheduled"
      };
      setCampaigns([...campaigns, newCamp]);
      setSelectedId(nextId);
      toast.success("Campaign saved successfully!");
    } else if (mode === "Edit" && selectedId) {
      setCampaigns(campaigns.map(c => c.id === selectedId ? {
        ...c,
        name,
        offerTitle,
        message,
        discount,
        targetAudience,
        deliveryChannels: channels
      } : c));
      toast.success("Campaign details updated!");
    }
    setMode("View");
  };

  const handleDelete = () => {
    if (!selectedId) return;
    if (confirm(`Are you sure you want to delete campaign ${selectedId}?`)) {
      const filtered = campaigns.filter(c => c.id !== selectedId);
      setCampaigns(filtered);
      setSelectedId(filtered[0]?.id || null);
      if (filtered[0]) {
        setName(filtered[0].name);
        setOfferTitle(filtered[0].offerTitle);
        setMessage(filtered[0].message);
        setDiscount(filtered[0].discount);
        setTargetAudience(filtered[0].targetAudience);
        setChannels(filtered[0].deliveryChannels);
      }
      setMode("View");
      toast.success("Campaign removed.");
    }
  };

  // Register commands
  useERPCommands({
    pageName: "campaigns",
    availableCommands: ["NEW", "EDIT", "DELETE", "SAVE", "PRINT"],
    selectedRecordId: selectedId,
    isDirty: mode !== "View",
    onCommand: (cmd) => {
      if (cmd === "NEW") {
        setMode("New");
        setName("");
        setOfferTitle("");
        setMessage("");
        setDiscount(0);
        setTargetAudience("All");
        setChannels(["WhatsApp"]);
      } else if (cmd === "EDIT") {
        if (selectedId) setMode("Edit");
      } else if (cmd === "DELETE") {
        handleDelete();
      } else if (cmd === "SAVE") {
        handleSave();
      } else if (cmd === "PRINT") {
        toast.info("Printing Campaign performance report details...");
        window.print();
      }
    }
  });

  const toggleChannel = (ch: Campaign["deliveryChannels"][number]) => {
    if (channels.includes(ch)) {
      setChannels(channels.filter(c => c !== ch));
    } else {
      setChannels([...channels, ch]);
    }
  };

  return (
    <DesktopLayout
      fnKeys={[
        { key: "F1", label: "Help", onClick: () => { setShowHelp(true); toast.info("Opening Campaign Manager Manual..."); } },
        { key: "F2", label: "New (F2)", onClick: () => { setMode("New"); setName(""); setOfferTitle(""); setMessage(""); toast.info("Creating new campaign. Fill out form and press F5 to save."); } },
        { key: "F3", label: "Edit (F3)", onClick: () => { if (selectedId) { setMode("Edit"); toast.info(`Editing campaign ${selectedId}. Press F5 to save changes.`); } else { toast.warning("Please select a campaign first."); } } },
        { key: "F4", label: "Delete (F4)", tone: "danger", onClick: handleDelete },
        { key: "F5", label: "Save (F5)", tone: "primary", onClick: handleSave },
        { key: "F6", label: "Cancel", onClick: () => { setMode("View"); toast.info("Cancelled changes."); } },
        { key: "F7", label: "Print Report", onClick: () => { toast.info("Dispatching print job..."); window.print(); } }
      ]}
    >
      <div className="grid grid-cols-[1fr_480px] gap-3">
        <Panel title="Campaign List">
          <table className="erp-grid">
            <thead>
              <tr>
                <th className="erp-grid-th w-10">S.No</th>
                <th className="erp-grid-th">Campaign Name</th>
                <th className="erp-grid-th">Festival</th>
                <th className="erp-grid-th">Offer Detail</th>
                <th className="erp-grid-th">Target</th>
                <th className="erp-grid-th text-center">Channels</th>
                <th className="erp-grid-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr
                  key={c.id}
                  onClick={() => handleSelectCampaign(c.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedId === c.id
                      ? "bg-primary/10 font-semibold"
                      : i % 2
                      ? "bg-[color:var(--color-grid-row-alt)] hover:bg-accent/40"
                      : "hover:bg-accent/40"
                  }`}
                >
                  <td className="erp-grid-td text-center">{i + 1}</td>
                  <td className="erp-grid-td font-semibold text-primary">{c.name}</td>
                  <td className="erp-grid-td">{c.festival}</td>
                  <td className="erp-grid-td">{c.offerTitle}</td>
                  <td className="erp-grid-td text-indigo-700 font-medium">{c.targetAudience}</td>
                  <td className="erp-grid-td">
                    <div className="flex gap-1 justify-center flex-wrap">
                      {c.deliveryChannels.map(ch => (
                        <span key={ch} className="px-1.5 py-0.5 rounded-xs bg-secondary text-[10px] border font-bold">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="erp-grid-td">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[11px] font-bold ${
                        c.status === "Active"
                          ? "bg-[color:var(--color-success)] text-white"
                          : c.status === "Scheduled"
                          ? "bg-blue-600 text-white"
                          : c.status === "Completed"
                          ? "bg-slate-500 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={`Campaign Details — [Mode : ${mode}]`}>
          <div className="space-y-3 p-1">
            <Field label="Campaign ID">
              <Input value={mode === "New" ? "AUTO GENERATE" : activeCampaign?.id} disabled />
            </Field>
            
            <Field label="Campaign Name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={mode === "View"}
                placeholder="Enter campaign title"
              />
            </Field>

            <Field label="Offer Title">
              <Input
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
                disabled={mode === "View"}
                placeholder="Flat discount/gift hamper promo details"
              />
            </Field>

            <Field label="Discount %">
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                disabled={mode === "View"}
                className="text-right"
              />
            </Field>

            <Field label="Target Audience">
              <Select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as Campaign["targetAudience"])}
                disabled={mode === "View"}
              >
                <option value="All">All Customers ({getCustomersBySegment("All").length})</option>
                <option value="VIP">VIP Customers ({getCustomersBySegment("VIP").length})</option>
                <option value="Credit">Credit Ledger ({getCustomersBySegment("Credit").length})</option>
                <option value="Frequent">Frequent Buyers ({getCustomersBySegment("Frequent").length})</option>
                <option value="Inactive">Inactive Members ({getCustomersBySegment("Inactive").length})</option>
              </Select>
            </Field>

            {/* Delivery Channel selector */}
            <div className="flex flex-col gap-1.5 text-[12.5px]">
              <span className="w-32 text-muted-foreground">Channels</span>
              <div className="flex gap-2">
                {["In-App", "WhatsApp", "SMS", "Email"].map((ch: any) => {
                  const selected = channels.includes(ch);
                  return (
                    <button
                      key={ch}
                      type="button"
                      disabled={mode === "View"}
                      onClick={() => toggleChannel(ch)}
                      className={`px-3 py-1 rounded-sm border text-xs font-semibold ${
                        selected
                          ? "bg-[#0047BA] text-white border-transparent"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1 text-[12.5px]">
              <span className="text-muted-foreground">Broadcasting Message Template</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={mode === "View"}
                rows={5}
                className="erp-input w-full h-auto p-2 resize-none border border-slate-300 rounded-sm outline-none focus:border-primary"
                placeholder="Compose messaging template here..."
              />
            </div>
          </div>
        </Panel>
      </div>

      {/* HELP MODAL */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs text-[12.5px]">
          <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-titlebar-foreground font-semibold">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Campaign Manager Manual [F1]</span>
              </div>
              <button onClick={() => setShowHelp(false)} className="grid h-6 w-8 place-items-center hover:bg-destructive text-white">✕</button>
            </div>
            <div className="p-4 space-y-3 bg-slate-50">
              <table className="erp-grid w-full bg-white">
                <thead>
                  <tr>
                    <th className="erp-grid-th">Key</th>
                    <th className="erp-grid-th">Action Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="erp-grid-td font-bold font-mono">F1</td><td className="erp-grid-td">View this manual guide</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F2</td><td className="erp-grid-td">Create new campaign entry</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F3</td><td className="erp-grid-td">Edit selected campaign details</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F4</td><td className="erp-grid-td text-destructive font-semibold">Delete selected campaign from list</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F5</td><td className="erp-grid-td text-primary font-semibold">Save new/edited campaign changes</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F6</td><td className="erp-grid-td">Cancel edit/new mode (discard changes)</td></tr>
                  <tr><td className="erp-grid-td font-bold font-mono">F7</td><td className="erp-grid-td">Print currently listed campaign details</td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex h-10 items-center justify-end border-t border-border bg-slate-100 px-3">
              <button onClick={() => setShowHelp(false)} className="rounded-sm border border-border bg-white px-4 py-1 hover:bg-slate-200 transition-colors">Close [ESC]</button>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}

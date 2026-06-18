import React, { useState } from "react";
import { X, Printer, RefreshCw } from "lucide-react";

interface BarcodeGeneratorProps {
  onClose: () => void;
}

export default function BarcodeGenerator({ onClose }: BarcodeGeneratorProps) {
  const [value, setValue] = useState("8901234567890");
  const [format, setFormat] = useState("EAN-13");
  const [qty, setQty] = useState(1);

  // Generate random dummy barcode sequence
  const handleRandomize = () => {
    let randomVal = "";
    for (let i = 0; i < 12; i++) {
      randomVal += Math.floor(Math.random() * 10);
    }
    // Simple checksum digit
    randomVal += Math.floor(Math.random() * 10);
    setValue(randomVal);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none">
      <div className="w-[450px] rounded-md border border-border bg-white shadow-2xl overflow-hidden">
        {/* Title Bar */}
        <div className="flex h-8 items-center justify-between bg-titlebar px-3 text-[12.5px] text-titlebar-foreground">
          <span className="font-semibold">Barcode Label Generator</span>
          <button onClick={onClose} className="grid h-6 w-8 place-items-center hover:bg-destructive"><X className="h-4 w-4"/></button>
        </div>

        {/* Form panel */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-[110px_1fr] items-center gap-2 text-[12.5px]">
            <span className="text-muted-foreground">Barcode Data</span>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="erp-input flex-1"
                placeholder="Enter value..."
              />
              <button
                type="button"
                onClick={handleRandomize}
                className="grid h-7 w-7 place-items-center rounded-sm border border-border hover:bg-accent bg-secondary"
                title="Generate Random Code"
              >
                <RefreshCw className="h-3.5 w-3.5"/>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[110px_1fr] items-center gap-2 text-[12.5px]">
            <span className="text-muted-foreground">Symbology</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="erp-input"
            >
              <option value="EAN-13">EAN-13 (Standard Retail)</option>
              <option value="CODE-128">Code-128 (Alpha-Numeric)</option>
              <option value="UPC-A">UPC-A</option>
              <option value="CODE-39">Code-39</option>
            </select>
          </div>

          <div className="grid grid-cols-[110px_1fr] items-center gap-2 text-[12.5px]">
            <span className="text-muted-foreground">Print Qty</span>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="erp-input w-24"
              min="1"
            />
          </div>

          {/* Barcode Render Section */}
          <div className="flex flex-col items-center justify-center border border-dashed border-border bg-slate-50 p-6 rounded-sm">
            <div className="flex items-end h-16 gap-0.5 bg-white px-6 py-2 border border-border shadow-xs">
              {/* Fake barcode lines using custom patterns based on code input */}
              {Array.from({ length: 42 }).map((_, idx) => {
                const seedChar = value.charCodeAt(idx % value.length) || 48;
                // Generate varying line widths using character code values
                const isLine = (seedChar + idx) % 2 === 0;
                const width = ((seedChar * idx) % 3) + 1; // 1px to 3px width
                
                if (isLine) {
                  return (
                    <div
                      key={idx}
                      className="bg-black h-full"
                      style={{ width: `${width}px` }}
                    />
                  );
                } else {
                  return (
                    <div
                      key={idx}
                      className="bg-transparent h-full"
                      style={{ width: `${width}px` }}
                    />
                  );
                }
              })}
            </div>
            <div className="mt-2 text-center text-xs font-mono tracking-widest text-foreground font-semibold">
              {value || "NO DATA"}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              Format: {format}
            </div>
          </div>
        </div>

        {/* Action buttons footer */}
        <div className="flex items-center justify-end gap-2 border-t border-border bg-slate-50 p-3">
          <button
            onClick={onClose}
            className="rounded-sm border border-border px-4 py-1.5 text-[12.5px] hover:bg-accent bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert(`Printing ${qty} barcode labels for: ${value}`);
              onClose();
            }}
            className="flex items-center gap-1.5 rounded-sm bg-primary px-4 py-1.5 text-[12.5px] font-semibold text-primary-foreground hover:bg-primary/95"
          >
            <Printer className="h-3.5 w-3.5"/> Print Labels
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { X, Minus, Square } from "lucide-react";

interface CalculatorProps {
  onClose: () => void;
}

export default function Calculator({ onClose }: CalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const handleDigit = (digit: string) => {
    if (display === "0" || isFinished) {
      setDisplay(digit);
      setIsFinished(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
    setIsFinished(false);
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setIsFinished(false);
  };

  const handleCalculate = () => {
    if (!equation) return;
    const fullEq = equation + display;
    try {
        const tokens = fullEq.match(/(\d+\.?\d*)|[+\-*/]/g);
        if (!tokens) throw new Error("No tokens");
        let list = [...tokens];
        for (let i = 0; i < list.length; i++) {
          if (list[i] === "*" || list[i] === "/") {
            const op = list[i];
            const prev = parseFloat(list[i - 1]);
            const next = parseFloat(list[i + 1]);
            const val = op === "*" ? prev * next : prev / next;
            list.splice(i - 1, 3, String(val));
            i--;
          }
        }
        for (let i = 0; i < list.length; i++) {
          if (list[i] === "+" || list[i] === "-") {
            const op = list[i];
            const prev = parseFloat(list[i - 1]);
            const next = parseFloat(list[i + 1]);
            const val = op === "+" ? prev + next : prev - next;
            list.splice(i - 1, 3, String(val));
            i--;
          }
        }
        const result = parseFloat(list[0]);
        setDisplay(String(result));
        setEquation("");
        setIsFinished(true);
      } catch (e) {
        setDisplay("Error");
        setEquation("");
        setIsFinished(true);
      }
  };

  const buttons = [
    ["C", "CE", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
  ];

  return (
    <div className="fixed bottom-20 right-6 z-50 w-72 rounded-md border border-border bg-popover shadow-2xl overflow-hidden select-none">
      {/* Title Bar */}
      <div className="flex h-7 items-center justify-between bg-titlebar px-2 text-[12px] text-titlebar-foreground cursor-move">
        <div className="flex items-center gap-1.5 font-medium">
          <span>Calculator</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="grid h-5 w-7 place-items-center hover:bg-white/10"><Minus className="h-3 w-3"/></button>
          <button className="grid h-5 w-7 place-items-center hover:bg-white/10"><Square className="h-2.5 w-2.5"/></button>
          <button onClick={onClose} className="grid h-5 w-7 place-items-center hover:bg-destructive"><X className="h-3 w-3"/></button>
        </div>
      </div>

      {/* Screen */}
      <div className="bg-black/95 p-3 text-right text-white font-mono">
        <div className="h-5 text-xs text-muted-foreground truncate">{equation}</div>
        <div className="text-2xl font-bold truncate mt-1">{display}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-0.5 bg-border p-0.5">
        {buttons.flat().map((btn) => {
          const isOperator = ["/", "*", "-", "+", "="].includes(btn);
          const isAction = ["C", "CE", "%"].includes(btn);
          const isDouble = btn === "0";
          const isTriple = btn === "=";

          let btnClass = "bg-white hover:bg-accent text-foreground text-sm font-semibold h-11 transition-colors flex items-center justify-center";
          if (isOperator) {
            btnClass = "bg-primary text-primary-foreground hover:bg-primary/95 text-sm font-semibold h-11 transition-colors flex items-center justify-center";
          } else if (isAction) {
            btnClass = "bg-secondary hover:bg-accent text-foreground text-sm font-semibold h-11 transition-colors flex items-center justify-center";
          }

          if (isDouble) {
            btnClass += " col-span-2";
          }

          const handleClick = () => {
            if (btn === "C" || btn === "CE") handleClear();
            else if (btn === "=") handleCalculate();
            else if (["/", "*", "-", "+"].includes(btn)) handleOperator(btn);
            else handleDigit(btn);
          };

          return (
            <button key={btn} type="button" onClick={handleClick} className={btnClass}>
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}

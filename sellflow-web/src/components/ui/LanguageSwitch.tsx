import { Check, ChevronDown, Languages } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { useLanguage, type Language } from "../../i18n/LanguageContext";

const options: Array<{ value: Language; label: string; short: string }> = [
  { value: "en", label: "English", short: "EN" },
  { value: "km", label: "ខ្មែរ", short: "ខ្មែរ" },
];

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeOption = options.find((option) => option.value === language) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectLanguage = (value: Language) => {
    setLanguage(value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <motion.button
        ref={triggerRef}
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((value) => !value)}
        aria-label="Switch language"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className={`inline-flex h-6 items-center justify-center gap-1.5 rounded-lg border border-[#e4dfea] bg-white/85 font-semibold text-[#655d6d] shadow-[0_8px_20px_-16px_rgba(65,45,95,.55)] backdrop-blur-sm transition-[color,background-color,border-color] duration-150 hover:border-[#d5ccec] hover:bg-white hover:text-[#5f43c2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7557e8]/35 ${compact ? "min-w-[68px] px-2.5 text-[10px]" : "min-w-[112px] px-3 text-xs"}`}
      >
        <Languages className="h-3.5 w-3.5 text-[#7557e8]" strokeWidth={1.8} aria-hidden="true" />
        <span>{compact ? activeOption.short : activeOption.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#8a8192] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Choose language"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute top-full z-[70] mt-2 min-w-8 overflow-hidden rounded-lg border border-[#e8e2ee] bg-white p-1.5 shadow-[0_18px_45px_-20px_rgba(48,30,75,.45)] ${compact ? "right-0" : "left-0"}`}
          >
            {options.map((option) => {
              const active = language === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => selectLanguage(option.value)}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-2 py-2 text-left text-xs font-semibold transition-[color,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7557e8]/35 ${active ? "bg-[#f2edff] text-[#6549d3]" : "text-[#6f6876] hover:bg-[#f8f5fb] hover:text-[#5f43c2]"}`}
                >
                  <span>{option.label}</span>
                  <Check className={`h-3.5 w-3.5 ${active ? "opacity-100" : "opacity-0"}`} strokeWidth={2} aria-hidden="true" />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

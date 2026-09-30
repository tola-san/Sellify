import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useId } from "react";
import { useLanguage, type Language } from "../../i18n/LanguageContext";

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const switchId = useId();
  const options: Array<{ value: Language; label: string; short: string }> = [
    { value: "en", label: "English", short: "EN" },
    { value: "km", label: "ខ្មែរ", short: "ខ្មែរ" },
  ];

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-[#e4dfea] bg-white/85 p-1 shadow-[0_8px_20px_-16px_rgba(65,45,95,.55)]" role="group" aria-label="Switch language">
      {!compact && <Languages className="ml-1 h-3.5 w-3.5 text-[#7557e8]" strokeWidth={1.8} />}
      {options.map((option) => {
        const active = language === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setLanguage(option.value)}
            aria-pressed={active}
            aria-label={`Use ${option.label}`}
            className={`relative isolate rounded-md px-2.5 py-1.5 text-[10px] font-semibold transition-[color] duration-150 ${active ? "text-white" : "text-[#766f7c] hover:text-[#5f43c2]"}`}
          >
            {active && <motion.span layoutId={`language-switch-${switchId}`} className="absolute inset-0 -z-10 rounded-md bg-[#7557e8] shadow-sm" transition={{ type: "spring", duration: 0.3, bounce: 0 }} />}
            {option.short}
          </motion.button>
        );
      })}
    </div>
  );
}

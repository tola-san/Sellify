import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bug, CircleHelp, CreditCard, Lightbulb, LoaderCircle, Send, UserRound, X } from "lucide-react";
import { issueReportService, type IssueType } from "../../Services/issueReports";
import { useToast } from "../ui/ToastContext";

const issueTypes: Array<{ value: IssueType; label: string; icon: typeof Bug }> = [
  { value: "bug", label: "Bug", icon: Bug },
  { value: "account", label: "Account", icon: UserRound },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "feature_request", label: "Idea", icon: Lightbulb },
  { value: "other", label: "Other", icon: CircleHelp },
];

interface IssueReportModalProps {
  open: boolean;
  onClose: () => void;
}

export function IssueReportModal({ open, onClose }: IssueReportModalProps) {
  const { showToast } = useToast();
  const [type, setType] = useState<IssueType>("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, submitting]);

  const close = () => {
    if (!submitting) onClose();
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await issueReportService.create({
        type,
        title: title.trim(),
        description: description.trim(),
        page_url: window.location.href,
      });
      setType("bug");
      setTitle("");
      setDescription("");
      onClose();
      showToast("Thanks — your report was sent to the Sellflow team.");
    } catch {
      setError("We couldn’t send your report. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-end bg-slate-950/45 p-0 backdrop-blur-[2px] sm:place-items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="issue-report-title"
            className="w-full max-w-xl overflow-hidden rounded-t-3xl border border-white/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24),0_8px_24px_rgba(15,23,42,0.12)] sm:rounded-3xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex min-w-0 items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-100 text-purple-700">
                  <CircleHelp size={20} strokeWidth={2} />
                </span>
                <div>
                  <h2 id="issue-report-title" className="text-base font-bold text-slate-950">Report an issue</h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Tell us what happened and we’ll use the page details to investigate.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                disabled={submitting}
                className="rounded-xl p-2 text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-700 active:scale-[0.96] disabled:opacity-50"
                aria-label="Close report form"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
              <fieldset>
                <legend className="text-xs font-semibold text-slate-700">What can we help with?</legend>
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {issueTypes.map((option) => {
                    const Icon = option.icon;
                    const selected = type === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setType(option.value)}
                        aria-pressed={selected}
                        className={`flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-[11px] font-semibold transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.96] ${
                          selected
                            ? "border-purple-300 bg-purple-50 text-purple-700"
                            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                        }`}
                      >
                        <Icon size={17} strokeWidth={selected ? 2 : 1.5} />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="block">
                <span className="text-xs font-semibold text-slate-700">Short summary</span>
                <input
                  autoFocus
                  required
                  maxLength={120}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: Orders page is not updating"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
                <span className="mt-1 block text-right text-[10px] text-slate-400">{title.length}/120</span>
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-slate-700">What happened?</span>
                <textarea
                  required
                  maxLength={5000}
                  rows={5}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe what you expected, what happened instead, and any steps that help us reproduce it."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </label>

              {error && (
                <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs leading-5 text-rose-700">
                  {error}
                </div>
              )}

              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] leading-4 text-slate-400">Your current dashboard page is included automatically.</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={close}
                    disabled={submitting}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-[color,background-color,transform] duration-150 hover:bg-slate-50 active:scale-[0.96] disabled:opacity-50 sm:flex-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !title.trim() || !description.trim()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-slate-800 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                  >
                    {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
                    {submitting ? "Sending..." : "Send report"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

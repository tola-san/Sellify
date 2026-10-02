import { ArrowRight, Mail, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandLogo } from "./ui/BrandLogo";
import { useLanguage } from "../i18n/LanguageContext";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="overflow-hidden bg-[#17131f] text-white">
      <div className="relative px-5 pb-8 pt-16 sm:px-8 lg:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[#7557e8]/15 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(135deg,#292039_0%,#21182f_52%,#302150_100%)] px-6 py-8 shadow-[0_30px_80px_-45px_rgba(117,87,232,.65)] sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-12">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10 bg-[#8e72ff]/15" />
            <div className="pointer-events-none absolute -bottom-28 right-24 h-56 w-56 rounded-full border border-white/[0.07]" />
            <div className="relative max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#cfc3ff]">
                <Sparkles className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
                {t("Your first 30 days are on us")}
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-.045em] text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08]">{t("Put your store online and start taking orders.")}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#c5bdcc]">{t("Launch a branded storefront, share your link, and manage customer orders from one simple workspace.")}</p>
            </div>
            <Link
              to="/register"
              className="group relative mt-7 inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-xs font-semibold text-[#5637bc] shadow-[0_16px_35px_-18px_rgba(0,0,0,.65)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#f7f4ff] active:scale-[.96] lg:mt-0"
            >
              {t("Start 30-day free trial")}
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-10 py-12 md:grid-cols-12 md:gap-8 lg:py-14">
            <div className="md:col-span-5">
              <Link to="/" aria-label="Selltify home" className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9c85ff]">
                <BrandLogo markClassName="h-8 w-8" wordmarkClassName="text-lg !text-white" />
              </Link>
              <p className="mt-5 max-w-sm text-xs leading-6 text-[#a9a1b1]">{t("Storefront, orders, inventory, and Telegram workflows for modern local businesses.")}</p>
            </div>

            <nav className="md:col-span-3" aria-label="Footer navigation">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#8f849a]">{t("Explore")}</p>
              <ul className="mt-5 space-y-3.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="inline-flex text-xs font-medium text-[#cbc5d1] transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-white">
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#8f849a]">{t("Contact")}</p>
              <div className="mt-5 space-y-2.5">
                <a href="mailto:tolasan369369@gmail.com" className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 transition-[border-color,background-color] duration-150 hover:border-white/15 hover:bg-white/[0.065]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#7557e8]/15 text-[#aa95ff]">
                    <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[10px] text-[#918899]">{t("Email us")}</span>
                    <span className="mt-0.5 block text-xs font-medium text-[#ddd8e2] group-hover:text-white">tolasan369369@gmail.com</span>
                  </span>
                </a>
                <a href="https://t.me/tolasannn" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 transition-[border-color,background-color] duration-150 hover:border-white/15 hover:bg-white/[0.065]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#229ed9]/15 text-[#62bce5]">
                    <Send className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[10px] text-[#918899]">{t("Message on Telegram")}</span>
                    <span className="mt-0.5 block text-xs font-medium text-[#ddd8e2] group-hover:text-white">@tolasannn</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/[0.08] py-6 text-[10px] text-[#817987] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Selltify. {t("All rights reserved.")}</p>
            <p>{t("Built for modern businesses in Cambodia.")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

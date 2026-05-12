"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, Bell } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "./CTAButton";

export function EmailCaptureModal({
  open,
  onClose,
  featureLabel,
}: {
  open: boolean;
  onClose: () => void;
  featureLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setEmail("");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setError("Enter a valid email so we can reach you.");
      return;
    }
    setError(null);
    setSubmitted(true);
    /* TODO: USER — Wire to your email provider (Klaviyo, ConvertKit, etc.). */
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/85 backdrop-blur-2xl"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Notify me about ${featureLabel}`}
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="relative w-full max-w-md rounded-bezel bg-white/[0.03] p-1.5 ring-1 ring-border-strong"
          >
            <div className="relative overflow-hidden rounded-bezel-inner bg-bg-secondary p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-border-strong transition-colors hover:bg-white/[0.06]"
              >
                <X size={16} weight="bold" />
              </button>

              {!submitted ? (
                <>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-primary/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                    <Bell size={12} weight="fill" />
                    Coming Soon
                  </span>
                  <h2 className="mt-5 font-display text-3xl uppercase tracking-wider">
                    Get notified
                  </h2>
                  <p className="mt-3 text-sm text-text-secondary">
                    Be the first when{" "}
                    <span className="text-text-primary">{featureLabel}</span> drops.
                  </p>

                  <form onSubmit={submit} className="mt-6 flex flex-col gap-3" noValidate>
                    <label
                      htmlFor="notify-email"
                      className="font-mono text-[10px] uppercase tracking-widest text-text-muted"
                    >
                      Email
                    </label>
                    <input
                      id="notify-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@somewhere.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full border border-border-strong bg-bg-primary/60 px-5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-silver focus:outline-none"
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? "notify-error" : undefined}
                    />
                    {error && (
                      <p id="notify-error" className="text-xs text-accent-ice">
                        {error}
                      </p>
                    )}
                    <div className="mt-2 flex justify-end">
                      <CTAButton type="submit" variant="primary">
                        Notify me
                      </CTAButton>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-start gap-4 py-6">
                  <CheckCircle size={40} weight="duotone" className="text-accent-silver" />
                  <h2 className="font-display text-3xl uppercase tracking-wider">
                    You&rsquo;re on the list.
                  </h2>
                  <p className="text-sm text-text-secondary">
                    We&rsquo;ll reach out the second {featureLabel} goes live.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

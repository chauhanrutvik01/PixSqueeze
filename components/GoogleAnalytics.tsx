"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-X41PQEBBDC";
const CONSENT_STORAGE_KEY = "pixsqueeze-analytics-consent";
const OPEN_CONSENT_EVENT = "pixsqueeze:open-analytics-settings";

type ConsentChoice = "accepted" | "declined" | null;

export function GoogleAnalytics() {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (savedChoice === "accepted" || savedChoice === "declined") {
        setChoice(savedChoice);
      }
    } catch {
      // Keep analytics off when browser storage is unavailable.
    }

    const openSettings = () => setChoice(null);
    window.addEventListener(OPEN_CONSENT_EVENT, openSettings);
    setReady(true);

    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openSettings);
  }, []);

  function saveChoice(nextChoice: Exclude<ConsentChoice, null>) {
    const analyticsIsLoaded = Boolean(
      document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`),
    );

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    } catch {
      // The in-memory choice still applies for the current page.
    }
    setChoice(nextChoice);

    if (nextChoice === "declined" && analyticsIsLoaded) {
      window.location.reload();
    }
  }

  return (
    <>
      {ready && choice === "accepted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="pixsqueeze-google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}

      {ready && choice === null ? (
        <section
          aria-labelledby="analytics-consent-title"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-line bg-white p-5 shadow-2xl sm:p-6"
          role="dialog"
        >
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 id="analytics-consent-title" className="text-base font-extrabold text-ink">
                Optional analytics
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Help us understand which tools are useful. Google Analytics loads only if you allow it, and your images are never sent.
                {" "}<Link className="font-bold text-moss underline" href="/privacy-policy">Privacy policy</Link>
              </p>
            </div>
            <div className="flex flex-col-reverse gap-2 min-[420px]:flex-row sm:justify-end">
              <button
                className="rounded-xl border border-line px-4 py-2.5 text-sm font-extrabold text-slate-600 transition hover:border-moss hover:text-moss"
                onClick={() => saveChoice("declined")}
                type="button"
              >
                Decline
              </button>
              <button
                className="rounded-xl bg-ink px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-moss"
                onClick={() => saveChoice("accepted")}
                type="button"
              >
                Allow analytics
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function AnalyticsSettingsButton() {
  return (
    <button
      className="text-left hover:text-moss"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      type="button"
    >
      Analytics settings
    </button>
  );
}

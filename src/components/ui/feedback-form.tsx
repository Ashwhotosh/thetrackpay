import { useState, type FormEvent } from "react";

const WEBHOOK_URL = import.meta.env.VITE_SHEET_WEBHOOK_URL as string | undefined;
const FALLBACK_EMAIL = "founder@thetrackpay.com";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  q1: string[];
  q1Other: string;
  q2: string[];
  q2Other: string;
  q3: string[];
  q3Other: string;
  q4: string;
  q5: string;
  q6: string[];
  q7: string[];
  q8: string;
  q9: string[];
  q9Other: string;
  q10: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
  q16: string;
}

const initialState: FormState = {
  q1: [],
  q1Other: "",
  q2: [],
  q2Other: "",
  q3: [],
  q3Other: "",
  q4: "",
  q5: "",
  q6: [],
  q7: [],
  q8: "",
  q9: [],
  q9Other: "",
  q10: "",
  q12: "",
  q13: "",
  q14: "",
  q15: "",
  q16: "",
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 mt-14 first:mt-0 border-b border-white/10 pb-2 text-sm font-semibold uppercase tracking-wider text-indigo-400">
      {children}
    </div>
  );
}

function Question({
  n,
  label,
  required,
  children,
}: {
  n: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <label className="mb-3 block text-sm font-medium text-neutral-200">
        <span className="text-neutral-500">{n}.</span> {label}
        {required && <span className="ml-1 text-indigo-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const checkboxCls =
  "flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-neutral-300 transition-colors hover:border-indigo-400/40 has-[:checked]:border-indigo-400/60 has-[:checked]:bg-indigo-500/10 has-[:checked]:text-white";

function CheckboxGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => (
        <label key={opt} className={checkboxCls}>
          <input
            type="checkbox"
            className="h-4 w-4 accent-indigo-500"
            checked={value.includes(opt)}
            onChange={() => onChange(toggleValue(value, opt))}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => (
        <label key={opt} className={checkboxCls}>
          <input
            type="radio"
            name={name}
            className="h-4 w-4 accent-indigo-500"
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-indigo-400/60";

function OtherInput({
  checked,
  value,
  onChange,
}: {
  checked: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  if (!checked) return null;
  return (
    <input
      type="text"
      className={`${inputCls} mt-2`}
      placeholder="Please specify"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default function FeedbackForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const isValid =
    form.q1.length > 0 &&
    form.q6.length > 0 &&
    form.q12 !== "" &&
    form.q13 !== "" &&
    form.q15 !== "" &&
    (form.q15 !== "Yes, sign me up" || form.q16.trim() !== "");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid || !WEBHOOK_URL) return;

    setStatus("submitting");

    const payload = {
      q1: form.q1.includes("Other") ? [...form.q1.filter((v) => v !== "Other"), `Other: ${form.q1Other}`] : form.q1,
      q2: form.q2.includes("Other") ? [...form.q2.filter((v) => v !== "Other"), `Other: ${form.q2Other}`] : form.q2,
      q3: form.q3.includes("Other") ? [...form.q3.filter((v) => v !== "Other"), `Other: ${form.q3Other}`] : form.q3,
      q4: form.q4,
      q5: form.q5,
      q6: form.q6,
      q7: form.q7,
      q8: form.q8,
      q9: form.q9.includes("Other") ? [...form.q9.filter((v) => v !== "Other"), `Other: ${form.q9Other}`] : form.q9,
      q10: form.q10,
      q12: form.q12,
      q13: form.q13,
      q14: form.q14,
      q15: form.q15,
      q16: form.q16,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-10 text-center">
        <h3 className="mb-2 text-xl font-semibold text-white">Thanks for the feedback! 🙏</h3>
        <p className="text-neutral-400">
          Your response has been recorded. It genuinely shapes what we build next.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-3xl border border-white/5 bg-neutral-900/40 p-6 md:p-10"
    >
      <SectionLabel>Your UPI &amp; Finance App Usage</SectionLabel>

      <Question n="Q1" label="Which UPI app(s) do you use daily and have on your phone?" required>
        <CheckboxGroup
          options={["Google Pay", "PhonePe", "Paytm", "Amazon Pay", "BHIM", "WhatsApp Pay", "Jupiter", "Cred", "Other"]}
          value={form.q1}
          onChange={(v) => set("q1", v)}
        />
        <OtherInput checked={form.q1.includes("Other")} value={form.q1Other} onChange={(v) => set("q1Other", v)} />
      </Question>

      <Question n="Q2" label="Why do you use these UPI app(s)?">
        <CheckboxGroup
          options={[
            "Convenience / speed",
            "Cashback or rewards",
            "Already used by friends & family",
            "Trusted / feels secure",
            "Bill payments & recharges",
            "It's the only option the merchant accepts",
            "Better UI/experience",
            "Other",
          ]}
          value={form.q2}
          onChange={(v) => set("q2", v)}
        />
        <OtherInput checked={form.q2.includes("Other")} value={form.q2Other} onChange={(v) => set("q2Other", v)} />
      </Question>

      <Question n="Q3" label="What problems do you face with UPI payments or other finance apps?">
        <CheckboxGroup
          options={[
            "Transaction failures / delays",
            "No proper expense tracking",
            "Poor customer support",
            "Too many apps needed for different things (payments, taxes, investing)",
            "Security or privacy concerns",
            "Hidden fees or charges",
            "Notifications/spam overload",
            "No problems, it works fine",
            "Other",
          ]}
          value={form.q3}
          onChange={(v) => set("q3", v)}
        />
        <OtherInput checked={form.q3.includes("Other")} value={form.q3Other} onChange={(v) => set("q3Other", v)} />
      </Question>

      <SectionLabel>Current Problems</SectionLabel>

      <Question n="Q4" label="Do you find it difficult to track shared/family expenses (rent split, group payments)?">
        <RadioGroup name="q4" options={["Yes", "No"]} value={form.q4} onChange={(v) => set("q4", v)} />
      </Question>

      <Question
        n="Q5"
        label="Have you ever missed a tax deduction or filed incorrectly because you didn't track expenses properly?"
      >
        <RadioGroup name="q5" options={["Yes", "No", "Not sure"]} value={form.q5} onChange={(v) => set("q5", v)} />
      </Question>

      <SectionLabel>About TrackPay</SectionLabel>

      <Question n="Q6" label="Which of these features would you actually use?" required>
        <CheckboxGroup
          options={[
            "Artha AI: personal AI financial advisor (investment advice, SIP advisor, tax planner, and more)",
            "Automatic tax filing assistant (auto-reconciles Form 16, AIS, 26AS)",
            "Smart nudges for idle balance (e.g. \"move this to a mutual fund\")",
            "UPI Family Circle (shared tracking for family/roommates)",
            "All-in-one dashboard for expenses + investments",
            "None of these interest me",
          ]}
          value={form.q6}
          onChange={(v) => set("q6", v)}
        />
      </Question>

      <Question n="Q7" label="Which of Artha AI's advisory areas matter most to you?">
        <CheckboxGroup
          options={[
            "Investment advice",
            "SIP / mutual fund advisor",
            "Tax planning",
            "General financial planning",
            "None of these matter to me",
          ]}
          value={form.q7}
          onChange={(v) => set("q7", v)}
        />
      </Question>

      <Question n="Q8" label="Would you trust an AI to suggest where to put your idle money (e.g. savings vs mutual funds)?">
        <RadioGroup
          name="q8"
          options={["Yes", "No", "Only with human confirmation before any action"]}
          value={form.q8}
          onChange={(v) => set("q8", v)}
        />
      </Question>

      <SectionLabel>Competitors</SectionLabel>

      <Question n="Q9" label="Which apps do you currently use for payments and finance tracking?">
        <CheckboxGroup
          options={["Google Pay", "PhonePe", "Paytm", "Jupiter", "Cred", "Groww / Zerodha", "ClearTax", "Other"]}
          value={form.q9}
          onChange={(v) => set("q9", v)}
        />
        <OtherInput checked={form.q9.includes("Other")} value={form.q9Other} onChange={(v) => set("q9Other", v)} />
      </Question>

      <Question n="Q10" label="What's one thing you wish your current finance app did better?">
        <textarea
          className={`${inputCls} min-h-24 resize-y`}
          value={form.q10}
          onChange={(e) => set("q10", e.target.value)}
        />
      </Question>

      <SectionLabel>After Watching the Demo</SectionLabel>

      <Question n="Q12" label="How likely are you to use TrackPay once it launches? (1 = Not likely, 5 = Very likely)" required>
        <div className="flex gap-2">
          {["1", "2", "3", "4", "5"].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => set("q12", n)}
              className={`flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                form.q12 === n
                  ? "border-indigo-400/60 bg-indigo-500/20 text-white"
                  : "border-white/10 bg-white/[0.03] text-neutral-400 hover:border-indigo-400/40"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Question>

      <Question n="Q13" label="What was your first impression of the app?" required>
        <RadioGroup
          name="q13"
          options={[
            "Looks promising, would try it",
            "Interesting but need to see more",
            "Not sure it solves a real problem for me",
            "Confusing, not clear what it does",
          ]}
          value={form.q13}
          onChange={(v) => set("q13", v)}
        />
      </Question>

      <Question n="Q14" label="Is there any feature you'd want us to add that we haven't mentioned?">
        <textarea
          className={`${inputCls} min-h-24 resize-y`}
          value={form.q14}
          onChange={(e) => set("q14", e.target.value)}
        />
      </Question>

      <Question n="Q15" label="Would you like early access when we launch the MVP?" required>
        <RadioGroup
          name="q15"
          options={["Yes, sign me up", "No, not right now"]}
          value={form.q15}
          onChange={(v) => set("q15", v)}
        />
      </Question>

      {form.q15 === "Yes, sign me up" && (
        <Question n="Q16" label="Enter your email for early access" required>
          <input
            type="email"
            required
            className={inputCls}
            value={form.q16}
            onChange={(e) => set("q16", e.target.value)}
            placeholder="you@example.com"
          />
        </Question>
      )}

      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          type="submit"
          disabled={!isValid || status === "submitting" || !WEBHOOK_URL}
          className="w-full max-w-xs rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
        >
          {status === "submitting" ? "Submitting…" : "Submit feedback"}
        </button>

        {!WEBHOOK_URL && (
          <p className="text-xs text-amber-400/80">
            Form submission isn't configured yet (missing VITE_SHEET_WEBHOOK_URL).
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">
            Something went wrong. Please try again, or email us at{" "}
            <a href={`mailto:${FALLBACK_EMAIL}`} className="underline">
              {FALLBACK_EMAIL}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

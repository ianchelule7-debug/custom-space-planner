import { Field, inputClass } from "@/components/enquiry/Field";
import { OptionChips } from "@/components/enquiry/OptionChips";
import { CONTACT_METHODS } from "@/lib/constants";
import type { DetailsErrors } from "@/lib/validation";
import type { EnquiryStore } from "@/lib/useEnquiry";

interface Props {
  store: EnquiryStore;
  errors: DetailsErrors;
}

export function CustomerDetails({ store, errors }: Props) {
  const { enquiry, setField } = store;

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl text-foreground">A little about you</h2>
        <p className="text-muted-foreground">So we know who we're designing for.</p>
      </header>

      <div className="space-y-6">
        <Field id="name" label="Full name" error={errors.name}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              value={enquiry.name}
              onChange={(e) => setField("name", e.target.value)}
              className={inputClass(errors.name)}
              placeholder="Your name"
            />
          )}
        </Field>

        <Field id="phone" label="Phone number" error={errors.phone}>
          {(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={enquiry.phone}
              onChange={(e) => setField("phone", e.target.value)}
              className={inputClass(errors.phone)}
              placeholder="07XX XXX XXX"
            />
          )}
        </Field>

        <Field id="email" label="Email address" optional error={errors.email}>
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              value={enquiry.email ?? ""}
              onChange={(e) => setField("email", e.target.value)}
              className={inputClass(errors.email)}
              placeholder="you@example.com"
            />
          )}
        </Field>

        <OptionChips
          legend="Preferred contact method"
          options={CONTACT_METHODS}
          value={enquiry.preferred_contact_method}
          onChange={(v) => setField("preferred_contact_method", v)}
          hint="How would you like us to reach you?"
        />
      </div>
    </section>
  );
}
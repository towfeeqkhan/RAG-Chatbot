import { ArrowIcon, CheckIcon } from "./icons";
import SectionIntro from "./section-intro";

const plans = [
  {
    name: "Pay-as-you-go",
    description: "For occasional public charging.",
    monthly: "$0",
    annual: "No annual plan",
    levelTwo: "$0.34",
    fast: "$0.52",
    grace: "10 min idle grace",
    reserve: "No charger reservations",
    support: "Standard support",
    cta: "Start charging",
  },
  {
    name: "Voltway Plus",
    description: "Everyday rates for regular drivers.",
    monthly: "$9.99",
    annual: "$99 billed annually",
    levelTwo: "$0.26",
    fast: "$0.42",
    grace: "10 min idle grace",
    reserve: "No charger reservations",
    support: "Standard support",
    cta: "Start 30-day trial",
    popular: true,
  },
  {
    name: "Voltway Pro",
    description: "The lowest rates and priority access.",
    monthly: "$24.99",
    annual: "$249 billed annually",
    levelTwo: "$0.20",
    fast: "$0.36",
    grace: "20 min idle grace",
    reserve: "Reserve up to 30 min ahead",
    support: "Priority 24/7 phone support",
    cta: "Choose Voltway Pro",
  },
];

export default function PricingSection() {
  return (
    <section className="pricingSection section" id="pricing">
      <div className="pageContainer">
        <SectionIntro
          index="03"
          eyebrow="Public Network Pricing"
          title="Honest pricing. No peak-hour surges."
          description="Pay the same rate at 2pm or 2am across all 9 US states. Start with 30 days of Voltway Plus free—no card required."
        />

        <div className="pricingGrid">
          {plans.map((plan) => (
            <article
              className={`planCard${plan.popular ? " featuredPlan" : ""}`}
              key={plan.name}
            >
              {plan.popular && <div className="popularFlag">Most popular</div>}
              <div className="planHeader">
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>
              <div className="monthlyPrice">
                <strong>{plan.monthly}</strong>
                <span>/ month</span>
              </div>
              <p className="annualPrice">{plan.annual}</p>
              <div className="ratePair">
                <div>
                  <span>Level 2</span>
                  <strong>{plan.levelTwo}</strong>
                  <small>/ kWh</small>
                </div>
                <div>
                  <span>DC fast</span>
                  <strong>{plan.fast}</strong>
                  <small>/ kWh</small>
                </div>
              </div>
              <div className="planFeatures">
                <p>
                  <CheckIcon /> {plan.grace}
                </p>
                <p>
                  <CheckIcon /> {plan.reserve}
                </p>
                <p>
                  <CheckIcon /> {plan.support}
                </p>
              </div>
              <a
                className={`button ${
                  plan.popular ? "buttonPrimary" : "buttonSecondary"
                } planButton`}
                href="#footer"
              >
                {plan.cta}
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
        <p className="pricingFootnote">
          Rates apply in all US states. Idle fees ($0.40 per minute, $20 max per
          session) apply only after the grace period when other drivers are
          waiting. Cancel anytime in the app.
        </p>
      </div>
    </section>
  );
}

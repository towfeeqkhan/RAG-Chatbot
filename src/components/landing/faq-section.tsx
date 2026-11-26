import SectionIntro from "./section-intro";

const faqs = [
  {
    question: "Is Voltway compatible with Tesla?",
    answer:
      "Yes. Voltway Fast stations include native NACS connectors, and Home Pro 2 ships with a free NACS adapter. Home Lite and Voltway Go work with our $49 NACS adapter.",
  },
  {
    question: "Do I need a subscription to use public stations?",
    answer:
      "No. Pay-as-you-go works at every Voltway station with no monthly fee.",
  },
  {
    question: "Can I charge in the rain?",
    answer:
      "Yes. Every Voltway charger is weatherproof and built for outdoor use.",
  },
  {
    question: "Does Home Pro 2 work with home solar?",
    answer:
      "Yes. Home Pro 2 supports solar-aware charging through the Voltway app with select Enphase and SolarEdge inverters.",
  },
  {
    question: "What if I change my mind after buying hardware?",
    answer:
      "Return any charger within 30 days of delivery for a full refund with a prepaid label and no restocking fee, even if you have used it.",
  },
  {
    question: "Can I host Voltway chargers at my business?",
    answer:
      "Yes. Voltway for Business offers hosted stations for property owners. Reach us at business@voltway.example.",
  },
];

export default function FaqSection() {
  return (
    <section className="faqSection section" id="support">
      <div className="pageContainer">
        <SectionIntro
          index="05"
          eyebrow="Support"
          title="Answers before you plug in."
          description="Straightforward details about compatibility, subscriptions, weather, solar, returns, and hosting."
        />
        <div className="faqGrid">
          {faqs.map((faq, index) => (
            <article className="faqItem" key={faq.question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

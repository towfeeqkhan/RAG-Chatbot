import { ArrowIcon } from "./icons";

export default function ClosingSection() {
  return (
    <section className="closingSection">
      <div className="pageContainer closingInner">
        <p>One network. Home to highway.</p>
        <h2>Ready when your EV is.</h2>
        <a className="button closingButton" href="#pricing">
          Try Voltway Plus free for 30 days
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

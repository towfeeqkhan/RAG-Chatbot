import { ArrowIcon } from "./icons";

export default function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="headerInner">
        <a className="wordmark" href="#top" aria-label="Voltway home">
          voltway<span>.</span>
        </a>
        <nav className="mainNav" aria-label="Primary navigation">
          <a href="#hardware">Home Chargers</a>
          <a href="#network">Public Network</a>
          <a href="#pricing">Pricing</a>
          <a href="#installation">Installation</a>
          <a href="#support">Support</a>
        </nav>
        <a className="headerCta" href="#pricing">
          Start 30-day trial
          <ArrowIcon />
        </a>
      </div>
    </header>
  );
}

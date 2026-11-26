import { ArrowIcon, CheckIcon } from "./icons";

export default function InstallationSection() {
  return (
    <section className="installationSection section" id="installation">
      <div className="pageContainer installationLayout">
        <div className="installationPitch">
          <div className="sectionKicker lightKicker">
            <span>04</span>
            <p>Installation</p>
          </div>
          <h2>Pro installation for one flat price.</h2>
          <p>
            Our Certified Installer Network connects you with about 1,100
            licensed electricians across 9 US states. Most installs are
            scheduled within 5 to 10 business days.
          </p>
          <div className="installTiming">
            <div>
              <strong>5–10</strong>
              <span>business days to schedule</span>
            </div>
            <div>
              <strong>2–3</strong>
              <span>hours for most installs</span>
            </div>
          </div>
        </div>

        <div className="installationCard">
          <div className="installPrice">
            <span>Certified installation</span>
            <strong>
              <sup>$</sup>199
            </strong>
            <p>flat · before permits</p>
          </div>
          <div className="includedBlock">
            <span className="miniLabel">What is included</span>
            <div className="includedGrid">
              <p>
                <CheckIcon /> Charger mounting
              </p>
              <p>
                <CheckIcon /> Wiring up to 25 feet
              </p>
              <p>
                <CheckIcon /> Full commissioning
              </p>
              <p>
                <CheckIcon /> Licensed electrician
              </p>
            </div>
          </div>
          <div className="exclusionsBlock">
            <span className="miniLabel">Quoted separately if needed</span>
            <p>
              City permits, panel upgrades, trenching, and cable runs beyond 25
              feet ($6 per additional foot).
            </p>
          </div>
          <a className="button installButton" href="#footer">
            Check installation availability
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

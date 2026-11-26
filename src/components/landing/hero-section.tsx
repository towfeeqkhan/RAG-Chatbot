import Image from "next/image";
import { ArrowIcon } from "./icons";

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="heroIntro pageContainer">
        <div className="heroCopy">
          <div className="eyebrow">
            <span className="liveDot" />
            2,400 stations · 11,800 ports · 98.2% uptime
          </div>
          <h1 id="hero-title">
            Charge anywhere.
            <span>Go everywhere.</span>
          </h1>
        </div>
        <div className="heroAside">
          <p>
            Make owning an EV as easy as owning a phone: plug in at home, top up
            on the road, and never think about it.
          </p>
          <div className="heroActions">
            <a className="button buttonPrimary" href="#pricing">
              Try Voltway Plus free
              <ArrowIcon />
            </a>
            <a className="button buttonSecondary" href="#hardware">
              Compare home chargers
            </a>
          </div>
          <p className="microcopy">
            No card needed for the trial. Cancel anytime in the app.
          </p>
        </div>
      </div>

      <div className="heroMedia pageContainer">
        <div className="heroImageFrame">
          <Image
            src="/Public Charging Canopy.png"
            alt="An electric vehicle charging at a Voltway canopy at dusk"
            fill
            priority
            sizes="(max-width: 1248px) 100vw, 1200px"
          />
          <div className="heroImageShade" />
          <div className="stationLabel">
            <span className="stationMarker">
              <span />
            </span>
            <div>
              <strong>Mueller Central</strong>
              <p>Austin, TX · Station 0418</p>
            </div>
          </div>
          <div className="availabilityCard">
            <span>Live availability</span>
            <strong>
              <i /> 12 ports available
            </strong>
            <p>Updated just now</p>
          </div>
        </div>
      </div>
    </section>
  );
}

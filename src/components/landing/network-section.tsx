import Image from "next/image";
import SectionIntro from "./section-intro";

const networkFeatures = [
  {
    number: "01",
    title: "NACS & CCS1 native",
    text: "Voltway Fast 150 and Fast 350 stations support both connectors out of the box.",
  },
  {
    number: "02",
    title: "Plug-and-Charge",
    text: "Supported on most 2022 and newer EVs, with card, RFID, and app payments always available.",
  },
  {
    number: "03",
    title: "Live availability",
    text: "The Voltway app refreshes stall status every 30 seconds and makes issue reporting a one-tap job.",
  },
];

export default function NetworkSection() {
  return (
    <section className="networkSection section" id="network">
      <div className="pageContainer">
        <SectionIntro
          index="02"
          eyebrow="Public Network"
          title="Chargers that work when you pull up."
          description="2,400 stations and 11,800 ports across 9 US states, Vancouver, and Toronto—open around the clock where your day already takes you."
        />

        <div className="networkLayout">
          <div className="networkPhoto productImage">
            <Image
              src="/Golden-hour DC fast-charging plaza.png"
              alt="A white electric vehicle charging at a Voltway fast-charging plaza"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
            <div className="networkPhotoMeta">
              <div>
                <span>Fast 350</span>
                <strong>10% → 80%</strong>
              </div>
              <p>about 25 min</p>
            </div>
          </div>
          <div className="networkFeatures">
            {networkFeatures.map((feature) => (
              <article className="networkFeature" key={feature.number}>
                <span>{feature.number}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
            <div className="networkCoverage">
              <div>
                <span>DC fast ports</span>
                <strong>6,200</strong>
              </div>
              <div>
                <span>Target fix time</span>
                <strong>48 hrs</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

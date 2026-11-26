import Image from "next/image";
import { ArrowIcon, CheckIcon } from "./icons";
import SectionIntro from "./section-intro";

const homeProSpecs = [
  "11.5 kW max output on a 60-amp breaker",
  "Adds about 37 miles of range per hour",
  "24 ft cable with J1772 connector and NACS adapter",
  "Wi-Fi, Bluetooth, load sharing, and solar-aware charging",
  "NEMA 4 rated, UL listed, and Energy Star certified",
  "5-year parts and labor warranty",
];

const homeLiteSpecs = [
  "7.7 kW max output on a 40-amp breaker",
  "Adds about 25 miles of range per hour",
  "18 ft cable with J1772 connector",
  "Wi-Fi scheduling and Voltway app control",
  "NEMA 3R rated with a 3-year warranty",
];

const goSpecs = [
  "7.7 kW at 240V or 1.4 kW at 120V",
  "NEMA 5-15 and 14-50 adapters included",
  "20 ft cable with J1772 connector",
  "Built-in LCD controls with no Wi-Fi required",
  "IP66 weatherproof, 8 lbs, 2-year warranty",
];

function ProductSpecs({
  specs,
  className,
}: {
  specs: string[];
  className: string;
}) {
  return (
    <div className={className}>
      {specs.map((spec) => (
        <div className="specItem" key={spec}>
          <CheckIcon />
          <span>{spec}</span>
        </div>
      ))}
    </div>
  );
}

export default function HardwareSection() {
  return (
    <section className="hardwareSection section" id="hardware">
      <div className="pageContainer">
        <SectionIntro
          index="01"
          eyebrow="Hardware"
          title="Built for your garage—and your trunk."
          description="Every Voltway charger is weatherproof, backed by a straightforward warranty, and ships free on orders over $300 in the contiguous US."
        />

        <article className="featuredProduct">
          <div className="featuredImage productImage">
            <Image
              src="/Wall-mounted charger on concrete garage wall.png"
              alt="Voltway Home Pro 2 mounted on a concrete garage wall"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
            <div className="imageTag">Home charging · Level 2</div>
          </div>
          <div className="featuredDetails">
            <div className="productHeading">
              <div>
                <span className="productBadge">Flagship</span>
                <h3>Home Pro 2</h3>
              </div>
              <p className="productPrice">
                <span>From</span>
                $549
              </p>
            </div>
            <p className="productSummary">
              Our fastest hardwired home charger, designed for daily driving and
              solar-ready homes.
            </p>
            <ProductSpecs specs={homeProSpecs} className="featuredSpecs" />
            <a className="textLink" href="#footer">
              Order Home Pro 2
              <ArrowIcon />
            </a>
          </div>
        </article>

        <div className="productGrid">
          <article className="productCard">
            <div className="productVisual liteVisual productImage">
              <Image
                src="/Voltway Home Lite.png"
                alt="Voltway Home Lite mounted in a bright residential garage"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
              <div className="visualMeta">
                <span>40A circuit</span>
                <span>32A continuous</span>
              </div>
              <div className="visualReadout">
                <span>Output</span>
                <strong>7.7 kW</strong>
              </div>
            </div>
            <div className="productCardBody">
              <div className="productHeading compact">
                <div>
                  <span className="productLabel">Essential home charging</span>
                  <h3>Home Lite</h3>
                </div>
                <p className="productPrice">$349</p>
              </div>
              <p className="productSummary">
                Reliable Level 2 charging for 40-amp circuits, plug-in or
                hardwired.
              </p>
              <ProductSpecs specs={homeLiteSpecs} className="specList" />
              <a className="textLink" href="#footer">
                Order Home Lite
                <ArrowIcon />
              </a>
            </div>
          </article>

          <article className="productCard">
            <div className="productVisual goVisual productImage">
              <Image
                src="/Portable charger kit with carry case and adapters.png"
                alt="Voltway Go portable charging kit with adapters and carry case"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
              <div className="imageTag">Portable · Level 1 + 2</div>
            </div>
            <div className="productCardBody">
              <div className="productHeading compact">
                <div>
                  <span className="productLabel">Road-ready charging</span>
                  <h3>Voltway Go</h3>
                </div>
                <p className="productPrice">$399</p>
              </div>
              <p className="productSummary">
                A rugged Level 1 and Level 2 portable charger that lives in your
                trunk.
              </p>
              <ProductSpecs specs={goSpecs} className="specList" />
              <a className="textLink" href="#footer">
                Order Voltway Go
                <ArrowIcon />
              </a>
            </div>
          </article>
        </div>

        <div className="returnNote">
          <span>30-day home trial</span>
          <p>
            Return any charger within 30 days of delivery with a prepaid label
            and no restocking fee, even if used.
          </p>
        </div>
      </div>
    </section>
  );
}

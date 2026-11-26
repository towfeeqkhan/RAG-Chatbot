const networkStats = [
  ["2,400", "Public stations across 9 US states and Canada"],
  ["98.2%", "Trailing 12-month network uptime"],
  ["350 kW", "Peak DC fast charging"],
  ["$0", "Peak or time-of-day surcharges"],
];

export default function NetworkProof() {
  return (
    <section className="proofBand" aria-label="Voltway network statistics">
      <div className="proofGrid pageContainer">
        {networkStats.map(([value, label]) => (
          <div className="proofItem" key={value}>
            <strong>{value}</strong>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

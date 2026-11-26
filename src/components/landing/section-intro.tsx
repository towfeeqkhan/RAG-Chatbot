type SectionIntroProps = {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionIntro({
  index,
  eyebrow,
  title,
  description,
}: SectionIntroProps) {
  return (
    <div className="sectionIntro">
      <div className="sectionKicker">
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
      <div className="sectionHeading">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

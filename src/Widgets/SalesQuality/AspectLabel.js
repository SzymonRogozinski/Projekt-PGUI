export default function AspectLabel({ Aspekt, PercentLevel }) {
  return (
    <div>
      {Aspekt}: <span style={{fontWeight:"600"}}>{parseInt(PercentLevel*100)}</span>/100
    </div>
  );
}

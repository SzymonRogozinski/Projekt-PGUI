export default function PercentIndicator({ percentLevel }) {
  return (
    <div style={{ textAlign: "center" }}>
      <span style={{ fontSize: 53, fontWeight: 500 }}>
        {parseInt(percentLevel * 100)}
      </span>
      <span>/100 pkt</span>
    </div>
  );
}

export default function QualityCategoryLabel({ category }) {
  return (
    <div>
      <span
        style={{
          fontSize: 30,
          fontWeight: 500,
        }}
      >
        {category}
      </span>
    </div>
  );
}

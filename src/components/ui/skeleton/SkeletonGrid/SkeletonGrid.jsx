import SkeletonCard from "../SkeletonCard/SkeletonCard";
import "./skeleton-grid.scss";

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

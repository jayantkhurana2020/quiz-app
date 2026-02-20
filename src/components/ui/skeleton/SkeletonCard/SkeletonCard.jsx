import Skeleton from "../Skeleton";
import "./skeleton-card.scss";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton height="180px" />
      <div className="skeleton-card-content">
        <Skeleton height="20px" width="60%" />
        <Skeleton height="14px" width="80%" />
        <Skeleton height="14px" width="40%" />
      </div>
    </div>
  );
}

import Skeleton from "../Skeleton";

export default function SkeletonText({ lines = 3 }) {
  return (
    <div>
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          height="12px"
          className="mb-2"
        />
      ))}
    </div>
  );
}

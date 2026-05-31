import './Skeleton.css';

export function TableSkeleton({ rows = 10 }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton skeleton-line" style={{ width: 24 }} />
          <div className="skeleton skeleton-circle" />
          <div className="skeleton skeleton-line" style={{ width: 120 }} />
          <div className="skeleton skeleton-line" style={{ flex: 1 }} />
          <div className="skeleton skeleton-line" style={{ width: 80 }} />
          <div className="skeleton skeleton-line" style={{ width: 80 }} />
          <div className="skeleton skeleton-line" style={{ width: 80 }} />
        </div>
      ))}
    </div>
  );
}

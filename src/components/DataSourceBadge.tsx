interface DataSourceBadgeProps {
  source?: string;
  updatedAt?: string;
}

export default function DataSourceBadge({
  source,
  updatedAt,
}: DataSourceBadgeProps) {
  if (!source) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
      📋 {source}
      {updatedAt && (
        <span>· {new Date(updatedAt).toLocaleDateString()}</span>
      )}
    </span>
  );
}

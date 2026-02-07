import type { ReactNode } from "react";

export function JsonView({ value }: { value: unknown }): ReactNode {
  return (
    <pre className="font-mono text-[14px] leading-snug overflow-x-auto">
      <JsonValue value={value} />
    </pre>
  );
}

function JsonValue({ value, depth = 0 }: { value: unknown; depth?: number }) {
  if (value === null) return <span className="text-gray-500">null</span>;
  if (value === undefined)
    return <span className="text-gray-500">undefined</span>;
  if (typeof value === "boolean")
    return <span className="text-yellow-400">{String(value)}</span>;
  if (typeof value === "number")
    return <span className="text-cyan-400">{value}</span>;
  if (typeof value === "string")
    return <span className="text-green-400">"{value}"</span>;

  if (Array.isArray(value)) {
    if (value.length === 0)
      return <span className="text-gray-400">{"[]"}</span>;
    return (
      <span>
        {"["}
        <div className="ml-3 border-l border-gray-800 pl-2">
          {value.map((item, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static display
            <div key={i}>
              <JsonValue value={item} depth={depth + 1} />
              {i < value.length - 1 && <span className="text-gray-500">,</span>}
            </div>
          ))}
        </div>
        {"]"}
      </span>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0)
      return <span className="text-gray-400">{"{}"}</span>;
    return (
      <span>
        {"{"}
        <div className="ml-3 border-l border-gray-800 pl-2">
          {entries.map(([key, val], i) => (
            <div key={key}>
              <span className="text-purple-400">"{key}"</span>
              <span className="text-gray-400">: </span>
              <JsonValue value={val} depth={depth + 1} />
              {i < entries.length - 1 && (
                <span className="text-gray-500">,</span>
              )}
            </div>
          ))}
        </div>
        {"}"}
      </span>
    );
  }

  return <span>{String(value)}</span>;
}

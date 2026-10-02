import type { ReactNode } from "react";
import type { JobStatus } from "../data";
import { statusLabel } from "../data";

export function Card({
  title,
  children,
  footer,
}: {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="card">
      {title ? <h2 className="card-title">{title}</h2> : null}
      {children}
      {footer ? (
        <>
          <div className="divider" />
          <div className="card-footer">{footer}</div>
        </>
      ) : null}
    </section>
  );
}

export function Metric({ value, label, hint }: { value: string; label: string; hint?: string }) {
  return (
    <div className="metric">
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {hint ? <div className="metric-hint">{hint}</div> : null}
    </div>
  );
}

export function StatusChip({ status }: { status: JobStatus }) {
  return <span className={`chip chip-${status}`}>{statusLabel(status)}</span>;
}

export function PaletteSwatches({
  colors,
  size = 16,
}: {
  colors: readonly string[];
  size?: number;
}) {
  return (
    <span className="swatches" aria-hidden="true">
      {colors.map((color) => (
        <span
          key={color}
          className="swatch"
          style={{ backgroundColor: color, width: size, height: size }}
        />
      ))}
    </span>
  );
}

export function PageHeader({
  title,
  hint,
  actions,
}: {
  title: string;
  hint: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{hint}</p>
      </div>
      {actions}
    </header>
  );
}

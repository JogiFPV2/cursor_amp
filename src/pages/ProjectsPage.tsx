import { useMemo, useState } from "react";
import { Card, PageHeader, StatusChip } from "../components/ui";
import { filterLabel, projects, statusFilters, type StatusFilter } from "../data";

export function ProjectsPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.status === filter)),
    [filter],
  );
  const total = visible.reduce((sum, project) => sum + project.valueAmount, 0);

  return (
    <>
      <PageHeader title="Projekty" hint={`${visible.length} zleceń · ${formatMoney(total)}`} />

      <div className="filters" role="tablist" aria-label="Filtr statusu">
        {statusFilters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            className={filter === item ? "filter active" : "filter"}
            onClick={() => setFilter(item)}
          >
            {filterLabel(item)}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <Card>
          <p className="empty">Brak zleceń w tym stanie.</p>
        </Card>
      ) : (
        <div className="card-grid">
          {visible.map((project) => (
            <Card
              key={project.id}
              title={project.name}
              footer={
                <span>
                  {project.owner} · {project.due}
                </span>
              }
            >
              <div className="project-top">
                <div>
                  <div className="metric-value">{project.value}</div>
                  <div className="metric-label">{project.client}</div>
                </div>
                <StatusChip status={project.status} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function formatMoney(amount: number): string {
  return `${amount.toLocaleString("pl-PL")} zł`;
}

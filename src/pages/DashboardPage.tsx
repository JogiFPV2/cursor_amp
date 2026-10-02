import { Card, Metric, PageHeader, StatusChip } from "../components/ui";
import { monthMetrics, people, projects, queueMetrics } from "../data";
import { ThemeSelect } from "./ThemeSelect";

export function DashboardPage() {
  const active = projects.slice(0, 5);
  const activeTotal = active.reduce((sum, project) => sum + project.valueAmount, 0);
  const busiest = [...people].sort((a, b) => Number.parseInt(b.load, 10) - Number.parseInt(a.load, 10));

  return (
    <>
      <PageHeader
        title="Pulpit"
        hint="Studio Amp · październik 2026"
        actions={<ThemeSelect />}
      />

      <Card
        title="Ten miesiąc"
        footer={<span>Ostatnie zamknięcie: 2 godz. temu · 4 faktury do wysłania</span>}
      >
        <div className="metric-grid metric-grid-4">
          {monthMetrics.map((metric) => (
            <Metric key={metric.label} {...metric} />
          ))}
        </div>
      </Card>

      <div className="split">
        <Card title="Kolejka">
          <div className="metric-grid metric-grid-3">
            {queueMetrics.map((metric) => (
              <Metric key={metric.label} {...metric} />
            ))}
          </div>
        </Card>

        <Card title="Zespół dziś" footer={<span>Średnie obłożenie 76%</span>}>
          <ul className="people-list">
            {busiest.slice(0, 4).map((person) => (
              <li key={person.id}>
                <div>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </div>
                <b>{person.load}</b>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card
        title="Zlecenia"
        footer={<span>Wartość widocznych: {activeTotal.toLocaleString("pl-PL")} zł</span>}
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Zlecenie</th>
                <th>Klient</th>
                <th>Status</th>
                <th>Termin</th>
                <th className="num">Wartość</th>
              </tr>
            </thead>
            <tbody>
              {active.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.client}</td>
                  <td>
                    <StatusChip status={project.status} />
                  </td>
                  <td>{project.due}</td>
                  <td className="num">{project.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

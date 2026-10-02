import { Card, Metric, PageHeader } from "../components/ui";
import { people } from "../data";

export function TeamPage() {
  return (
    <>
      <PageHeader title="Zespół" hint="6 osób · średnie obłożenie 76%" />
      <div className="card-grid card-grid-3">
        {people.map((person) => (
          <Card
            key={person.id}
            footer={
              <span>
                {person.projects} projekty · {person.focus}
              </span>
            }
          >
            <Metric value={person.load} label={person.name} hint={person.role} />
          </Card>
        ))}
      </div>
    </>
  );
}

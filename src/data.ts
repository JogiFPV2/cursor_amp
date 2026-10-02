export type JobStatus = "w_toku" | "odbior" | "opoznione" | "wycena";

export type Project = {
  id: string;
  name: string;
  client: string;
  value: string;
  valueAmount: number;
  status: JobStatus;
  due: string;
  owner: string;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  load: string;
  projects: number;
  focus: string;
};

export const monthMetrics = [
  { value: "48 200 zł", label: "Przychód", hint: "ten miesiąc" },
  { value: "31%", label: "Marża", hint: "po kosztach" },
  { value: "14", label: "Zlecenia", hint: "w toku" },
  { value: "76%", label: "Obłożenie", hint: "zespół" },
] as const;

export const queueMetrics = [
  { value: "6", label: "Odbiór", hint: "dziś" },
  { value: "2", label: "Opóźnione", hint: "wymagają decyzji" },
  { value: "9", label: "Wyceny", hint: "bez odpowiedzi" },
] as const;

export const projects: readonly Project[] = [
  {
    id: "lumen",
    name: "Rebrand kawiarni Lumen",
    client: "Lumen",
    value: "18 400 zł",
    valueAmount: 18400,
    status: "w_toku",
    due: "8 paź",
    owner: "Anna Wójcik",
  },
  {
    id: "tor",
    name: "Sklep rowerowy Tor",
    client: "Tor",
    value: "12 800 zł",
    valueAmount: 12800,
    status: "odbior",
    due: "3 paź",
    owner: "Igor Nowak",
  },
  {
    id: "nova",
    name: "Identyfikacja kliniki Nova",
    client: "Nova",
    value: "24 600 zł",
    valueAmount: 24600,
    status: "w_toku",
    due: "17 paź",
    owner: "Zofia Król",
  },
  {
    id: "lisc",
    name: "Opakowania herbaty Liść",
    client: "Liść",
    value: "9 200 zł",
    valueAmount: 9200,
    status: "opoznione",
    due: "28 wrz",
    owner: "Marek Lis",
  },
  {
    id: "nurt",
    name: "Strona festiwalu Nurt",
    client: "Nurt",
    value: "15 100 zł",
    valueAmount: 15100,
    status: "wycena",
    due: "11 paź",
    owner: "Piotr Adamski",
  },
  {
    id: "dab",
    name: "Katalog mebli Dąb",
    client: "Dąb",
    value: "21 750 zł",
    valueAmount: 21750,
    status: "odbior",
    due: "4 paź",
    owner: "Helena Bąk",
  },
  {
    id: "sola",
    name: "Menu restauracji Sola",
    client: "Sola",
    value: "6 400 zł",
    valueAmount: 6400,
    status: "wycena",
    due: "14 paź",
    owner: "Anna Wójcik",
  },
  {
    id: "brzeg",
    name: "Oznakowanie hotelu Brzeg",
    client: "Brzeg",
    value: "19 900 zł",
    valueAmount: 19900,
    status: "opoznione",
    due: "30 wrz",
    owner: "Igor Nowak",
  },
];

export const people: readonly Person[] = [
  { id: "marek", name: "Marek Lis", role: "Kierownik studia", load: "82%", projects: 4, focus: "odbiory" },
  { id: "anna", name: "Anna Wójcik", role: "Projektantka", load: "74%", projects: 3, focus: "identyfikacja" },
  { id: "igor", name: "Igor Nowak", role: "Front-end", load: "91%", projects: 3, focus: "wdrożenia" },
  { id: "zofia", name: "Zofia Król", role: "Ilustracja", load: "63%", projects: 2, focus: "opakowania" },
  { id: "piotr", name: "Piotr Adamski", role: "Strategia", load: "55%", projects: 2, focus: "wyceny" },
  { id: "helena", name: "Helena Bąk", role: "Produkcja", load: "70%", projects: 3, focus: "druk" },
];

export function statusLabel(status: JobStatus): string {
  switch (status) {
    case "w_toku":
      return "W toku";
    case "odbior":
      return "Odbiór";
    case "opoznione":
      return "Opóźnione";
    case "wycena":
      return "Wycena";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export const statusFilters = ["all", "w_toku", "odbior", "opoznione", "wycena"] as const;

export type StatusFilter = (typeof statusFilters)[number];

export function filterLabel(filter: StatusFilter): string {
  switch (filter) {
    case "all":
      return "Wszystkie";
    case "w_toku":
    case "odbior":
    case "opoznione":
    case "wycena":
      return statusLabel(filter);
    default: {
      const exhaustive: never = filter;
      return exhaustive;
    }
  }
}

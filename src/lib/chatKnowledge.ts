import { questions } from "./questions";
const paths = [
  "/about",
  "/team",
  "/pipeline",
  "/problem",
  "/science",
  "/partners",
];
const topics = [
  /what is kritrna|what is transloka|based|company/i,
  /founder|who leads|team/i,
  /programme|program|hbb|dmd|tp53/i,
  /premature stop|nonsense/i,
  /suppressor|transfer rna/i,
  /collaborat|contact|partner/i,
];
export const knowledge = questions.map(([title, answer], i) => ({
  title,
  answer,
  href: paths[i],
  match: topics[i],
}));

import { siReact, siNextdotjs, siTypescript, siTailwindcss, siNodedotjs, siExpress, siPostgresql, siStripe, siPython, siModelcontextprotocol, siN8n, siGithubactions, siDocker, siVercel, siGit } from "simple-icons";
import { TechnologyCarousel } from "./technology-carousel";
const tools = [siReact, siNextdotjs, siTypescript, siTailwindcss, siNodedotjs, siExpress, siPostgresql, siStripe, siPython, siModelcontextprotocol, siN8n, siGithubactions, siDocker, siVercel, siGit].map(({ title, path }) => ({ title, path }));
export function TechnologyStack() { return <TechnologyCarousel tools={tools} />; }

import { techStack } from "../data/techStack";

const techMap = Object.fromEntries(
  techStack.map(t => [t.name.toLowerCase(), t])
);

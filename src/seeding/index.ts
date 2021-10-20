import { seedVertices } from "./seed-vertices";
import { seedEdges } from "./seed-edeges";
import { withGremlinPromise } from "./../utils/withGremlinPromise";

(async () => {
  await withGremlinPromise(seedVertices)();
  await withGremlinPromise(seedEdges)();
  process.exit(0);
})();

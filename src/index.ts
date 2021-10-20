import { walkingTheGraph } from "./walkingTheGraph";
import { withGremlinPromise } from "./utils/withGremlinPromise";

(async () => {
  await withGremlinPromise(walkingTheGraph)();

})();

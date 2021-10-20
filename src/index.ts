import { walkingTheGraph } from "./walkingTheGraph";
import { withGremlinPromise } from "./utils/withGremlinPromise";

(async () => {
  await withGremlinPromise(walkingTheGraph)();

  // await withGremlinPromise(
  //   async ({
  //     g,
  //     process: {
  //       statics: { has, label, out },
  //     },
  //   }: CallbackParams) => {
  //     has;
  //     label;
  //     let result = await g
  //       .V()
  //       .hasLabel("airport")
  //       .groupCount()
  //       .by("country")
  //       .next();
  //     result = await g
  //       .V()
  //       .hasLabel("country")
  //       .group()
  //       .by("code")
  //       .by(out().count())
  //       .next();
  //     result = await g
  //       .V()
  //       .hasLabel("continent")
  //       .group()
  //       .by("code")
  //       .by(out().count())
  //       .next();
  //     result = await g
  //       .V()
  //       .hasLabel("airport")
  //       .groupCount()
  //       .by("country")
  //       .select("FR", "GR", "BE")
  //       .next();
  //   }
  // )();
})();

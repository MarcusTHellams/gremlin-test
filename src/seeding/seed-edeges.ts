import * as Papa from "papaparse";
import * as fs from "fs-extra";
import { asyncForEach } from "./../utils/utils";
import { CallbackParams } from "./../utils/withGremlinPromise";

interface Edge {
  id: number;
  from: number;
  to: number;
  label: string;
  dist: number;
}

export const seedEdges = async ({
  g,
  process: {
    statics: { V },
  },
}: CallbackParams) => {
  const vertices = await fs.readFile(
    `${__dirname}/air-routes-latest-edges.csv`,
    "utf-8"
  );
  const { data } = Papa.parse<Edge>(vertices, {
    dynamicTyping: true,
    delimiter: ",",
    header: true,
  });

  await g.E().drop().iterate();

  await asyncForEach<Edge>(data, async (edge) => {
    try {
      await addEdge(edge);
    } catch (error) {
      console.log("error: ", error);
    }
  });
  async function addEdge(edge: Edge) {
    const result = await g
      .V(edge.from)
      .addE(edge.label)
      .property("dist", edge.dist)
      .to(V(edge.to))
      .iterate();
  }
  console.log("Done adding edges");
};

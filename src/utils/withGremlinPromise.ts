import gremlin from "gremlin";

const Graph = gremlin.structure.Graph;
const { V, not } = gremlin.process.statics;
const { t, order, cardinality, column, scope, pop, operator, P } =
  gremlin.process;

const hostname = "localhost";
const port = 8182;
console.log("Creating connection");
const wspath = `ws://${hostname}:${port}/gremlin`;

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const connection = new DriverRemoteConnection(wspath, {});
const graph = new Graph();
console.log("Connecting to :" + wspath);
const g = graph.traversal().withRemote(connection);
console.log("Connection created");

export interface CallbackParams {
  g: typeof g;
  process: typeof gremlin.process;
}

export type Args = [...unknown[]];

export const withGremlinPromise =
  (func: (obj: CallbackParams, ...args: Args) => Promise<unknown>) =>
  (...args: Args) => {
    return func({ g, process: gremlin.process }, ...args);
  };


import gremlin from "gremlin";

const Graph = gremlin.structure.Graph;
const {
  V,
  addE,
  addV,
  aggregate,
  and,
  as,
  barrier,
  both,
  bothE,
  bothV,
  branch,
  cap,
  choose,
  coalesce,
  coin,
  constant,
  count,
  cyclicPath,
  dedup,
  drop,
  elementMap,
  emit,
  filter,
  flatMap,
  fold,
  group,
  groupCount,
  has,
  hasId,
  hasKey,
  hasLabel,
  hasNot,
  hasValue,
  //id,
  identity,
  in_,
  inE,
  inV,
  index,
  inject,
  is,
  //key,
  //label,
  limit,
  local,
  loops,
  map,
  match,
  math,
  max,
  mean,
  min,
  not,
  optional,
  or,
  order,
  otherV,
  out,
  outE,
  outV,
  path,
  project,
  properties,
  property,
  propertyMap,
  range,
  repeat,
  sack,
  sample,
  select,
  sideEffect,
  simplePath,
  skip,
  store,
  subgraph,
  sum,
  tail,
  timeLimit,
  times,
  to,
  toE,
  toV,
  tree,
  unfold,
  union,
  until,
  //value,
  valueMap,
  //values,
  where,
} = gremlin.process.statics;

const {
  t: { id, label, key, value },
  order: { desc, incr, asc, shuffle, decr },
  cardinality: { single, set, list },
  column: { keys, values },
  scope: { global, /* local */ },
  pop: { all, first, last, mixed },
  operator,
  P: {
    //and,
    //or,
    toString,
    between,
    eq,
    gt,
    gte,
    inside,
    lt,
    lte,
    neq,
    outside,
    test,
    within,
    without,
  },
} = gremlin.process;

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

export type Args = [...any[]];

export const withGremlinPromise =
  <T>(func: (obj: CallbackParams, ...args: Args) => Promise<T>) =>
  (...args: Args) => {
    return func({ g, process: gremlin.process }, ...args);
  };


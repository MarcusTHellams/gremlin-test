import { CallbackParams } from "./utils/withGremlinPromise";

export const walkingTheGraph = async ({
  g,
  process: {
    P,
    t,
    withOptions,
    cardinality: { single },
    statics: { values, out, valueMap, as, unfold, select, elementMap },
  },
}: CallbackParams) => {
  out;
  as;
  withOptions;
  unfold;
  single && undefined;
  P;
  elementMap;

  let hh = await g
    .V()
    .has("code", "LGW")
    .as("marcus")
    .select("marcus")
    .elementMap()
    .next();

  let ff = await g
    .V()
    .has("code", "DFW")
    .as("from")
    .out()
    .has("region", "US-CA")
    .as("to")
    .select("from", "to")
    .by(elementMap())
    .toList();

  let r = g
    .V()
    .has("code", "DFW")
    .as("dfw")
    .addV()
    .property(t.label, select("dfw").label())
    .as("new")
    .sideEffect(
      select("dfw")
        .properties()
        .as("dfwprops")
        .select("new")
        .property(select("dfwprops").key(), select("dfwprops").value())
    );
  r.property(single, "code", "BWI");
  r.property(single, "place", "Marcus");

  let rs = await r.valueMap().next();
  rs;

  // Where can I fly to from Austin?
  let result: any;
  result = await g
    .V()
    .has("airport", "code", "AUS")
    .out("route")
    .values("code")
    .toList();

  // Where can I fly to from Austin, with one stop on the way?
  result = await g
    .V()
    .has("airport", "code", "AUS")
    .out("route")
    .out("route")
    .values("code")
    .toList();

  // What routes come in to LCY?
  result = await g
    .V()
    .has("airport", "code", "LCY")
    .in_("route")
    .values("code")
    .toList();

  // Flights from London Heathrow (LHR) to airports in the USA
  result = await g
    .V()
    .has("airport", "code", "LHR")
    .out("route")
    .has("country", "US")
    .values("code")
    .toList();

  // This time, for each route, return both vertices and the edge that connects them.
  result = await g
    .V()
    .has("airport", "code", "LHR")
    .outE()
    .inV()
    .path()
    .toList();

  result = await g
    .V()
    .has("airport", "code", "LHR")
    .outE()
    .inV()
    .path()
    .by("code")
    .by("dist")
    .toList();

  result = await g
    .V(3)
    .out()
    .limit(5)
    .path()
    .by(values("code", "city"))
    .toList();

  result = await g
    .V()
    .has("airport", "code", "AUS")
    .out()
    .out()
    .path()
    .by("code")
    .limit(10)
    .toList();

  /*
    Given that every journey starts in Austin, we might not actually want the AUS airport code to be part of the returned results. We might just want to capture the places that we ended up visiting after leaving Austin. This can be achieved by labelling the parts of the traversal that we care about using as steps and then using from and to modulators to tell the path step what we are interested in. Take a look at the modified version of the query below.
  */

  result = await g
    .V()
    .has("airport", "code", "AUS")
    .out()
    .as("a")
    .out()
    .as("b")
    .path()
    .by("code")
    .from_("a")
    .to("b")
    .limit(10)
    .toList();

  /* 
    Because after skipping the AUS part of the path we did in fact want the rest of the results we could have left off the to modulator and written the query as follows.
  */
  result = await g
    .V()
    .has("airport", "code", "AUS")
    .out()
    .as("a")
    .out()
    .path()
    .by("code")
    .from_("a")
    .limit(10)
    .toList();

  result = await g
    .V()
    .has("airport", "code", "AUS")
    .out()
    .out()
    .out()
    .path()
    .by("code")
    .limit(10)
    .toList();

  // Let's now modify the query to limit which parts of the path are returned.
  result = await g
    .V()
    .has("airport", "code", "AUS")
    .out()
    .as("a")
    .out()
    .as("b")
    .out()
    .path()
    .by("code")
    .from_("a")
    .to("b")
    .limit(10)
    .toList();

  // We could also have written the query as shown below to only show the results of each path up to a certain point.
  // This time only the first three airports visited are included in each result.

  result = await g
    .V()
    .has("airport", "code", "AUS")
    .out()
    .out()
    .as("b")
    .out()
    .path()
    .by("code")
    .to("b")
    .limit(10)
    .toList();

  // Does an edge exist between two vertices?
  //true
  result = await g
    .V()
    .has("code", "AUS")
    .out("route")
    .has("code", "DFW")
    .hasNext();

  //false
  result = await g
    .V()
    .has("code", "AUS")
    .out("route")
    .has("code", "SYD")
    .hasNext();

  // 3.3.4. Does an edge exist between two vertices?

  result = await g
    .V()
    .has("type", "airport")
    .limit(10)
    .as("a", "b", "c")
    .select("a", "b", "c")
    .by(valueMap(true))
    .toList();

  // debugger;
};

import * as Papa from "papaparse";
import * as fs from "fs-extra";
import { asyncForEach } from "./../utils/utils";
import { CallbackParams } from "./../utils/withGremlinPromise";

interface Airport {
  id: number;
  label: string;
  type: string;
  code: string;
  icao: string;
  desc: string;
  region: string;
  runways?: number;
  longest?: number;
  elev?: number;
  country?: string;
  city?: string;
  lat?: number;
  lon?: number;
}

export const seedVertices = async ({
  g,
  process: { t, cardinality },
}: CallbackParams) => {
  const vertices = await fs.readFile(
    `${__dirname}/air-routes-latest-nodes.csv`,
    "utf-8"
  );
  const { data } = Papa.parse<Airport>(vertices, {
    dynamicTyping: true,
    delimiter: ",",
    header: true,
  });

  await g.V().drop().iterate();
  await g.E().drop().iterate();

  await asyncForEach<Airport>(data, async (airport) => {
    try {
      await addVertex(airport);
      /* c8 ignore next 3 */
    } catch (error) {
      console.log("error: ", error);
    }
  });

  async function addVertex(vertex: Airport) {
    await g
      .addV(vertex.label)
      .property(t.id, vertex.id)
      .property(cardinality.single, "code", vertex.code)
      .property(cardinality.single, "type", vertex.type)
      .property(cardinality.single, "icao", vertex.icao)
      .property(cardinality.single, "desc", vertex.desc)
      .property(cardinality.single, "region", vertex.region)
      .property(cardinality.single, "runways", vertex.runways)
      .property(cardinality.single, "longest", vertex.longest)
      .property(cardinality.single, "elev", vertex.elev)
      .property(cardinality.single, "country", vertex.country)
      .property(cardinality.single, "city", vertex.city)
      .property(cardinality.single, "lat", vertex.lat)
      .property(cardinality.single, "lon", vertex.lon)
      .iterate();
  }
  console.log("Done adding vertices");
  return "Done adding vertices";
};

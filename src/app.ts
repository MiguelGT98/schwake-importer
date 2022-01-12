import { Reader } from "./models/Reader";

export default function app(rimsPath: string, timespansPath: string) {
  const reader = new Reader();

  reader.readRims(rimsPath, "v1");
  reader.readTimeSpans(timespansPath, "v1");
}

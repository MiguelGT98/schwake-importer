import { Reader } from "./src/models/Reader";

const reader = new Reader();

reader.readRims("./files/rims.dat", "v1");
reader.readTimeSpans("./files/timespans.dat", "v1");

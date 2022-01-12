import { Reader } from "./models/Reader";

export default function app(rimsPath: string, timespansPath: string) {
  const reader = new Reader();
  const startTime = new Date();

  // Do these separately to have a log of the different stats for each file.
  Promise.all([
    reader.readRims(rimsPath, "v1").then((result) => {
      // Print a log of the execution
      console.table([
        {
          file: "Rims",
          startTime: startTime,
          endTime: new Date(),
          insertions: result[0],
          errors: result[1],
          updates: 0,
        },
      ]);
    }),
    reader.readTimeSpans(timespansPath, "v1").then((result) => {
      // Print a log of the execution
      console.table([
        {
          file: "Timespans",
          startTime: startTime,
          endTime: new Date(),
          insertions: result[0],
          errors: result[1],
          updates: 0,
        },
      ]);
    }),
  ]).then(() => {
    process.exit(0);
  });
}

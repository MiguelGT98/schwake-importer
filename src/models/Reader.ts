import fs from "fs";
import { CreateRim, insertRims } from "./Rim";
import { CreateTimeSpan, insertTimeSpans } from "./TimeSpan";

export class Reader {
  public readRims(filePath: string, version: string): Promise<Array<number>> {
    const myPromise = new Promise<Array<number>>((resolve, reject) => {
      // Create a read stream to be able to process data in chunks, instead of loading the whole file into memory.
      const readStream = fs.createReadStream(filePath, {
        encoding: "utf8",
      });

      let allRims = [];
      let errorCount = 0;
      let insertCount = 0;

      readStream.on("error", (error) => {
        console.error(error);
      });

      readStream.on("data", (chunk) => {
        const chunkString = chunk as string;

        const lines: Array<string> = chunkString.split("\r\n");

        const rims = lines
          .map((line) => CreateRim(line, version))
          .filter((rim) => {
            if (rim === null) {
              errorCount++;
              return false;
            }

            return true;
          });

        allRims.push(...rims);
        insertCount += rims.length;
      });

      readStream.on("end", async () => {
        // Check if a critical error should happen.
        if (errorCount / (insertCount + errorCount) > 0.05) {
          console.error(
            "A critical error has happened. Too many errors on rims file."
          );
          process.exit(1);
        }

        // Insert data and send the stats for the import
        await insertRims(allRims);
        resolve([insertCount, errorCount]);
      });
    });

    return myPromise;
  }

  public readTimeSpans(
    filePath: string,
    version: string
  ): Promise<Array<number>> {
    const myPromise = new Promise<Array<number>>((resolve, reject) => {
      // Create a read stream to be able to process data in chunks, instead of loading the whole file into memory.
      const readStream = fs.createReadStream(filePath, {
        encoding: "utf8",
      });

      let allTimeSpans = [];
      let errorCount = 0;
      let insertCount = 0;

      readStream.on("error", (error) => {
        console.error(error);
        process.exit(1);
      });

      readStream.on("data", (chunk) => {
        const chunkString = chunk as string;

        const lines: Array<string> = chunkString.split("\r\n");

        const timeSpans = lines
          .map((line) => CreateTimeSpan(line, version))
          .filter((timeSpan) => {
            if (timeSpan === null) {
              errorCount++;
              return false;
            }

            return true;
          });

        allTimeSpans.push(...timeSpans);
        insertCount += timeSpans.length;
      });

      readStream.on("end", async () => {
        // Check if a critical error should happen.
        if (errorCount / (insertCount + errorCount) > 0.05) {
          console.error(
            "A critical error has happened. Too many errors on timespans file."
          );
          process.exit(1);
        }

        // Insert data and send the stats for the import
        await insertTimeSpans(allTimeSpans);
        resolve([insertCount, errorCount]);
      });
    });

    return myPromise;
  }
}

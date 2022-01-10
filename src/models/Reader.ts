import fs from "fs";
import { CreateRim } from "./Rim";
import { CreateTimeSpan } from "./TimeSpan";

export class Reader {
  public readRims(filePath: string, version: string) {
    // Create a read stream to be able to process data in chunks, instead of loading the whole file into memory.
    const readStream = fs.createReadStream(filePath, {
      encoding: "utf8",
    });
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

      insertCount += rims.length;
    });

    readStream.on("end", () => {
      console.log(
        `Ended rims import with ${insertCount} inserts, and an error count of: ${errorCount}`
      );
    });
  }

  public readTimeSpans(filePath: string, version: string) {
    // Create a read stream to be able to process data in chunks, instead of loading the whole file into memory.
    const readStream = fs.createReadStream(filePath, {
      encoding: "utf8",
    });
    let errorCount = 0;
    let insertCount = 0;

    readStream.on("error", (error) => {
      console.error(error);
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

      insertCount += timeSpans.length;
    });

    readStream.on("end", () => {
      console.log(
        `Ended time spans import with ${insertCount} inserts, and an error count of: ${errorCount}`
      );
    });
  }
}

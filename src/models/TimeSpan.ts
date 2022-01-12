// Different models for different versions of timespans.
export class TimeSpan {
  id: number; // Chars 0-7
  schwackeCode: number; // Chars 8-15
  validFrom: Date; // Chars 16-25
  validTo: Date; // Chars 26-35

  constructor(data: string) {
    const id = data.slice(0, 8);
    this.id = Number.parseInt(id);

    const schwackeCode = data.slice(8, 16);
    this.schwackeCode = Number.parseInt(schwackeCode);

    const validFrom = data.slice(16, 26).split(".");
    this.validFrom = new Date(
      Number.parseInt(validFrom[2]),
      Number.parseInt(validFrom[1]),
      Number.parseInt(validFrom[2])
    );

    const validTo = data.slice(26).split(".");
    this.validTo = new Date(
      Number.parseInt(validTo[2]),
      Number.parseInt(validTo[1]),
      Number.parseInt(validTo[2])
    );
  }
}

// Factory to create timespans depending on their version and data.
export function CreateTimeSpan(data: string, version: string) {
  if (validateData(data, version)) {
    // Different versions have different schemas.
    switch (version) {
      case "v1":
        return new TimeSpan(data);
    }
  } else {
    return null;
  }
}

export function validateData(data: string, version: string): boolean {
  // Perform validations. If found invalid at any point, return false.

  // General validations apply to any version.
  if (!data || data === "") return false;
  if (data.length !== 36) return false;

  // Different validations are specific to a version.
  switch (version) {
    case "v1":
      const id = data.slice(0, 8).split(" ").join("");
      if (!id || id.length !== 8) return false;

      const schwackeCode = data.slice(8, 16).split(" ").join("");
      if (!schwackeCode || schwackeCode.length !== 8) return false;

      const validFrom = data.slice(16, 26).split(" ").join("");
      if (!validFrom || validFrom.length !== 10) return false;

      const validTo = data.slice(26).split(" ").join("");
      if (!validTo || validTo !== "00.00.0000") return false;
  }

  return true;
}

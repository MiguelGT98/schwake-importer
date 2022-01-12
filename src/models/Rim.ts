import { Schema, model, connect } from "mongoose";

// Different models for different versions of rims.
export class Rim {
  code: number; // Chars: 0-4
  width: number; // Chars: 5-9 (9 could be empty)
  height: string; // Char: 10
  onePiece: boolean; // Char 11
  diameter: number; // Chars: 12-13
  material: "S" | "L"; // Char: 14

  constructor(data: string) {
    const code = data.slice(0, 5);
    this.code = Number.parseInt(code);

    const width = data.slice(5, 10).replace(" ", "");
    this.width = Number.parseFloat(width);

    const height = data.slice(10, 11);
    this.height = height;

    const onePiece = data.slice(11, 12);
    this.onePiece = onePiece === "X";

    const diameter = data.slice(12, 14);
    this.diameter = Number.parseInt(diameter);

    const material = data.slice(14) as "S" | "L";
    this.material = material;
  }
}

// Factory to create rims depending on their version and data.
export function CreateRim(data: string, version: string) {
  if (validateData(data, version)) {
    // Different versions have different schemas.
    switch (version) {
      case "v1":
        return new Rim(data);
    }
  } else {
    return null;
  }
}

export function validateData(data: string, version: string): boolean {
  // Perform validations. If found invalid at any point, return false.

  // General validations apply to any version.
  if (!data || data === "") return false;
  if (data.length !== 15) return false;

  // Different validations are specific to a version.
  switch (version) {
    case "v1":
      const code = data.slice(0, 5).split(" ").join("");
      if (!code || code.length !== 5) return false;

      const width = data.slice(5, 10).split(" ").join("");
      if (!width || width.length < 4) return false;

      const height = data.slice(10, 11).split(" ").join("");
      if (!height || height.length !== 1) return false;

      const onePiece = data.slice(11, 12);
      if (!onePiece || (onePiece !== "X" && onePiece !== "x")) return false;

      const diameter = data.slice(12, 14).split(" ").join("");
      if (!diameter || diameter.length !== 2) return false;

      const material = data.slice(14);
      if (!material || (material !== "S" && material !== "L")) return false;
  }

  return true;
}

// Create a Mongo schema and model for our Rim.
const schema = new Schema<Rim>(
  {
    code: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: String, required: true },
    onePiece: { type: Boolean, required: true },
    diameter: { type: Number, required: true },
    material: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a Model.
const RimModel = model<Rim>("rims", schema);

export async function insertRims(rims: Array<Rim>) {
  try {
    await connect("mongodb://localhost:27018/schwake");
    await RimModel.insertMany(rims);
  } catch (error) {
    console.error(error);
  }
}

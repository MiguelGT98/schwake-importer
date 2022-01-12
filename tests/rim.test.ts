import { validateData, CreateRim, Rim } from "../src/models/Rim";

describe("Validations", () => {
  // Validations for code
  it("should return false if code is missing", () => {
    const isValid = validateData("     6.00 Jx14L", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if code is valid", () => {
    const isValid = validateData("000207.50 Jx16L", "v1");
    expect(isValid).toBeTruthy();
  });

  // Validations for width
  it("should return false if width is missing", () => {
    const isValid = validateData("00020     Jx16L", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if width is valid", () => {
    const isValid = validateData("0002010.50Jx16L", "v1");
    expect(isValid).toBeTruthy();
  });

  it("should return true if width is valid", () => {
    const isValid = validateData("000207.50 Jx16L", "v1");
    expect(isValid).toBeTruthy();
  });

  // Validations for height
  it("should return false if height is missing", () => {
    const isValid = validateData("000016.00  x14L", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if height is valid", () => {
    const isValid = validateData("000016.00 Jx14L", "v1");
    expect(isValid).toBeTruthy();
  });

  // Validations for onePiece
  it("should return false if onePiece is missing", () => {
    const isValid = validateData("000016.00 J 14L", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return false if onePiece is different than X or x", () => {
    const isValid = validateData("000016.00 Jt14L", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if onePiece is valid", () => {
    const isValid = validateData("000016.00 Jx14L", "v1");
    expect(isValid).toBeTruthy();
  });

  it("should return true if onePiece is valid", () => {
    const isValid = validateData("000016.00 JX14L", "v1");
    expect(isValid).toBeTruthy();
  });

  // Validations for diameter
  it("should return false if diameter is missing", () => {
    const isValid = validateData("000016.00 Jx  L", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if diameter is valid", () => {
    const isValid = validateData("000016.00 Jx14L", "v1");
    expect(isValid).toBeTruthy();
  });

  // Validations for material
  it("should return false if material is missing", () => {
    const isValid = validateData("000016.00 Jx14 ", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return false if material is different than S or L", () => {
    const isValid = validateData("000016.00 Jx14H", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if material is valid", () => {
    const isValid = validateData("000016.00 Jx14L", "v1");
    expect(isValid).toBeTruthy();
  });
});

describe("Factory", () => {
  it("should return null if a part of the data is invalid", () => {
    const rim = CreateRim("004824.50  x14S", "v1");
    expect(rim).toBeNull();
  });

  it("should return an instance of Rim if the data is valid", () => {
    const rim = CreateRim("0044811.00Jx19L", "v1");
    expect(rim).toBeInstanceOf(Rim);
  });
});

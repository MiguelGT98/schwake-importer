import { CreateTimeSpan, TimeSpan, validateData } from "../src/models/TimeSpan";

describe("Validations", () => {
  // Validations for id
  it("should return false if id is missing", () => {
    const isValid = validateData(
      "          1028557501.04.201200.00.0000",
      "v1"
    );
    expect(isValid).toBeFalsy();
  });

  it("should return true if id is valid", () => {
    const isValid = validateData("005946551028557501.04.201200.00.0000", "v1");
    expect(isValid).toBeTruthy();
  });

  // Validations for schwackeCode
  it("should return false if schwackeCode is missing", () => {
    const isValid = validateData("00594655        01.04.201200.00.0000", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if schwackeCode is valid", () => {
    const isValid = validateData("005946551028557501.04.201200.00.0000", "v1");
    expect(isValid).toBeTruthy();
  });

  // Validations for validFrom
  it("should return false if validFrom is missing", () => {
    const isValid = validateData("0059465510285575          00.00.0000", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if validFrom is valid", () => {
    const isValid = validateData("005946551028557501.04.201200.00.0000", "v1");
    expect(isValid).toBeTruthy();
  });

  // Validations for validTo
  it("should return false if validTo is missing", () => {
    const isValid = validateData("005946551028557501.04.2012          ", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return false if validTo is different than 00.00.0000", () => {
    const isValid = validateData("005946551028557501.04.201200.01.0000", "v1");
    expect(isValid).toBeFalsy();
  });

  it("should return true if validTo is valid", () => {
    const isValid = validateData("005946551028557501.04.201200.00.0000", "v1");
    expect(isValid).toBeTruthy();
  });
});

describe("Factory", () => {
  it("should return null if a part of the data is invalid", () => {
    const timeSpan = CreateTimeSpan(
      "005946551028557501.04.201200.10.0000",
      "v1"
    );
    expect(timeSpan).toBeNull();
  });

  it("should return an instance of Rim if the data is valid", () => {
    const timeSpan = CreateTimeSpan(
      "005946551028557501.04.201200.00.0000",
      "v1"
    );
    expect(timeSpan).toBeInstanceOf(TimeSpan);
  });
});

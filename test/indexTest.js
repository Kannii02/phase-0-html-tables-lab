const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { expect } = require("chai");

describe("Sample Test Suite", () => {
  it("should run this test case", () => {
    expect(true).to.be.true;
  });
});

console.log("Test file loaded successfully...");

describe("HTML Table Tests", () => {
  let dom;
  let document;

  before(() => {
    const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it("should contain a table element", () => {
    const table = document.querySelector("table");
    expect(table).to.not.be.null;
  });

  it("should have 4 rows of data + 1 header row", () => {
    const rows = document.querySelectorAll("table tr");
    console.log("Found rows:", rows.length); // Debugging output
    expect(rows.length).to.equal(5);
  });

  it("should have correct table headers", () => {
    const headers = document.querySelectorAll("table th");
    const headerTexts = Array.from(headers).map((th) => th.textContent.trim());
    expect(headerTexts).to.deep.equal(["City", "State", "2017 estimate"]);
  });

  it("should have correct data for New York", () => {
    const row = document.querySelectorAll("table tr")[1];
    const cells = Array.from(row.querySelectorAll("td")).map((td) => td.textContent.trim());
    expect(cells).to.deep.equal(["New York", "New York", "8,622,698"]);
  });
});

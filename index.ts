import app from "./src/app";

// Get all command line args
const args = process.argv.slice(2);

// Check if command line arguments were provided
if (args.length < 2) {
  console.error(
    `Script is missing ${2 - args.length} command line argument(s)`
  );
  process.exit(1);
}

// Get the file path for both rims and timespans data
let rimsPath = "";
let timespansPath = "";

args.forEach((arg) => {
  const [pathName, path] = arg.split("=");

  if (pathName === "rimsPath") rimsPath = path;
  if (pathName === "timespansPath") timespansPath = path;
});

// Call the program with the provided paths
app(rimsPath, timespansPath);

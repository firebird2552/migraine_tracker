const fs = require("fs");

export const writeFile = (data) => {
  fs.readFile("../api/data.js", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.info("File written successfully");
    }
  });
  fs.writeFile("../api/data.js", data, (err) => {});
};

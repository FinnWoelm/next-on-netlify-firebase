const path = require("path");
const fs = require("fs/promises");

const OUT_FUNCTIONS = path.join(__dirname, "..", "out_functions");

const main = async () => {
  const functions = await fs.readdir(OUT_FUNCTIONS);
  const files = functions.map((dir) => {
    return {
      dir,
      file: path.join(OUT_FUNCTIONS, dir, `${dir}.js`),
    };
  });

  await Promise.all(
    files.map(async ({ file, dir }) => {
      const content = await fs.readFile(file, "utf-8");
      await fs.writeFile(
        path.join(OUT_FUNCTIONS, `${dir}.js`),
        content.replace(
          'const page = require("./nextJsPage")',
          `const page = require("./${dir}/nextJsPage")`
        )
      );
      await fs.unlink(file);
    })
  );
};

main();

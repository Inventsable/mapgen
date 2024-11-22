import { readFile, writeFile } from "./utils/fs";

import { Jomini } from "jomini";

async function init() {
  console.log("Hello world");
}

init();

const parseAndRewriteFile = async (inpath: string, outpath: string) => {
  const parser = await Jomini.initialize();
  const data = await readFile(inpath, false);
  const parsedData = parser.parseText(data);
  return await writeFile(outpath, JSON.stringify(parsedData));
};

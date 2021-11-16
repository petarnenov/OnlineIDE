import path from "path";
import { writeFile, readFile } from "fs/promises";
import { Router } from "express";

// TODO: sou;d import Cell type from local-client
interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = Router();
  router.get("/", async (req, res) => {
    try {
      const result = await readFile(path.join(dir, filename), "utf-8");
      res.send(JSON.parse(result));
    } catch (err) {
      if ((err as any).code === "ENOENT") {
        await writeFile(path.join(dir, filename), "[]", "utf-8");
        res.send([]);
      } else {
        console.error(err);
      }
    }
  });

  router.post("/", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    const dataToWrite = JSON.stringify(cells);
    await writeFile(path.join(dir, filename), dataToWrite, "utf-8");
    res.send("Cells are write to file");
  });
  return router;
};

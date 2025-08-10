import express from "express";

export const ratioRouter = express.Router();

ratioRouter.get("/", (req, res) => {
  try {
    const data = req.body.length ? req.body : req.query.data ? JSON.parse(req.query.data) : [];

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const totalDistance = data.reduce((acc, obj) => acc + obj.distancia, 0);
    const totalTime = data.reduce((acc, obj) => acc + obj.tiempo, 0);

    if (totalTime === 0) {
      return res.status(400).json({ error: "Total time cannot be zero" });
    }

    const ratio = (totalDistance / totalTime).toFixed(2);
    res.json({ ratio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

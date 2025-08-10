import express from "express";
import { Issue } from "../models/Issue.js";

export const issuesRouter = express.Router();

issuesRouter.post("/", async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) return res.status(400).json({ error: "type is required" });

    let issue = await Issue.findOne({ type });
    if (issue) {
      issue.count += 1;
      issue.timestamp = new Date();
      await issue.save();
    } else {
      issue = await Issue.create({ type });
    }
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

issuesRouter.get("/:type", async (req, res) => {
  try {
    const issue = await Issue.findOne({ type: req.params.type });
    if (!issue) return res.status(404).json({ error: "Issue not found" });

    res.json({
      type: issue.type,
      count: issue.count,
      lastTimestamp: issue.timestamp,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { issuesRouter } from "./controllers/issues.js";
import { checkoutRouter } from "./controllers/checkout.js";
import { ratioRouter } from "./controllers/ratio.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "gossip-test" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/issues", issuesRouter);
app.use("/checkout", checkoutRouter);
app.use("/ratio", ratioRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

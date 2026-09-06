// import express, { Request, Response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import patientRoutes from "./routes/patientRoutes.js";
// import staffRoutes from "./routes/staffRoutes.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.send("✅ MediBed-Sync TypeScript Backend Running");
// });

// app.use("/api/patients", patientRoutes);
// app.use("/api/staff", staffRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import patientRoutes from "./routes/patientRoutes";
import staffRoutes from "./routes/staffRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/patients", patientRoutes);
app.use("/api/staff", staffRoutes);

// Example route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 MediBed-Sync Backend Running Successfully!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

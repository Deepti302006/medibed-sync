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
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Example route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 MediBed-Sync Backend Running Successfully!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

import app from "../../backend/src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const server = app.listen(PORT, (req, res) => {
  console.log(`Server running on the port: ${PORT}`);
});

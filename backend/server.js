 require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

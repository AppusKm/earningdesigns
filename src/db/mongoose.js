const mongoose = require("mongoose");
const connectionURL = process.env.MONGODB_URL;
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
try {
  db.once("open", function () {
    console.log("connected to MONGODB");
  });
  mongoose.set("debug", true);
} catch (error) {
  console.log("MONGODB CONNECTION ERROR", error.message);
}

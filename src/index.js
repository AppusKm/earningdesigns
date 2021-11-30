const app = require("./app");
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`LISTEN THIS PORT TO RUN:PORT${port}`);
});

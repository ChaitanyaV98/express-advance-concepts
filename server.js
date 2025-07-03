import express from "express";
import configureCors from "./config/corsConfig.js";

const port = process.env.PORT || 3000;

const app = express();

//added configure cors middleware
app.use(configureCors());
//express json middleware
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
  // origin -> this tells that from which origins user can access the api
});

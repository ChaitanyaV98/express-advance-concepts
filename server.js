import express from "express";
import configureCors from "./config/corsConfig.js";
import { addTimeStamp, reqLogger } from "./middleware/customMiddleware.js";

const port = process.env.PORT || 3000;

const app = express();

//custom middleware
app.use(reqLogger); // this will help showing our req details
app.use(addTimeStamp); // this will add timestamp to the req obj

//added configure cors middleware
app.use(configureCors());
//express json middleware
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
  // origin -> this tells that from which origins user can access the api
});

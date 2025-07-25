import express from "express";
import configureCors from "./config/corsConfig.js";
import { addTimeStamp, reqLogger } from "./middleware/customMiddleware.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import { urlVersioning } from "./middleware/apiVersioning.js";
import { itemRoutes } from "./routes/item-routes.js";
import { createBasicRateLimiter } from "./middleware/rateLimiting.js";

const port = process.env.PORT || 3000;

const app = express();

//custom middleware
app.use(reqLogger); // this will help showing our req details
app.use(addTimeStamp); // this will add timestamp to the req obj

app.use(createBasicRateLimiter(20, 15 * 60 * 1000)); // 2 request per 15 minutes

//added configure cors middleware
app.use(configureCors());
//express json middleware
app.use(express.json());

app.use(urlVersioning("v1"));
app.use("/api/v1", itemRoutes);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
  // origin -> this tells that from which origins user can access the api
});

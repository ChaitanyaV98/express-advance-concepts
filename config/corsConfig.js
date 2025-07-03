import cors from "cors";

const configureCors = () => {
  return cors({
    // origin tells which domains can access/allowed to use our apis, other origins will be blocked
    origin: (origin, callback) => {
      const allowOrigins = [
        "http://localhost:3000", //  local origin access
        "https://yourStagingDomail.com",
        "https://yourCustomDomain.com", // production
      ];
      if (!origin || allowOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // origin or domain will have access to these metjods
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"], // these are headers that are allowed
    exposedHeaders: ["X-Total-Count", "Content-Range "], //exposedHeaders : tells what are the headers that can be exposed to the client i.e these headers will be as part of response
    credentials: true, //enables support for cookies,
    preflightContinue: false, //Pass the CORS preflight response to the next handler.
    maxAge: 600, //cache preflight responses for 10 min -> access controls max age
    optionsSuccessStatus: 204,
  });
};

export default configureCors;

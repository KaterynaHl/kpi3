const express = require("express");

const { coreModule, analyticsModule } = require("./container");

const createAuthRoutes = require("./src/presentation/routes/authRoutes"); 
const createPostRoutes = require("./src/presentation/routes/postRoutes");
const createAnalyticsRoutes = require("./src/modules/analytics/api/analyticsRoutes");

const errorMiddleware = require("./modules/core/presentation/middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Microblog Modular Monolith API",
  });
});

app.use("/auth", createAuthRoutes(coreModule));
app.use("/posts", createPostRoutes(coreModule));
app.use("/analytics", createAnalyticsRoutes(analyticsModule));

app.use(errorMiddleware);

module.exports = app;
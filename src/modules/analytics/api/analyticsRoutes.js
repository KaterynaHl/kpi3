const express = require("express");

const createAnalyticsRoutes = (analyticsModule) => {
  const router = express.Router();

  router.get("/summary", async (req, res, next) => {
    try {
      const summary = await analyticsModule.getSummary();

      res.json(summary);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = createAnalyticsRoutes;
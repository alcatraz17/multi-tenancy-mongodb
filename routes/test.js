const Router = require("express").Router;

const router = Router({
  mergeParams: true,
});

router.post("/add-data", async (req, res) => {
  res.json("Test route is working!");
});

module.exports = router;

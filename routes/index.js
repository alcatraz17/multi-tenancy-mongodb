const Router = require("express").Router;

const router = Router({
  mergeParams: true,
});

const testRoutes = require("./test");
const authRoutes = require("./auth");

router.use("/auth", authRoutes);

const authMiddleware = require("../middleware/authMiddleware");
const tenantDbMiddleware = require("../middleware/tenantDbMiddleware");
router.use("/test", testRoutes);

router.use(authMiddleware);
router.use(tenantDbMiddleware);

module.exports = router;

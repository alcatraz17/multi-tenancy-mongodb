const { getDatabase } = require("../db/connectionManager");

async function tenantDbMiddleware(req, res, next) {
  try {
    const { tenantId } = req.user;
    req.db = await getDatabase(tenantId);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to connect to the tenant database",
    });
  }
}

module.exports = tenantDbMiddleware;

const { MongoClient } = require("mongodb");

const connections = {};

async function getDatabase(tenantId) {
  if (!connections[tenantId]) {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    connections[tenantId] = client.db(tenantId);
  }
  return connections[tenantId];
}

async function tenantExists(tenantId, email) {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const RegisteredUsers = client.db("master").collection("users");
  const doesTenantExist = await RegisteredUsers.findOne({
    role: "SCHOOL",
    $or: [{ tenantId }, { email }],
  });

  const adminDb = client.db().admin();
  const databases = await adminDb.listDatabases();
  await client.close();

  return (
    databases.databases.some((db) => db.name === tenantId) || doesTenantExist
  );
}

module.exports = {
  getDatabase,
  tenantExists,
};

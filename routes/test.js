const Router = require("express").Router;
const faker = require("faker");

const router = Router({
  mergeParams: true,
});

router.post("/add-data", async (req, res) => {
  try {
    const db = await req.db;

    const data = Array.from({ length: 10 }, () => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
    }));

    await db.collection("testing").insertMany(data);

    return res.status(201).json({
      message: "Data added successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-data", async (req, res) => {
  try {
    const db = await req.db;

    const data = await db.collection("testing").find().toArray();

    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

const router = require("express").Router();
const { createUser } = require("../controllers/user.controller");
const upload = require("../upload");

router.post("/", upload.single("file"), createUser);

module.exports = router;

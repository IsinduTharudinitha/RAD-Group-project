const {createGuardian, viewGuardian, deleteGuardian, updateGuardian, getAllGuardians } = require('../Controllers/GuardianController');

const router = require("express").Router();

router.post("/create", createGuardian);
router.get("/:GuardianID", viewGuardian);
router.get("/", getAllGuardians);
router.delete("/delete/:GuardianID", deleteGuardian);
router.put("/update/:GuardianID", updateGuardian);


module.exports = router;
const {createChildren, viewChildren, deleteChildren, updateChildren, getAllChildrens } = require('../Controllers/ChildrenController');

const router = require("express").Router();

router.post("/create", createChildren);
router.get("/:ChildrenID", viewChildren);
router.get("/", getAllChildrens);
router.delete("/delete/:ChildrenID", deleteChildren);
router.put("/update/:ChildrenID", updateChildren);


module.exports = router;
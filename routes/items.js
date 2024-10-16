const express = require("express");

const router = express.Router();

const {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
} = require("../controllers/items");

///////////////////////////////////////////////////
router.route("/").post(createItem).get(getAllItems);

router.route("/:id").get(getItem).patch(updateItem).delete(deleteItem);

///////////////////////////////////////////////////
module.exports = router;

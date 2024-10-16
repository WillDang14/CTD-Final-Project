const Item = require("../models/Item");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/User");

///////////////////////////////////////////////
const getAllItems = async (req, res) => {
    const items = await Item.find({
        createdBy: req.user.userId,
    }).sort("createdAt");

    res.status(StatusCodes.OK).json({ count: items.length, items });
};

const getItem = async (req, res) => {
    // console.log(req.user); //==>> { userId: '66becb3fa0ac5cbb54f09921', name: 'will' }
    // console.log(req.params); // ==>> { id: '66bf9003667d3a2da0bf0925' }

    // Chú ý: cái này là nested Destructuring Object
    // ==>> userId = 66becb3fa0ac5cbb54f09921
    // ==>> jobId = 66bf9003667d3a2da0bf0925
    const {
        user: { userId },
        params: { id: itemId },
    } = req;

    // console.log(userId); // 66becb3fa0ac5cbb54f09921
    // console.log(jobId); //  66bf9003667d3a2da0bf0925

    const item = await Item.findOne({
        _id: itemId,
        createdBy: userId,
    });

    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }

    res.status(StatusCodes.OK).json({ item });
};

const createItem = async (req, res) => {
    // console.log(req.body);
    // console.log(req.user);

    req.body.createdBy = req.user.userId;

    // console.log(req.body);

    const item = await Item.create(req.body);

    res.status(StatusCodes.CREATED).json({ item });
};

const updateItem = async (req, res) => {
    const {
        body: { itemName, price, status },
        user: { userId },
        params: { id: itemId },
    } = req;

    if (itemName === "" || price === "") {
        throw new BadRequestError("Item name or Price can not be empty!");
    }

    const item = await Item.findByIdAndUpdate(
        { _id: itemId, createdBy: userId }, // find
        req.body, // update with this data
        { new: true, runValidators: true } // run validator
    );

    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }

    res.status(StatusCodes.OK).json({ item });
};

const deleteItem = async (req, res) => {
    const {
        user: { userId },
        params: { id: itemId },
    } = req;

    const item = await Item.findByIdAndDelete({
        _id: itemId,
        createdBy: userId,
    });

    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`);
    }

    // res.status(StatusCodes.OK).send(
    //     `Item \"${itemId}\" has successfully deleted!`
    // );

    // Sửa theo bài học week12
    res.status(StatusCodes.OK).json({
        msg: "The entry was deleted successfully!",
    });
};
///////////////////////////////////////////////
module.exports = {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
};

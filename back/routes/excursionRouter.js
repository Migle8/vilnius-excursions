const express = require("express");
const excursionController = require("../controllers/excursionController");
const authController = require("../controllers/authController");

const {
    getAllExcursions,
    getExcursionByID,
    postExcursion,
    updateExcursion,
    deleteExcursion,
    uploadImage,
    createMyExcursion,
    updateMyExcursion,
    deleteMyExcursion,
} = excursionController;

const { protect } = authController;

const excursionRouter = express.Router();

excursionRouter.route("/").get(getAllExcursions).post(uploadImage.single("image"), postExcursion);
excursionRouter.route("/:id").get(getExcursionByID).patch(uploadImage.single("image"), updateExcursion).delete(deleteExcursion);
excursionRouter.route("/myexcursions/:excursionId").post(protect, createMyExcursion).patch(protect, updateMyExcursion).delete(protect, deleteMyExcursion);

module.exports = excursionRouter;

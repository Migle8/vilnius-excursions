const Excursion = require("../models/excursionModel");
const User = require("../models/userModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../front/public/images"); // Specifies the directory to store the uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Generates a unique filename for each uploaded image
  },
});

exports.uploadImage = multer({ storage: storage });

exports.getAllExcursions = async (req, res) => {
  try {
    const excludedFields = ["page", "limit", "sort", "fields"];
    const filter = { ...req.query };
    excludedFields.forEach((key) => delete filter[key]);

    let queryString = JSON.stringify(filter);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    let query = Excursion.find(JSON.parse(queryString));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("date");
    }

    if (req.query.page) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skipValue = (page - 1) * limit;

      query = query.skip(skipValue).limit(limit);

      const excursionCount = await Excursion.countDocuments();
      if (skipValue >= excursionCount)
        throw new Error("This page doesn't exsit");
    }

    const excursions = await query;

    res.status(200).json({
      status: "success",
      results: excursions.length,
      data: { excursions },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getExcursionByID = async (req, res) => {
  try {
    const { id } = req.params;
    const findExcursion = await Excursion.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        excursion: findExcursion,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.postExcursion = async (req, res) => {
  try {
    const newExcursion = await Excursion.create({
      ...req.body,
      image: `/images/${req.file.originalname}`,
    });

    res.status(201).json({
      status: "success",
      data: { excursion: newExcursion },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateExcursion = async (req, res) => {
  try {
    // const { id } = req.params;
    // const updatedFields = req.body;
    // const updatedExcursion = await Excursion.findByIdAndUpdate(
    //   id,
    //   ...updatedFields,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/images/${req.file.originalname}`;
    }

    const updatedExcursion = await Excursion.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { excursion: updatedExcursion },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteExcursion = async (req, res) => {
  try {
    const { id } = req.params;
    // const deletedExcursion =
    await Excursion.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.createMyExcursions = async (req, res) => {
//   // console.log(req.params.excursionId);
//   // console.log("user ID" + req.user._id);

//   try {
//     const excursionId = req.params.excursionId;
//     const userId = req.user._id;

//     const excursion = await Excursion.findById(excursionId);
//     const dates = excursion.date;
//     // let images;
//     // if (req.file) {
//     //   images = `/images/${req.file.originalname}`;
//     // } else {
//     //   images = '';
//     // }
//     // const newTour = await Tour.create({ ...req.body, user: req.user._id });

//     await User.findByIdAndUpdate(userId, {
//       $push: {
//         excursions: excursionId,
//         date: dates,
//       },
//     });

//     res.status(201).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

exports.createMyExcursion = async (req, res) => {
  try {
    const excursionId = req.params.excursionId;
    const userId = req.user._id;
    const { date } = req.body;

    // Ensure `dates` is a string
    const dateStr = Array.isArray(date) ? date[0] : date;

    await User.findByIdAndUpdate(userId, {
      $push: { excursions: { excursionId, date: dateStr } },
    });

    res.status(201).json({
      status: "success",
      data: null,
      message: "Excursion created successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.updateMyExcursion = async (req, res) => {
//   try {
//     const excursionId = req.params.excursionId;
//     const userId = req.user._id;
//     const { date, rating, comment } = req.body;
//     await User.findByIdAndUpdate(userId, {
//       $pull: { excursions: { excursionId } },
//     });

//     await User.findByIdAndUpdate(userId, {
//       $push: { excursions: { excursionId, date, rating, comment,
//       },
//     },
//     });

//     res.status(200).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

exports.updateMyExcursion = async (req, res) => {
  try {
    const excursionId = req.params.excursionId;
    const userId = req.user._id;
    const { date, rating, comment } = req.body;

    // Remove the existing excursion
    await User.findByIdAndUpdate(userId, {
      $pull: { excursions: { excursionId } },
    });

    // Push the updated excursion with separate fields
    await User.findByIdAndUpdate(userId, {
      $push: {
        excursions: {
          excursionId,
          date, // Separate field for date
          rating, // Separate field for rating
          comment, // Separate field for comment
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteMyExcursion = async (req, res) => {
  try {
    const excursionId = req.params.excursionId;
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, {
      $pull: { excursions: { excursionId } },
    });
    res.status(204).json({
      status: "success",
      data: null,
      message: "Excursion deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

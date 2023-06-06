const Notes = require("../models/Notes");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_name: "dcl6c7qan",
  // api_key: process.env.CLOUDINARY_API_KEY,
  api_key: "178925142318846",
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  api_secret: "Hfl-LF8dHYlCI0yRbX7ZrQVL5XQ",
});

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
};

const addNotes = async (req, res) => {
  // console.log(req.body); // Add this line
  // console.log(req.user)
  try {
    // const file = req.files.image;
    const file = req.files.file;
    // console.log(file);
    cloudinary.uploader.upload(
      file.tempFilePath,
      {
        upload_preset: "iNotebook",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
      },
      async (err, result) => {
        if (err) {
          console.log(err, "error in cloudinary");
        }
        console.log(result);
        const { title, description, tag } = req.body;

        const notes = new Notes({
          imagePath: result.secure_url,
          // title: 'Test Note Title',
          description: description,
          title: title,
          tag: tag,
          user: req.user.id,
        });
        const savedNotes = await notes.save();
        res.status(200).json(savedNotes);
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
};
const updateNotes = async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOt Allowed");
    }
    if (req.body.imagePath !== "") {
      const imageUrl = note.imagePath;
      const urlArray = imageUrl.split("/");
      const image = urlArray[urlArray.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        cloudinary.uploader.destroy(imageName, function (error, result) {
          console.log(result, error);
        });
      }
      const file = req.files.file;
      console.log(file);
      cloudinary.uploader.upload(
        file.tempFilePath,
        {
          upload_preset: "iNotebook",
          allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
          crop: "scale",

        },
        async (err, result) => {
          if (err) {
            console.log(err, "error in cloudinary");
          }
          console.log(result);
          note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: req.body, imagePath: result.secure_url },
            { new: true }
          );
          res.status(200).json(note);

        }
      );
    }

    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
};


const deleteNotes = async (req, res) => {
  try {
    const imageUrl = req.query.imageUrl;
    const urlArray = imageUrl.split("/");
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split(".")[0];
    let note = await Notes.findById(req.query.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOt Allowed");
    }
    note = await Notes.findByIdAndDelete(req.query.id);
    cloudinary.uploader.destroy(imageName, function (error, result) {
      console.log(result, error);
    });
    res.status(200).json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
};

module.exports = {
  getNotes,
  addNotes,
  updateNotes,
  deleteNotes,
};

import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(cors());

// IMAGE
const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/imgs/learned");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// VIDEO
const storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/videos/learned");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({ storage: storageImage });
const uploadVideo = multer({ storage: storageVideo });

// API
app.post("/upload-images", uploadImage.array("images"), (req, res) => {
  res.json(req.files.map((f) => f.filename));
});

app.post("/upload-video", uploadVideo.single("video"), (req, res) => {
  res.json(req.file.filename);
});

// STATIC
app.use("/imgs/learned", express.static("src/assets/imgs/learned"));
app.use("/videos/learned", express.static("src/assets/videos/learned"));

app.listen(5000, () => {
  console.log("Server chạy tại http://localhost:5000");
});

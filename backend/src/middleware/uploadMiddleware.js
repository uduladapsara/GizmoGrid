const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, path.join(__dirname, "..", "uploads", "products"));
	},
	filename(req, file, cb) {
		const ext = path.extname(file.originalname);
		cb(null, `${Date.now()}-${file.fieldname}${ext}`);
	},
});

const fileFilter = (req, file, cb) => {
	const allowed = /jpg|jpeg|png|webp/;
	const ext = path.extname(file.originalname).toLowerCase();
	if (allowed.test(ext)) {
		cb(null, true);
	} else {
		cb(new Error("Images only"));
	}
};

const upload = multer({ storage, fileFilter });

module.exports = {
	upload,
};

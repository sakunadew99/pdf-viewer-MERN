// backend/controllers/pdfController.js
const PDF = require('../models/PDF');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Not a PDF file'), false);
  }
};

const upload = multer({ storage, fileFilter });

exports.uploadPDF = upload.single('pdf');

exports.savePDF = async (req, res) => {
  try {
    const newPDF = new PDF({
      user: req.user._id,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    const savedPDF = await newPDF.save();
    res.status(201).json(savedPDF);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPdfs = async (req, res) => {
  try {
    const pdfs = await PDF.find({ user: req.user._id });
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPdf = async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);

    if (pdf) {
      res.sendFile(path.resolve(pdf.path));
    } else {
      res.status(404).json({ message: 'PDF not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// backend/routes/pdfs.js
const express = require('express');
const { uploadPDF, savePDF, getPdfs, getPdf } = require('../controllers/pdfController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getPdfs).post(protect, uploadPDF, savePDF);
router.route('/:id').get(protect, getPdf);

module.exports = router;

const express = require('express');

const router = express.Router();

const { upload } = require('../../middlewares/index');

router.post('/upload', upload.single('avatar'), async (req, res) => {
    console.log(req.body); 
    console.log(req.file);
});

module.exports = router;

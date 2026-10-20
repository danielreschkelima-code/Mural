const express = require('express');
const db = require('../database');

const router = express.Router();

// GET /oportunidades - lista todos os registros
router.get('/', (req, res) => {
    const oportunidades = db.prepare('SELECT * FROM oportunidades ORDER BY prazo').all();
    res.json(oportunidades);
});

module.exports = router;
const express = require('express');
const cors = require('cors');
const rotasOportunidades =  require('./routes/oportunidades.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({mensagem: 'API do Mural de Oportunidades'});
});

app.use('/oportunidades', rotasOportunidades);

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
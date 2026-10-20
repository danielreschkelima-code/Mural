const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, '..', 'mural.db'));

db.exec(`
    CREATE TABLE IF NOT EXISTS oportunidades(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo      TEXT NOT NULL,
    tipo        TEXT NOT NULL CHECK (tipo IN ('estagio', 'curso', 'evento')),
    instituicao TEXT NOT NULL, 
    modalidade  TEXT NOT NULL CHECK(modalidade IN ('presencial', 'online', 'hibrido')),
    prazo       TEXT NOT NULL,
    link        TEXT,
    descricao   TEXT,
    criado_em   TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
`);
   
module.exports = db;
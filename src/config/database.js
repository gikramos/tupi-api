const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, '../config/database.db');

const db = new sqlite3.Database(dbPath, (erro) => {
  if (erro) {
    console.error('❌ Erro ao conectar:', erro);
  } else {
    console.log('✅ Conectado ao SQLite!');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      nome      varchar(80)    NOT NULL,
      preco     decimal(10,2)    NOT NULL,
      estoque   INTEGER NOT NULL,
      categoria varchar(50)    NOT NULL
    )
  `, (erro) => {
    if (erro) {
      console.error('❌ Erro ao criar tabela:', erro);
    } else {
      console.log('✅ Tabela produtos verificada/criada');
    }
  });
});

module.exports = db;

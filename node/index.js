const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const mysql = require('mysql');

const connection = mysql.createConnection(config);

const select = `SELECT id, name from people;`;

['Rafael', 'Diego', 'Vicente', 'Paulo', 'Rubens'].forEach((name) => {
  const insert = `INSERT INTO people(name) values('${name}');`;

  connection.query(insert);
});

app.get('/', (req, res) => {
  let result = '<h1>Full Cycle Rocks!</h1>';

  connection.query(select, (error, results) => {
    if (!error) {
      for (const r of results) {
        result += `<p>${r.name}</p>`;
      }
    }

    res.send(result);
  });
});

app
  .listen(port, () => {
    console.log(`Rodando na porta: ${port}`);
  })
  .on('close', () => connection.end());

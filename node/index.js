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

boot();

app.get('/', (req, res) => {
  let result = '<h1>Full Cycle Rocks!</h1>';

  const connection = mysql.createConnection(config);

  const select = `SELECT id, name from people;`;

  connection.query(select, (error, results) => {
    if (!error) {
      for (const r of results) {
        result += `<p>${r.name}</p>`;
      }
    }

    connection.end();

    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`);
});

function boot() {
  const connection = mysql.createConnection(config);

  const create = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255) not null, Primary key(id));`;

  connection.query(create);

  ['Rafael', 'Diego', 'Vicente', 'Paulo', 'Rubens'].forEach((name) => {
    const insert = `INSERT INTO people(name) values('${name}');`;

    connection.query(insert);
  });

  connection.end();
}

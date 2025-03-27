const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/api/save-data', (req, res) => {
  fs.writeFile('./src/assets/data.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});
app.delete('/api/delete-data/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('./src/assets/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data');
      return;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.error(parseErr);
      res.status(500).send('Error parsing data');
      return;
    }

    const updatedData = jsonData.filter(item => item.id !== id);

    fs.writeFile('./src/assets/data.json', JSON.stringify(updatedData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        res.status(500).send('Error saving updated data');
      } else {
        res.status(200).send('Data deleted successfully');
      }
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
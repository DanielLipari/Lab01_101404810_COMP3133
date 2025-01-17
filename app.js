const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

[canadaFile, usaFile].forEach((file) => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`${file} deleted`);
  }
});

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const { country } = row;

    if (country.toLowerCase() === 'canada') {
      fs.appendFileSync(canadaFile, `${Object.values(row).join(',')}\n`);
    } else if (country.toLowerCase() === 'united states') {
      fs.appendFileSync(usaFile, `${Object.values(row).join(',')}\n`);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
    console.log('Filtered data written to canada.txt and usa.txt.');
  });
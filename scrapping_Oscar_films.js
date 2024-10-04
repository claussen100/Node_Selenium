import { Builder, Browser, By, Key } from "selenium-webdriver";
import pkg from "pg";
import dotenv from "dotenv";
const { Client } = pkg;
dotenv.config();

(async function scrapping_oscar_films() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get("https://google.com.br");

  await driver
    .findElement(By.xpath("//*[@id='APjFqb']"))
    .sendKeys("List of Academy Award winning films", Key.ENTER);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  await driver.findElement(By.xpath("//*[@id='rso']/div[1]")).click();

  let table = await driver.findElement(
    By.className("wikitable sortable jquery-tablesorter")
  );

  let rows = await table.findElements(By.css("tr"));
  let tableData = [];
  let maxRows = 206; //Limite para captura de filmes entre 2010 - 2024
  let rowCount = 0;

  for (let row of rows) {
    if (rowCount >= maxRows) break;

    let cells = await row.findElements(By.css("td"));
    let rowData = [];

    for (let cell of cells) {
      let cellText = await cell.getText();
      rowData.push(cellText);
    }

    if (rowData.length > 0) {
      tableData.push(rowData);
      rowCount++;
    }
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
  });

  await client.connect();

  const jsonData = JSON.stringify(tableData, null, 2);
  console.log(jsonData);

  const insertData = async () => {
    try {
      for (let item of tableData) {
        const query = `INSERT INTO award_winning_films (film, year, awards, nominations) VALUES ($1, $2, $3, $4)`;
        const values = [
          item[0],
          parseInt(item[1]),
          parseInt(item[2]),
          parseInt(item[3]),
        ];
        await client.query(query, values);
      }
      console.log("Dados inseridos com sucesso");
    } catch (err) {
      console.error("Erro ao inserir os dados", err);
    } finally {
      await client.end();
    }
  };

  await insertData();
})();

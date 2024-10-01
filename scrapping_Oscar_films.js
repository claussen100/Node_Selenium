import { Builder, Browser, By, Key } from "selenium-webdriver";

(async function scrapping_oscar_films() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get("https://google.com.br");

  await driver
    .findElement(By.xpath("//*[@id='APjFqb']"))
    .sendKeys("List of Academy Award winning films", Key.ENTER);

  await driver.findElement(By.xpath("//*[@id='rso']/div[1]")).click(); //Estudar uma melhor captura de campo ao invés do xpath neste cenário.

  let table = await driver.findElement(
    By.className("wikitable sortable jquery-tablesorter")
  );

  let rows = await table.findElements(By.css("tr"));

  let tableData = [];

  for (let row of rows) {
    let cells = await row.findElements(By.css("td"));
    let rowData = [];

    for (let cell of cells) {
      let cellText = await cell.getText();
      rowData.push(cellText);
    }

    if (rowData.length > 0) {
      tableData.push(rowData);
    }
  }

  let filteredData = tableData.filter((row) => {
    return row[1] && Number(row[1]) > 2000;
  });

  console.log(JSON.stringify(filteredData, null, 2));
})();

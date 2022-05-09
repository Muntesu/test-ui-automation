import { By } from "selenium-webdriver";

export class ProductsPage {
  constructor(driver) {
    this.driver = driver;
  }

  getTitle() {
    return this.driver
      .findElement(
        By.css("#header_container > div.header_secondary_container > span")
      )
      .getText();
  }

  async getItemName(itemNumber) {
    const elements = await this.driver.findElements(
      By.className("inventory_item_name")
    );
    return elements[itemNumber].getText();
  }

  async getItemPrice(itemNumber) {
    const elements = await this.driver.findElements(
      By.className("inventory_item_price")
    );
    return elements[itemNumber].getText();
  }

  async addToCart(itemNumber) {
    const elements = await this.driver.findElements(
      By.className("btn btn_primary btn_small btn_inventory")
    );
    return elements[itemNumber].click();
  }
}

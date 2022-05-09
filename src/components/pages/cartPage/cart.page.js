import { By } from "selenium-webdriver";

export class CartPage {
  constructor(driver) {
    this.driver = driver;
  }

  getTitle() {
    return this.driver.findElement(By.className("title")).getText();
  }

  getItemName() {
    return this.driver
      .findElement(By.className("inventory_item_name"))
      .getText();
  }

  getItemPrice() {
    return this.driver
      .findElement(By.className("inventory_item_price"))
      .getText();
  }

  clickCheckoutButton() {
    return this.driver
      .findElement(By.className("btn btn_action btn_medium checkout_button"))
      .click();
  }
}

import { By } from "selenium-webdriver";

export class ThirdCheckoutPage {
  constructor(driver) {
    this.driver = driver;
  }

  getTitle() {
    return this.driver.findElement(By.className("title")).getText();
  }

  getPrimaryDescription() {
    return this.driver.findElement(By.className("complete-header")).getText();
  }

  getSecondaryDescription() {
    return this.driver.findElement(By.className("complete-text")).getText();
  }

  clickButtonBackHome() {
    return this.driver
      .findElement(By.className("btn btn_primary btn_small"))
      .click();
  }
}

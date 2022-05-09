import { By } from "selenium-webdriver";

export class FirstCheckoutPage {
  constructor(driver) {
    this.driver = driver;
  }

  getTitle() {
    return this.driver.findElement(By.className("title")).getText();
  }

  enterFirstName(firstName) {
    return this.driver.findElement(By.id("first-name")).sendKeys(firstName);
  }

  enterLastName(lastName) {
    return this.driver.findElement(By.id("last-name")).sendKeys(lastName);
  }

  enterZipCode(zip) {
    return this.driver.findElement(By.id("postal-code")).sendKeys(zip);
  }

  clickContinueButton() {
    return this.driver.findElement(By.id("continue")).click();
  }
}

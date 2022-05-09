import { By } from "selenium-webdriver";

export class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  open() {
    return this.driver.get("https://www.saucedemo.com/");
  }

  enterUsername(username) {
    return this.driver.findElement(By.id("user-name")).sendKeys(username);
  }

  enterPassword(password) {
    return this.driver.findElement(By.id("password")).sendKeys(password);
  }

  clickLoginButton() {
    return this.driver.findElement(By.id("login-button")).click();
  }
}

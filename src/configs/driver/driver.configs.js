import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

export function runChromeDriver() {
  let service = new chrome.ServiceBuilder("./src/configs/driver/chromedriver");
  return new Builder().forBrowser("chrome").setChromeService(service).build();
}

export function maximizeWindow(driver) {
  return driver.manage().window().maximize();
}

import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

export function runChromeDriver() {
    return new Builder().forBrowser("chrome").build();
}

export function maximizeWindow(driver) {
    return driver
        .manage()
        .window()
        .maximize();
}

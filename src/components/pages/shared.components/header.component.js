import {By} from "selenium-webdriver";

export class HeaderComponent {
    constructor(driver) {
        this.driver = driver
    }

    getShoppingCartAmount() {
        return this.driver.findElement(By.className("shopping_cart_badge")).getText();
    }

    clickCartBadge() {
        return this.driver.findElement(By.className("shopping_cart_badge")).click();
    }
}
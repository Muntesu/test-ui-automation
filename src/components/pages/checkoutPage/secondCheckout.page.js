import {By} from "selenium-webdriver";

export class SecondCheckoutPage {
    constructor(driver) {
        this.driver = driver
    }

    getTitle() {
        return this.driver.findElement(By.className("title")).getText();
    }

    getItemName() {
        return this.driver.findElement(By.className("inventory_item_name")).getText();
    }

    getItemPrice() {
        return this.driver.findElement(By.className("inventory_item_price")).getText();
    }

    async getInfoLabel(index) {
        const elements = await this.driver.findElements(By.className("summary_info_label"));
        return elements[index].getText();
    }

    async getInfoValue(index) {
        const elements = await this.driver.findElements(By.className("summary_value_label"));
        return elements[index].getText();
    }

    getTax() {
        return this.driver.findElement(By.className("summary_tax_label")).getText();
    }

    getTotalPrice() {
        return this.driver.findElement(By.className("summary_total_label")).getText();
    }

    clickFinishButton() {
        return this.driver.findElement(By.className("btn btn_action btn_medium cart_button")).click();
    }
}
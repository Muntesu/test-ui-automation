import { expect } from "chai";
import {runChromeDriver} from "../configs/driver.configs.js";
import {maximizeWindow} from "../configs/driver.configs.js";
import {LoginPage} from "../components/pages/loginPage/login.page.js";
import {ProductsPage} from "../components/pages/productsPage/products.page.js";
import {HeaderComponent} from "../components/pages/shared.components/header.component.js";
import {CartPage} from "../components/pages/cartPage/cart.page.js";
import {FirstCheckoutPage} from "../components/pages/checkoutPage/firstCheckout.page.js";
import {SecondCheckoutPage} from "../components/pages/checkoutPage/secondCheckout.page.js";
import {ThirdCheckoutPage} from "../components/pages/checkoutPage/thirdCheckout.page.js";
import faker from "@faker-js/faker";

describe("Purchase flow", () => {
    let chromeDriver;
    let maximizedWindow;
    let loginPage;
    let productsPage;
    let headerComponent;
    let cartPage;
    let firstCheckoutPage;
    let secondCheckoutPage;
    let itemName;
    let itemPrice;
    let thirdCheckoutPage;
    const randomFirstName = `${faker.name.firstName()}`;
    const randomLastName = `${faker.name.lastName()}`;
    const randomZip = `${faker.address.zipCode()}`;

    before(async () => {
        chromeDriver = await runChromeDriver();
        maximizedWindow = await maximizeWindow(chromeDriver);
        loginPage = new LoginPage(chromeDriver);
        productsPage = new ProductsPage(chromeDriver);
        headerComponent = new HeaderComponent(chromeDriver);
        cartPage = new CartPage(chromeDriver)
        firstCheckoutPage = new FirstCheckoutPage(chromeDriver);
        secondCheckoutPage = new SecondCheckoutPage(chromeDriver);
        thirdCheckoutPage = new ThirdCheckoutPage(chromeDriver);
    });

    it("Pass authorization" , async () => {
        await loginPage.open();
        await loginPage.enterUsername("standard_user");
        await loginPage.enterPassword("secret_sauce");
        await loginPage.clickLoginButton();
        expect(await productsPage.getTitle()).equal("PRODUCTS")
    });

    it("Add product to cart", async () => {
        // Get random product from the list (any of 1-6)
        const randomItem = Math.random() * 5 | 0;
        // Get name and price of random product
        itemName = await productsPage.getItemName(randomItem);
        itemPrice = await productsPage.getItemPrice(randomItem);
        // User adds product to cart
        await productsPage.addToCart(randomItem);
        // Amount of items in the cart has to be changed to 1
        expect(await headerComponent.getShoppingCartAmount()).equal('1');
        // User taps on cart badge
        await headerComponent.clickCartBadge();
        expect(await cartPage.getTitle()).equal('YOUR CART');
    });

    it("Make checkout on screen 'Your cart'", async () => {
        expect(await cartPage.getItemName()).equal(itemName);
        expect(await cartPage.getItemPrice()).equal(itemPrice);
        await cartPage.clickCheckoutButton();
        expect(await firstCheckoutPage.getTitle()).equal('CHECKOUT: YOUR INFORMATION');
    });

    it('Send personal information', async () => {
        await firstCheckoutPage.enterFirstName(randomFirstName);
        await firstCheckoutPage.enterLastName(randomLastName);
        await firstCheckoutPage.enterZipCode(randomZip);
        await firstCheckoutPage.clickContinueButton();
        expect(await secondCheckoutPage.getTitle()).equal('CHECKOUT: OVERVIEW');
    });

    it('Make checkout overview', async () => {
        expect(await secondCheckoutPage.getItemName()).equal(itemName);
        expect(await secondCheckoutPage.getItemPrice()).equal(itemPrice);
        expect(await secondCheckoutPage.getInfoLabel(0)).equal('Payment Information:');
        expect(await secondCheckoutPage.getInfoValue(0)).equal('SauceCard #31337');
        expect(await secondCheckoutPage.getInfoLabel(1)).equal('Shipping Information:');
        expect(await secondCheckoutPage.getInfoValue(1)).equal('FREE PONY EXPRESS DELIVERY!');
        const tax = await secondCheckoutPage.getTax();
        // Extract numbers from price and tax strings
        const extractPrice = Number(itemPrice.match(/\d+(\.\d+)?/)[0]);
        const extractTax = Number(tax.match(/\d+(\.\d+)?/)[0]);
        // Calculate final amount (item price + tex)
        expect(await secondCheckoutPage.getTotalPrice()).equal(`Total: $${(extractPrice + extractTax) * 100/100}`);
        // Finish purchase flow
        await secondCheckoutPage.clickFinishButton();
        expect(await thirdCheckoutPage.getTitle()).equal('CHECKOUT: COMPLETE!');
    });

    it('Checkout complete', async () => {
        expect(await thirdCheckoutPage.getPrimaryDescription()).equal('THANK YOU FOR YOUR ORDER');
        expect(await thirdCheckoutPage.getSecondaryDescription()).equal('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await thirdCheckoutPage.clickButtonBackHome();
        expect(await productsPage.getTitle()).equal("PRODUCTS")
    })

    after(async () => {
        await chromeDriver.quit();
    });
});
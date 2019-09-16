const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const puppeteer = require('puppeteer');

var URL = new Map();
URL.set("Google", "https://google.com");

Given('I am on the {string} homepage', async function (pageURL) {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(URL.get(pageURL));
    await browser.close();
  });
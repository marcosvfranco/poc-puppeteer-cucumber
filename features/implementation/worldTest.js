 
const { setWorldConstructor } = require("cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(10 * 1000);

var stageURL = "https://anonprod:TcCcAnon&1@tccc-stage64-nag-webtests.aem.coke.com"
var catalogURL = "/en/mktsrv/catalog/?catalog=eyJpdGVtcyI6W3siaWQiOjEsIm5hbWUiOiJDT0xMRUNUSU9OIiwia2luZCI6IkNPTExFQ1RJT04iLCJ0eXBlIjoiVklSVFVBTCIsImNvbnRlc3RUeXBlIjpudWxsLCJpbWFnZVVybCI6IkNPS0VfQ09NL2NhdGFsb2dfcmV2aWV3LzMyOTMxLWZlYXR1cmVkLmpwZyIsInByaW1hcnlfY2F0YWxvZyI6IldFQlRFU1RfRkFMTF9GT09UQkFMTCIsImFsdCI6Iml0ZW0gMSBhbHQifSx7ImlkIjoyMjIyMiwibmFtZSI6IlBBUlRJQUxMWV9SRURFRU1FRF9QSFlTSUNBTCIsImtpbmQiOiJDT05URVNUIiwidHlwZSI6IlRISVJEX1BBUlRZX1BIWVNJQ0FMIiwiY29udGVzdFR5cGUiOiJJTlNUQU5UX1dJTiIsImltYWdlVXJsIjoiQ09LRV9DT00vY2F0YWxvZ19yZXZpZXcvMzI3ODUtZmVhdHVyZWQuanBnIiwicHJpbWFyeV9jYXRhbG9nIjoiV0VCVEVTVF9GQUxMX0ZPT1RCQUxMIiwiYWx0IjoiaXRlbSAyMjIyMiBhbHQifSx7ImlkIjoxMTExMSwibmFtZSI6IlBBUlRJQUxMWV9SRURFRU1FRF9MT1lBTFRZIiwia2luZCI6IkNPTlRFU1QiLCJ0eXBlIjoiTE9BRF9UT19DQVJEIiwiY29udGVzdFR5cGUiOiJJTlNUQU5UX1dJTiIsImltYWdlVXJsIjoiQ09LRV9DT00vY2F0YWxvZ19yZXZpZXcvMzM0OTItZmVhdHVyZWQuanBnIiwicHJpbWFyeV9jYXRhbG9nIjoiV0VCVEVTVF9GQUxMX0ZPT1RCQUxMIn0seyJpZCI6MzMzMzMsIm5hbWUiOiJBVVRPX1JFREVFTUVEIiwia2luZCI6IkdBTUUiLCJ0eXBlIjoiQVVUT19SRURFRU1FRCIsImNvbnRlc3RUeXBlIjoiR0FNRSIsImltYWdlVXJsIjoiQ09LRV9DT00vY2F0YWxvZ19yZXZpZXcvMzI3ODMtZmVhdHVyZWQuanBnIiwicHJpbWFyeV9jYXRhbG9nIjoiV0VCVEVTVF9GQUxMX0ZPT1RCQUxMIn0seyJpZCI6NDQ0NDQsIm5hbWUiOiJTV0VFUFNUQUtFUyIsImtpbmQiOiJDT05URVNUIiwidHlwZSI6IlNXRUVQU1RBS0VTIiwiY29udGVzdFR5cGUiOiJTV0VFUFNUQUtFUyIsImltYWdlVXJsIjoiQ09LRV9DT00vY2F0YWxvZ19yZXZpZXcvMzI3ODMtZmVhdHVyZWQuanBnIiwicHJpbWFyeV9jYXRhbG9nIjoiV0VCVEVTVF9GQUxMX0ZPT1RCQUxMIn0seyJpZCI6MiwibmFtZSI6IkRFRkFVTFRfRVJST1IgLSBJVEVNIEVSUk9SIiwia2luZCI6IkdBTUUiLCJ0eXBlIjoiQVVUT19SRURFRU1FRCIsImNvbnRlc3RUeXBlIjoiR0FNRSIsImltYWdlVXJsIjoiQ09LRV9DT00vY2F0YWxvZ19yZXZpZXcvMzI3ODMtZmVhdHVyZWQuanBnIiwicHJpbWFyeV9jYXRhbG9nIjoiV0VCVEVTVF9GQUxMX0ZPT1RCQUxMIn0seyJpZCI6NjY2NjYsIm5hbWUiOiJDVVNUT01fRVJST1JfSU5TVEFOVF9XSU4gLSBJVEVNIEVSUk9SIiwia2luZCI6IkdBTUUiLCJ0eXBlIjoiQVVUT19SRURFRU1FRCIsImNvbnRlc3RUeXBlIjoiR0FNRSIsImltYWdlVXJsIjoiQ09LRV9DT00vY2F0YWxvZ19yZXZpZXcvMzI3ODMtZmVhdHVyZWQuanBnIiwicHJpbWFyeV9jYXRhbG9nIjoiV0VCVEVTVF9GQUxMX0ZPT1RCQUxMIn0seyJpZCI6OTk5OTksIm5hbWUiOiJDVVNUT01fRVJST1JfU1dFRVBTIC0gVE9QIEVSUk9SIiwia2luZCI6IkNPTlRFU1QiLCJ0eXBlIjoiU1dFRVBTVEFLRVMiLCJjb250ZXN0VHlwZSI6IlNXRUVQU1RBS0VTIiwiaW1hZ2VVcmwiOiJDT0tFX0NPTS9jYXRhbG9nX3Jldmlldy8zMjc4My1mZWF0dXJlZC5qcGciLCJwcmltYXJ5X2NhdGFsb2ciOiJXRUJURVNUX0ZBTExfRk9PVEJBTEwifV19"
var firstButtonSelector = "#_f23a152d-6a44-453e-b1c1-76e0c13e3d7d_pageContent_catalog > div.catalog-content-wrapper > ul > li:nth-child(1) > claim-it-btn > button > span"

class CatalogTest {
    
    constructor() {
        this.todo = "";
    }

    setTodo(todo) {
        this.todo = todo
    }

    async openCatalogPage(){
        this.browser = await puppeteer.launch({ headless: false , timeout: 10000 })
        this.page = await this.browser.newPage()
        await this.page.goto(stageURL + catalogURL)
        await this.page.screenshot({path: 'catalogPage.jpg'})
    }

    async clickFirstItem(){
        await this.page.click(firstButtonSelector)
    }

    async closeCatalogPage(){
        await this.browser.close()
    }
}

setWorldConstructor(CatalogTest);
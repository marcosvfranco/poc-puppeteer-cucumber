const { Given, When, Then, After, Before } = require("cucumber");

    Before(async function() {
        return await this.openCatalogPage()
    })

    After(async function() {
        return await this.closeCatalogPage()
    })

    Given('the user is on the {string} homepage', function (pageURL) {
        return this.setTodo(pageURL)
    })

    When('the user clicks on first Catalog Item', async function(){
        return this.clickFirstItem()
    })

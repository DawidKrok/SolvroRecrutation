header = `<div><h1>NAME</h1><h1>PRICE</h1><h1>QUANTITY</h1><h1>TOTAL</h1></div>`
sum = 0

populateProducts = async cart => {
    if(!cart.length)
        return products_container.innerHTML = "<h1>Cart is empty<h1>"

    products_container.innerHTML = header

    sum = 0

    for(entry of cart) {
        // get product based on productId
        p = await dataFetch("getProduct", {id: entry.productId})

        node = $("<div class='product_card'></div>")
        node.append(`<h2>${p.name}</h2>`)
        node.append(`<p>${p.price}$</p>`)
        node.append(`<p>${entry.quantity}</p>`)
        node.append(`<p>${entry.quantity*p.price}$</p>`)

        sum += entry.quantity*p.price

        products_container.append(node[0])
    }

    updateSum()
}

updateSum = () => {
    sum_display.innerHTML = `Sum: ${sum}$`
}

authorizedFetch("getCart")
.then(populateProducts)
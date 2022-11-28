header = `<div><h1>NAME</h1><h1>PRICE</h1><h1>QUANTITY</h1></div>`

populateProducts = async cart => {
    if(!cart.length)
        return products_container.innerHTML = "<h1>Cart is empty<h1>"

    products_container.innerHTML = header

    for(var entry of cart) {
        // get product based on productId
        p = await dataFetch("getProduct", {id: entry.productId})

        node = $("<div class='product_card'></div>")
        node.append(`<h2>${p.name}</h2>`)
        node.append(`<p>${p.price}$</p>`)
        
        let q_input = $(`<input type="number" value=${entry.quantity}>`)
        q_input.on("change", e => {
            authorizedFetch("setProductInCart", {
                id: entry.productId,
                quantity: e.target.value
            }).then(cart => {
                updateSum(cart)
            })
        })
        
        node.append(q_input)
        products_container.append(node[0])
    }

    updateSum(cart)
}

// Display final price based on cart's content, promo codes and delivery
updateSum = async cart => {
    sum = 0

    // not optimal but that is a problem for frontend not backend
    for(var entry of cart) {
        // get product based on productId
        p = await dataFetch("getProduct", {id: entry.productId})

        sum += entry.quantity*p.price
    }

    sum_display.innerHTML = `Sum: ${sum}$`
}

authorizedFetch("getCart")
.then(populateProducts)
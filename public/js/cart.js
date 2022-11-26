populateProducts = async cart => {
    if(!cart.length)
        return products_container.innerHTML = "<h1>Cart is empty<h1>"

    for(entry of cart) {
        // get product based on productId
        p = await dataFetch("getProduct", {id: entry.productId})

        node = $("<div class='product_card'></div>")
        node.append(`<h2>${p.name}</h2>`)
        node.append(`<p>${p.price}$</p>`)
        node.append(`<p>${entry.quantity}</p>`)
        node.append(`<p>${entry.quantity*p.price}$</p>`)

        products_container.append(node[0])
    
    }
}

authorizedFetch("getCart")
.then(populateProducts)
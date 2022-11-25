populateProducts = products => {
    for(p of products) {
        node = $("<div class='product_card'></div>")
        node.append(`<h2>${p.name}</h2>`)
        node.append(`<p>${p.price}$</p>`)

        products_container.append(node[0])
    }
}

dataFetch("getAllProducts")
.then(populateProducts)

cart.onclick = () => {
    window.location.replace("/cart")
}
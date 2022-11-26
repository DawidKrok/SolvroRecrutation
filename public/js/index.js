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

$("#cart").on("click",  () => {
    window.location.replace("/cart")
})

$("#login").on("click", () => {
    console.log("kkkkkk")
    window.location.replace("/login")
})
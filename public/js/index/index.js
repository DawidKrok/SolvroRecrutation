populateProducts = products => {
    for(let p of products) {
        node = $(`<div class='product_card'></div>`)
        node.on("click", () => addToCart(p._id))
        node.append(`<h2>${p.name}</h2>`)
        node.append(`<p>${p.price}$</p>`)

        products_container.append(node[0])
    }
}

dataFetch("getAllProducts")
.then(populateProducts)

$("#cart").on("click",  () => { window.location.replace("/cart")  })

$("#login").on("click", () => { window.location.replace("/login") })

// placeholder function, overrided in index_logged.js
addToCart = id => { return }
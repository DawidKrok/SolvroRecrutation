header = `<div><h1>NAME</h1><h1>PRICE</h1><h1>QUANTITY</h1></div>`
var sum = 0

populateProducts = async cart => {
    if(!cart.length)
        return products_container.innerHTML = "<h1>Cart is empty<h1>"

    products_container.innerHTML = header

    for(const entry of cart) {
        // get product based on productId
        p = entry.product

        node = $("<div class='product_card'></div>")
        node.append(`<h2>${p.name}</h2>`)
        node.append(`<p>${p.price}$</p>`)
        
        let q_input = $(`<input type="number" value=${entry.quantity}>`)
        q_input.on("change", e => {
            authorizedFetch("setProductInCart", {
                id: entry.product._id,
                quantity: e.target.value
            }).then(cart => {
                if(e.target.value <= 0)
                    e.target.parentElement.remove()

                updateSum(cart)
            })
        })
        
        node.append(q_input)
        products_container.append(node[0])
    }

    updateSum(cart)
}

displayDeliveries = deliveries => {
    for(d of deliveries) 
        delivery_in.innerHTML += `<input type="radio" name="delivery" value="${d.price}">${d.name} - ${d.price}$<br>`

    $('[type="radio"]').on("change", () => updateSum())
}

displayPromos = promos => {
    for(p of promos) 
        promo_in.innerHTML += `<option value="${p.discount}">${p.name}</option>`

    $("#promo_in").on("change", () => updateSum())
}

// Display final price based on cart's content, promo codes and delivery
updateSum = cart => {
    if(cart) {
        sum = 0
    
        for(entry of cart) 
            sum += entry.quantity * entry.product.price
    }

    // apply promo
    promo = promo_in.value
    v_sum = promo.endsWith("%")? sum*(1 - promo.slice(0, -1)/100) : sum - promo
    discount_display.innerHTML = promo.endsWith("%")? promo + "" : promo + "$"
    
    //apply delivery
    d_price = $('[type="radio"]:checked').val()
    if(d_price)
        v_sum += parseInt(d_price)

    sum_display.innerHTML = `Sum: ${v_sum.toFixed(2)}$`
}


authorizedFetch("getCart")
.then(populateProducts)

dataFetch("getDeliveries")
.then(displayDeliveries)

dataFetch("getPromos")
.then(displayPromos)
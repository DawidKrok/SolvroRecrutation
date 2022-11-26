var c_p = 0

authorizedFetch("getCart")
.then(cart => {
    for(elem of cart)
        c_p += elem.quantity

    curr_prod.innerHTML = c_p
})

addToCart = id => {
    authorizedFetch("addToCart", { id })
    .then(() => {
        c_p++
        curr_prod.innerHTML = c_p
    })
}
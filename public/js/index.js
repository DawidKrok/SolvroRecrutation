populateProducts = products => {
    console.log(products)
}

dataFetch("getAllProducts")
.then(populateProducts)
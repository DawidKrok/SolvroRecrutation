const urlParams = new URLSearchParams(window.location.search);

authorizedFetch("/applyShareLink", {id: urlParams.get("id")})
.then(() => {
    good_p.hidden = false
}).catch(e => {
    switch(e) {
        case 401:
            error_p.innerHTML = "YOU MUST BE LOGGED TO USE THIS FEATURE"
            break
        case 405:
            error_p.innerHTML = "YOU CANNOT SHARE YOUR CART WITH YOURSELF"
            break
        case 400: 
            error_p.innerHTML = "BAD REQUEST"
            break
        case 500: 
            error_p.innerHTML = "INTERNAL SERVER ERROR"
            break
        default: 
            error_p.innerHTML = "Error Occured: " + e        
    }
})


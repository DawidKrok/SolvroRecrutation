loading = false

$("form").on("submit", e => {
    if(loading) return

    e.preventDefault()
    email = $("input[name='email']")[0].value.toLowerCase();
    password = $("input[name='password']")[0].value

    loading = true
    fetch('', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
        // takes Response Stream™ and makes Promise that resolves in object returned by request made above
    }).then(res => {
        // throw error if status is 400~, 500~
        if(!res.ok)     throw res.status

        return res.json()
    })
    /**  @data : object resolved from Promise above. Contains Access and Refresh Tokens */
    .then(data => {
        localStorage.setItem("accessToken", data)
        window.location.replace("/index")
    })
    .catch(err => {
        console.log(err)
        loading = false

        $(".email-err").css("visibility", "hidden")
        $(".pass-err").css("visibility", "hidden")

        switch(err) {
            // user with given email not found
            case 404:
                $(".email-err").css("visibility", "visible")
                break 
            // invalid password
            case 401:
                $(".pass-err").css("visibility", "visible")
                break 
        }
    })
})
$("#logout").on("click", () => {
    s = dataFetch("/logout")
    console.log(s)
    console.log("l")
    location.reload()
})

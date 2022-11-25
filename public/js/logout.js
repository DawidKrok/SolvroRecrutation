$("#logout").on("click", () => {
    fetch("/logout", {method: "POST"})
    .then(() => location.reload())
})

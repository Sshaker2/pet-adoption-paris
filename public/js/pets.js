const heartButtons = document.querySelectorAll(".favorite-container")

heartButtons.forEach(heartButton => {
    heartButton.addEventListener("click", handleFavorite)
})

async function handleFavorite(e) {
    const heartButton = e.target;
    heartButton.classList.toggle('heart-full')
    heartButton.classList.toggle('heart-empty')
    if (heartButton.classList.contains('heart-full')) {
        await axios.post(`/user/profile/favorites/${heartButton.dataset.id}/add`)
    } else {
        await axios.post(`/user/profile/favorites/${heartButton.dataset.id}/remove`)
    }
}

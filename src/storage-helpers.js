const favoritesKey = "tv-show-favorites"

//Always returns an empty array, even if storage is empty
export const getFavorites = () => {
    const data = localStorage.getItem(favoritesKey)
    return data ? JSON.parse(data) : []
}

export const saveFavorites = (favorites) => {
    localStorage.setItem(favoritesKey, JSON.stringify(favorites))
}

export const toggleFavorites = (showId) => {
    //Make sure we have a valid ID before processing
    if (showId === undefined || showId === null) {
        console.warn("Attempted to favorite an invalid ID")
        return getFavorites()
    }
    const favorites = getFavorites()
    const index = favorites.indexOf(showId)

    if (index === -1) {
        //Add if not present
        favorites.push(showId)
    } else {
        //Remove if already present
        favorites.splice(index, 1)
    }

    saveFavorites(favorites)
    //Return updated list
    return favorites
}
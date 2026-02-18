import { getShows } from "./fetch-helpers.js";

const renderCollection = (shows) => {
    const ul = document.querySelector('#show-list')
    ul.replaceChildren()
    shows.forEach((show) => {
        const li = document.createElement('li')
        li.dataset.id = show.id
        const showName = document.createElement('h3')
        const img = document.createElement('img')
        const rating = document.createElement('p')

        showName.textContent = `${show.name}`
        img.src = show.image?.medium || 'placeholder-url-here'
        img.alt = `Show poster ${show.name}`
        rating.textContent = `Rating: ${show.rating.average || 'N/A'}`



        li.append(showName, img, rating)
        ul.append(li)

    })


}

export const init = async () => {
    const shows = await getShows()
    renderCollection(shows)
}
init()
// App config

const API = "https://api.lyrics.ovh"

// Grap DOM elements

const search = document.querySelector(".search")
const form = document.querySelector(".form")
const content = document.querySelector(".content")

// llisten for form submit

form.addEventListener("submit", (e) => {
  e.preventDefault()

  // get input from form

  const input = search.value.trim()

  if(!input) {
    alert("Please enter a song name")
    return
  }

  searchSong(input)
})
// search for songs and artist

async function searchSong(search) {
    const request = await fetch(`${API}/suggest/${search}`)
    const response = await request.json()
    const songs = response.data

    console.log(songs)
    showSongs(songs)
}


//Show fetched songs

function showSongs(songs){
    content.innerHTML = `
        <ul class="songs">
        ${songs.map(song => {
            return `<li class="song">
                <span>${song.title} by ${song.artist.name}</span>
                    <button data-title="${song.title}" data-artist="${song.artist.name}" class="show">Show Lyrics </button>
                </li>`
        }).join("")}
        </ul> 
    `     
}

content.addEventListener("click", e => {
    if(e.target.tagName === "BUTTON") {
        const element = e.target
        const title = element.getAttribute("data-title")
        const artist = element.getAttribute("data-artist")

        console.log(title, artist)

        getSong(title, artist)
    }

})

//get song lyrics

async function getSong(title, artist){
    const request = await fetch(`${API}/v1/${artist}/${title}`)
    const response = await request.json()
    const lyric = response.lyrics
    console.log(lyric)
}

//SHow song lyrics

function mostrarSong(lyric){
    console.log(lyric)
}
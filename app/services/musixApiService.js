var dotenv = require('dotenv').config();
var fetch = require('node-fetch');
const musixKey = process.env.MUSIX_API_KEY
let url = 'https://api.musixmatch.com/ws/1.1/'

async function trackSearch(request) {
    const artistName = request.body.artistName
    const title = request.body.title
    let fullUrl = url + 'matcher.track.get?apikey=' + musixKey + '&q_artist=' + artistName + '&q_track=' + title
    let resp = await fetch(fullUrl)
    let json = await resp.json();
    return json.message.body;
}

function formatted(json) {
  var rating = json.track.track_rating
  if (rating > 100 || rating < 1) {
    rating = 50
  } else {
    rating = json.track.track_rating
  }

  var obj = {
    title: json.track.track_name,
    artistName: json.track.artist_name,
    genre: json.track.primary_genres.music_genre_list[0].music_genre.music_genre_name_extended || "Unknown",
    rating: rating,
    user_id: 1
  }
  return obj;
}

module.exports = {  trackSearch,
                    formatted
                  };

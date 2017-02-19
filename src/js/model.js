import 'whatwg-fetch'

let API_KEY = null;
const HERO_MERGE_URL = `https://hero-merge.herokuapp.com`;

export function setApiKey(apiKey) {
  API_KEY = apiKey;
}

export function loadApiKey() {
  return fetch(`${HERO_MERGE_URL}/getApiKey`)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      document.cookie = `apikey=${json.apiKey}`
      API_KEY = json.apiKey;
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
}

export function getHeroes() {
  return fetch(`${HERO_MERGE_URL}/${API_KEY}/heroes`)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      return json;
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
}

export function getHero(id) {
  return fetch(`${HERO_MERGE_URL}/${API_KEY}/heroes/${id}`)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      return json;
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
}


export function newHero(heroObj) {
  console.log(JSON.stringify(heroObj));
  return fetch(`${HERO_MERGE_URL}/${API_KEY}/heroes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(heroObj)
  }).then(function (response) {
    return response.json()
  }).then(function (json) {
    console.log(json);
    return json;
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}


export function updateHero(id) {
  return fetch(`${HERO_MERGE_URL}/${API_KEY}/heroes/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Hubot',
      login: 'hubot',
    })
  }).then(function (response) {
    return response.json()
  }).then(function (json) {
    return json;
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}

export function getGiphy(keyword) {
  return fetch(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${keyword}`)
    .then(function (response) {
    return response.json()
  }).then(function (json) {
    return json.data.fixed_height_downsampled_url;
  }).catch(function (ex) {
    console.log('parsing failed', ex)
  })
}
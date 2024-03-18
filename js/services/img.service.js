'use strict'
const STORAGE_IMG_KEY = 'imgDB'
let gImgsId = 0
let gImgs=[]

_createImgs()

///////////////////////////

function getImgs(FilterBy) {
   
    if (!FilterBy) return gImgs
    const imgs = filterImgs(FilterBy)
    return imgs
}

function filterImgs(keyword) {
    const imgs = gImgs.filter(img => img.keywords.includes(keyword))
    return imgs
}

// function getImg(imgId)  {
//     const img = gImgs.find(img => imgId === img.id)
//     return img
// }

// function addImg(keywords = []) {
//     const img = _createImg(keywords)
//     gImgs.push(img)

//     _saveImgs()
//     return img
// }

///////////////////////////////
// Private functions

function _createImgs() {
    gImgs = loadFromStorage(STORAGE_IMG_KEY)
    console.log('gImgs:',gImgs )
    if (!gImgs || gImgs.length === 0) {
        
        gImgs = [
        _createImg(['funny', 'happy', 'cute', 'laughing', 'kids']),
        _createImg(['cute', 'animals', 'dogs', 'kiss']),
        _createImg(['funny', 'cute', 'kids']),
        _createImg(['happy', 'laughing', 'famous', 'movies', 'actors', 'men']),
        _createImg(['cute', 'animals', 'cats']),
        _createImg(['happy', 'laughing', 'famous', 'movies', 'actors', 'women']),
        _createImg(['funny', 'happy', 'surprised', 'cute', 'kids', 'baby']),
        _createImg(['cute', 'kids', 'baby', 'animals', 'dogs']),
        _createImg(['happy', 'cute', 'animals', 'dogs']),
        _createImg(['funny', 'famous', 'movies', 'actors', 'men']),
        _createImg(['funny', 'angry', 'surprised', 'famous', 'movies', 'actors', 'men']),
        _createImg(['happy', 'cute', 'laughing', 'famous', 'movies', 'actors', 'men']),
        _createImg(['happy', 'laughing', 'famous', 'politicians', 'men']),
        _createImg(['laughing', 'famous', 'movies', 'actors', 'men']),
        _createImg(['famous', 'movies', 'actors', 'men']),
        _createImg(['happy', 'laughing', 'famous', 'actors', 'women']),
        _createImg(['famous', 'men', 'kiss']),
        _createImg(['happy', 'cute', 'movies', 'cartoon']),
        _createImg(['famous', 'politicians', 'men']),
        _createImg(['funny', 'happy', 'cute', 'laughing', 'kids']),
        _createImg(['happy', 'cute', 'laughing', 'famous', 'movies', 'actors', 'men']),
        _createImg(['funny', 'angry', 'famous', 'politicians', 'men']),
        _createImg(['funny', 'angry', 'famous', 'politicians', 'men']),
        _createImg(['famous', 'actors', 'men']),
        _createImg(['happy', 'cute', 'laughing', 'famous', 'movies', 'actors', 'men']),
    ]

    _saveImgs()
    }
    console.log('gImgs:',gImgs )

}

function _createImg(keywords = []) {
    return {
        id: ++gImgsId,
        url: 'img/' + gImgsId + '.jpg',
        keywords: keywords
    }
}

function _saveImgs() {
    saveToStorage(STORAGE_IMG_KEY, gImgs)
}

function _loadImgs() {
    loadFromStorage(STORAGE_IMG_KEY)
}
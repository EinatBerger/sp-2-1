'use strict'
let gFilterBy = ''
let savedImage

var gIsAllKeywords = false
//self list in gallery: 
//func: memes saved, trans, font keywords.

function renderGallery() {
    closeModal()
    console.log('gMeme:', gMeme)
    const elEditor = document.querySelector('.editor-container')
    elEditor.classList.add('hide')
    const elSavedMemes = document.querySelector('.saved-memes-grid-container')
    elSavedMemes.classList.add('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hide')

    var imgs = getImgs(gFilterBy)
    var strHTMLs = `<label for="image" class="file-label">Upload Your Own Image File</label>
    <input type="file" class="file-input" id="image" name="image" onchange="onImgInput(event)">`

    strHTMLs += imgs.map(img =>
        `<img src="${img.url}" alt="Image ${img.id}" id="${img.id}" onclick="onImgSelect(+'${img.id}')">`
    ).join('')

    const elImgContainer = document.querySelector('.gallery-imgs-grid-container')
    elImgContainer.innerHTML = strHTMLs

    renderKeyword()
}

function closeModal() {
	document.querySelector('.modal').style.opacity = 0
}

function onSetFilterBy(filterBy) {
    document.querySelector('.search-list').value = filterBy
    updateKeywordsCount(filterBy)
    gFilterBy = filterBy
    renderGallery()
}

function onRandomImg() {
    clearGMeme()
    const randomImgId = getRandomIntInclusive(1, 25)
    setImg(randomImgId,'img')
    renderMeme()
}

function onImgSelect(imgId) {
    clearGMeme()
    setImg(imgId,'img')
    renderMeme()
}

function onImgInput(ev) {
    clearGMeme()
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image() 
        img.src = ev.target.result 
        img.onload = () => {
            // setImgFromInput(img.src)
            setImg(img.src,'input')
            renderMeme()
        }
    }
    reader.readAsDataURL(ev.target.files[0])
    console.log('readAsDataURL(ev.target.files[0]):',reader.readAsDataURL(ev.target.files[0]) ) 
}
//////////////////////////////////////////////////////////////////

function renderKeyword() {
    var AllKeywords = Object.keys(gKeywordSearchCountMap)
    // Rendering keywords for datalist
    const strHTMLs = AllKeywords.map(keyword =>
        `<option>${keyword}</option>`)

    const elSearchKeywordsList = document.querySelector('.search-list')
    elSearchKeywordsList.list.innerHTML = strHTMLs.join('')

    // Rendering keywords for container
    var keywords = (!gIsAllKeywords) ? gTop5Keywords : Object.keys(gKeywordSearchCountMap)

    var strHTMLs2 = keywords.map(keyword =>
        `<button onclick="onSetFilterBy('${keyword}')">${keyword}</button>`
    ).join('')

    if (!gIsAllKeywords) {
        strHTMLs2 += `<button style="color:red;" onclick="onAllKeyword()">more..</button>`
    }
    else {
        strHTMLs2 += `<button style="color:red;" onclick="onAllKeyword()">close</button>`
    }
    const elKeywordsContainer = document.querySelector('.keywords-container')
    elKeywordsContainer.innerHTML = strHTMLs2

}

function onAllKeyword() {
    gIsAllKeywords = !gIsAllKeywords
    renderKeyword()
}

function onClearFilter() {
    document.querySelector('.search-list').value = ""
    gFilterBy = ""
    renderGallery()
}
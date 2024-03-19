'use strict'
let gFilterBy = ''
let savedImage

var gIsAllKeywords = false
//self list in gallery: 
//func: memes saved, trans, font keywords.
//design: img gal on mobile, dont see editor, keyword container

function renderGallery() {
    const elEditor = document.querySelector('.editor-container')
    elEditor.classList.add('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hide')


    
    var imgs = getImgs(gFilterBy)

    var strHTMLs =`<label for="image" class="file-label">Upload Your Own Image File</label>
    <input type="file" class="file-input" id="image" name="image" onchange="onImgInput(event)">`
   
    strHTMLs +=imgs.map(img =>
        `<img src="${img.url}" alt="Image ${img.id}" id="${img.id}" onclick="onImgSelect(+'${img.id}')">`
    ).join('')

    
    const elImgContainer = document.querySelector('.gallery-imgs-grid-container')
    elImgContainer.innerHTML= strHTMLs

    renderKeyword()
}

function onSetFilterBy(filterBy) {
    document.querySelector('.search-list').value = filterBy
    updateKeywordsCount(filterBy)
    gFilterBy = filterBy
    renderGallery()
}

function onRandomImg() {
    const randomImgId = getRandomIntInclusive(1, 25)
    setImg(randomImgId)
    renderMeme()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}

function onImgInput(ev) {

    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image() 
        img.src = ev.target.result 
        img.onload = function () { 
            setImgFromInput(img.src)
            renderMeme()}
    }
    reader.readAsDataURL(ev.target.files[0])
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
    console.log('gKeywordSearchCountMap:',gKeywordSearchCountMap )
}

function onAllKeyword(){
    gIsAllKeywords = !gIsAllKeywords
    console.log('gIsAllKeywords:',gIsAllKeywords )
    renderKeyword()
}

function onClearFilter(){
    document.querySelector('.search-list').value = ""
    gFilterBy = ""
    renderGallery()
}
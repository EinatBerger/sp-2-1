'use strict'
let gFilterBy = ''
let savedImage

function renderGallery() {
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
    document.querySelector('.search-keywords-list').value = filterBy

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
    loadImageFromInput(ev, renderImg)
}

// Read the file from the input
// When done send the image to the callback function

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image() 
        img.src = ev.target.result 
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) 
}

// function onImgLoad(img) { dost work!!!
//     console.log('img:', img)
//     imgInput(img.src)
//     renderMeme()
// }

function renderImg(img) {
    // Adjust the canvas to the new image size
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    // Add text on the canvas
    gCtx.font = '20px Arial'
    gCtx.fillStyle = 'white'
    gCtx.fillText('Your text will be Added Here', 10, 30)

    // imgInput(img)//dost work!!!
}



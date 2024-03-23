'use strict'

function renderMemes() {
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.classList.remove('hide')
    const elEditor = document.querySelector('.editor-container')
    elEditor.classList.add('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hide')

    const savedMemes = loadFromStorage(STORAGE_KEY)
    const elSavedMemeH2 = document.querySelector('h2')
    const elSavedMemeContainer = document.querySelector('.saved-memes-grid-container')

    if (!savedMemes || savedMemes.length === 0) {     
        elSavedMemeH2.innerText = "no saved memes"
        elSavedMemeContainer.innerText =''
    }
    else {
        elSavedMemeH2.innerText = ""
        var strHTMLs = savedMemes.map(savedMeme =>
            `<div class="saved-meme-imgs">
            <img src="${savedMeme.imageUrl}" alt="Image ${savedMeme.id}" id="${savedMeme.id}" onclick="onSavedMemeSelect('${savedMeme.id}')"> 
            <button class="delete" onclick="OnRemoveSavedMeme('${savedMeme.id}')">Delete</button>
            </div>`
        )
        elSavedMemeContainer.innerHTML = strHTMLs.join('')
    }

}

/*save meme to local storge*/
function onSave() {
    const elCanvas = document.querySelector('canvas')
    elCanvas.toBlob(function(blob) {
        const imageUrl = URL.createObjectURL(blob) // Create Blob URL
        addSavedMeme(imageUrl)
        showMsg('Saved Your Meme')
    }, 'image/png')
}
/*load saved memes from local storage*/
function onLoadSavedMemes() {
    renderMemes()
}
function OnRemoveSavedMeme(savedMemeId) {
    removeSavedMeme(savedMemeId)
    showMsg('Deleted Your Meme')
    renderMemes()
}

function onSavedMemeSelect(savedMemeId) {
    clearGMeme()
    const savedMeme=getSavedMemeById(savedMemeId)

    setImg(savedMeme.imageUrl,'saved')
    renderMeme()
}

function showMsg(action) {
    console.log('msg:', 'msg')
    const msg = `You Successfully ${action}`
    const elMsg = document.querySelector('.user-msg')
    elMsg.innerText = msg
    elMsg.classList.remove('hide')

    setTimeout(() => {
        elMsg.classList.add('hide')
    }, 3000)
}

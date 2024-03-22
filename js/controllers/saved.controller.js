'use strict'

// function renderMemes() {
//     const memes = loadSavedMemes()
//     memes.forEach((meme) => {
//         renderMeme()
//         strHTMLs += `<img src="${meme.imgSrc}" alt="Meme ${meme.id}" id="${meme.id}" onclick="onSavedMemeSelect('${meme.imgSrc}','Saved')">`
//     })

//     const elSavedMemeContainer = document.querySelector('.saved-memes-grid-container')
//     elSavedMemeContainer.innerHTML = strHTMLs.join('')


//     const elSavedMemes = document.querySelector('.saved-memes-grid-container')
//     elSavedMemes.classList.remove('hide')
//     const elEditor = document.querySelector('.editor-container')
//     elEditor.classList.add('hide')
//     const elGallery = document.querySelector('.gallery')
//     elGallery.classList.add('hide')

// }

/*save meme to local storge*/
function onSave() {
    const meme = getMeme()
    if (!meme || meme.length === 0) return
    addMeme(meme)
    setImg(meme.imgSrc, 'saved')
    renderMeme()
    showMsg('Saved Your Meme')
}

/*load saved memes from local storage*/
function onLoadSavedMemes() {
    loadFromStorage(STORAGE_KEY) || []
    renderMemes()
}

 
// function onSave() {
//     gShouldDrawTextBox = false
//     renderMeme() //without txt box    
//     // Gets the image from the canvas
//     const memeSrc = gElCanvas.toDataURL('image/jpeg')
//     setMemeSrc(memeSrc)
//     console.log('gMeme:', gMeme)
//     addMeme(gMeme)
//     console.log('gMemes:', gMemes)
//     gShouldDrawTextBox = true
//     renderMeme()//with txt box
//     showMsg('Saved Your Meme')
// }

// 
// function onLoad() {
//     renderMemes()
// }

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

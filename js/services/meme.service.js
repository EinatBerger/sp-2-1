'use strict'
const STORAGE_KEY = 'memeDB'
var gMeme = {
    isImgInput:false,
    imgSrc:"",
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Your text will be Added Here',
        font: "Arial",
        size: 20,
        textAlign: "center",//ctx.textAlign
        isStrokeText: false,//if true ctx.strokeText else ctx.fillText
        fontColor:"white"// gCtx.fillStyle
    }]
}

// var gMemes ={
//     id: "",
//     meme: { 
//         selectedImgId:0 ,
//         selectedLineIdx:0 ,
//         lines: [ { txt:"", size:0, color:""} ] }
// }
///////////////////////////
// Meme functions
function getMeme() {
    console.log('gMeme:', gMeme)
    return gMeme
}

function setImg(imgId) {
    gMeme.isImgInput=false
    gMeme.selectedImgId = imgId

    console.log('gMeme:', gMeme)
    return gMeme
}

function setImgFromInput(imgSrc) { 
    gMeme.isImgInput=true
    gMeme.imgSrc = imgSrc
    
    console.log('gMeme:', gMeme)
    return gMeme
}

function setLineTxt(newText) {
    gMeme.lines[0].txt = newText
    console.log('gMeme:', gMeme)
    return gMeme
}

function setLineTxtAlignment(textAlign) {
    gMeme.lines[0].textAlign = textAlign
    console.log('gMeme:', gMeme)
    return gMeme
}

function setLineTxtStrokeText() {
    const isStrokeText = !gMeme.lines[gMeme.selectedLineIdx].isStrokeText // Toggle isStrokeText
    gMeme.lines[0].isStrokeText = isStrokeText
    console.log('gMeme:', gMeme)
    return gMeme
}

function setLineTxtSize(diff) {
    const newSize = gMeme.lines[0].size + diff*1
    console.log('newSize:',newSize )
    gMeme.lines[0].size = (newSize >= 0) ? newSize : gMeme.lines[0].size // Fixed syntax error
    console.log('gMeme:', gMeme)
    return gMeme
}

function setLineTxtFont(font) {
    gMeme.lines[0].font = font
    console.log('gMeme:', gMeme)
    return gMeme
}

function setLineTxtColor(fontColor) {
    gMeme.lines[0].fontColor = fontColor
    console.log('gMeme:', gMeme)
    return gMeme
}

///////////////////////////
function loadSavedMemes() {
    loadFromStorage(STORAGE_KEY)
}

function getSavedMeme(memeId) {
    const meme = gMemes.find(meme => memeId === meme.id)
    return meme
}

function addMeme(meme) {
    const newMeme = _createMeme(meme)
    gMemes.push(newMeme)

    _saveMemes()
    return newMeme
}

function removeSavedMeme(MemeId) {
    const idx = gMemes.findIndex((Meme) => Meme.id === MemeId)
    gMemes.splice(idx, 1)

    _saveMemes()
}

// Private functions

function _createMeme(meme) {
    return {
        id: makeId(),
        meme: meme
    }
}

function _saveMemes() {
    saveToStorage(STORAGE_KEY, gMemes)
}



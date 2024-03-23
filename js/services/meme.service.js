'use strict'
const STORAGE_KEY = 'saveMemesDB'

var gMeme = {
    imgSrc: "",
    isImgInput: false,
    isImgSaved: false,
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [],
}
var gSavedMemes = []

function clearGMeme() {
    gMeme.imgSrc = ''
    gMeme.isImgInput = false
    gMeme.selectedImgId = 0
    gMeme.selectedLineIdx = 0
    gMeme.lines = []

}

// create
function createTextLine() {
    let pos
    if (gMeme.lines.length === 0) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }

    if (gMeme.selectedLineIdx === 0) {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height * 0.1 }
    } else if (gMeme.selectedLineIdx === 1) {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height * 0.9 }
    } else if (gMeme.selectedLineIdx === 2) {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    } else {//randomly between 20% and 80% of canvas height
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height * (Math.random() * 0.6 + 0.2) }
    }

    var newTextLine = {
        pos: pos,
        txt: 'Add Text Here',
        font: "Arial",
        size: 20,
        textAlign: "center",
        isStrokeText: false,
        fontColor: "white",
        isDrag: false,
        txtBoxDimensions: {},
    }
    gMeme.lines.push(newTextLine)
}

//get
function getMeme() {
    return gMeme
}

function getTextLine(lineIdx) {
    return gMeme.lines[lineIdx]
}

//update

function setImg(imgSrc, imgSource) {
    if (imgSource === 'img') {
        gMeme.isImgInput = false
        gMeme.selectedImgId = imgSrc
        gMeme.imgSrc = 'img/' + imgSrc + '.jpg'
    }
    if (imgSource === 'input') {
        gMeme.isImgInput = true
        gMeme.imgSrc = imgSrc
    }
    if (imgSource === 'saved') {
        gMeme.isImgSaved = true
        gMeme.imgSrc = imgSrc
    }
    createTextLine()
    return gMeme
}

function setLineTxt(key, value) {
    if (key === "isStrokeText") {
        value = !gMeme.lines[gMeme.selectedLineIdx].isStrokeText // Toggle isStrokeText
    }
    if (key === "size") {
        const newSize = gMeme.lines[gMeme.selectedLineIdx].size + value * 1
        value = (newSize >= 0) ? newSize : gMeme.lines[gMeme.selectedLineIdx].size
    }
    gMeme.lines[gMeme.selectedLineIdx][key] = value
}

function switchLine(dir) {
    if (gMeme.lines.length === 0) return
    // copy and sort by pos.y
    const linesWithPosY = gMeme.lines.map((line, idx) => ({ idx, posY: line.pos.y }))
    linesWithPosY.sort((a, b) => a.posY - b.posY)

    //current
    const currentLineIdx = gMeme.selectedLineIdx

    //go to next by dir
    //because first line is up switch will go with down
    let nextLineIdx
    let currLineOrderIdx = linesWithPosY.findIndex(line => line.idx === currentLineIdx)
    if (dir === 'up') {
        nextLineIdx = currLineOrderIdx === 0 ? gMeme.lines.length - 1 : currLineOrderIdx - 1
    } else {
        nextLineIdx = currLineOrderIdx === gMeme.lines.length - 1 ? 0 : currLineOrderIdx + 1
    }

    //update selectedLineIdx
    gMeme.selectedLineIdx = linesWithPosY[nextLineIdx].idx

}

function setSelectedLine(clickedPos) {
    const lines = getMeme().lines

    for (let i = 0; i < lines.length; i++) {
        console.log('i:', i)
        if (isTextLineClicked(clickedPos, i)) {
            gMeme.selectedLineIdx = i
            return i
        }
    }

    // Return -1 if no line is clicked
    return -1
}


//remove 
function removeTextLine() {
    if (gMeme.lines.length === 1) {
        // If there's only one line, empty the lines array
        gMeme.lines = []
        gMeme.selectedLineIdx = 0
    } else {
        // If there are multiple lines, remove the line at the specified index
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx = 0
    }
}
//////////////////////////////////////////////////
function CalcTxtBoxDimensions(lineIdx) {
    const line = getTextLine(lineIdx)
    const { pos, txt, size, font, textAlign } = line

    // Set font style for measuring text width
    gCtx.font = size + 'px ' + font // You can adjust the font and size as needed

    // Measure text width and height
    const textMetrics = gCtx.measureText(txt)
    const textWidth = textMetrics.width
    const textHeight = size

    // Calculate coordinates for the text box
    let x
    let y
    if (textAlign === 'center') {
        x = pos.x - textWidth / 2
        y = pos.y - textMetrics.actualBoundingBoxAscent
    }
    if (textAlign === 'end') {
        x = pos.x - textWidth
        y = pos.y - textMetrics.actualBoundingBoxAscent
    }
    if (textAlign === 'start') {
        x = pos.x
        y = pos.y - textMetrics.actualBoundingBoxAscent
    }


    // Update txtBoxDimensions object with calculated values
    gMeme.lines[lineIdx].txtBoxDimensions = {
        boxPos: { x, y },
        textWidth,
        textHeight,
    }
}

//Check if the click is inside the TextLine
function isTextLineClicked(clickedPos, lineIdx) {

    CalcTxtBoxDimensions(lineIdx)
    const line = getTextLine(lineIdx)
    const { boxPos, textWidth, textHeight } = line.txtBoxDimensions
    // Check if the clicked position is within the text box boundaries
    console.log('clickedPos:', clickedPos)

    console.log('boxPos:', boxPos)
    console.log('textWidth:', textWidth)
    console.log('textHeight:', textHeight)

    if (
        clickedPos.x >= boxPos.x &&
        clickedPos.x <= boxPos.x + textWidth &&
        clickedPos.y >= boxPos.y &&
        clickedPos.y <= boxPos.y + textHeight
    ) {
        return true // Clicked within the text box
    } else {
        return false // Clicked outside the text box
    }
}

function setTextLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

// Move the TextLine by a delta from the pervious pos
function moveTextLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}
///////////////////////////

function getSavedMemes(){
    const savedMemes=loadFromStorage(STORAGE_KEY)
    return savedMemes
}
function getSavedMemeById(savedMemeId){
    return gSavedMemes.find(savedMeme => savedMemeId === savedMeme.id)
}

function addSavedMeme(imageUrl){
    const newSavedMeme = _createSavedMeme(imageUrl)
    gSavedMemes.unshift(newSavedMeme)
    saveToStorage(STORAGE_KEY, gSavedMemes)
    return newSavedMeme
}

function removeSavedMeme(savedMemeId) {
    const idx = gSavedMemes.findIndex((savedMeme) => gSavedMemes.id === savedMemeId)
    gSavedMemes.splice(idx, 1)
    _SavedMemes()
}

// Private functions
function _createSavedMeme(imageUrl) {
    return {
        id: makeId(),
        imageUrl:imageUrl
    }
}

function _SavedMemes() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}
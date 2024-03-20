'use strict'
const STORAGE_KEY = 'memeDB'

var gMeme = {
    isImgInput: false,
    imgSrc: "",
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}
var gTxtBoxDimensions = {
    boxPos: {
        x: 0,
        y: 0,
    },
    textWidth: 0,
    textHeight: 0,
}

//creat
function setImg(imgId) { ////Start a new Meme:
    gMeme.isImgInput = false
    gMeme.selectedImgId = imgId
    createTextLine()
    return gMeme
}

function setImgFromInput(imgSrc) { ////also Start a new Meme:
    gMeme.isImgInput = true
    gMeme.imgSrc = imgSrc
    createTextLine()
    return gMeme
}

function createTextLine() {
    let pos
    gMeme.selectedLineIdx = (gMeme.lines.length === 0) ? 0 : gMeme.selectedLineIdx++

    // if (gMeme.selectedLineIdx === 0) {
    //     pos = { x: gElCanvas.width / 2, y: gHeightForCalc * 0.2 }
    // } else if (gMeme.selectedLineIdx === 1) {
    //     pos = { x: gElCanvas.width / 2, y: gHeightForCalc * 0.8 }
    // } else {
    //     pos = { x: gElCanvas.width / 2, y: gHeightForCalc / 2 }
    // }

    if (gMeme.selectedLineIdx === 0) {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height * 0.2 }
    } else if (gMeme.selectedLineIdx === 1) {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    } else {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    }
    var newTextLine = {
        pos: pos,
        txt: 'Your text will be Added Here',
        font: "Arial",
        size: 20,
        textAlign: "center",
        isStrokeText: false,
        fontColor: "blue",
        isDrag: false,
    }

    gMeme.lines.push(newTextLine)
}

//get
function getMeme() {
    return gMeme
}

function getTextLine(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx]
}

function getTxtBoxDimensions() {
    return gTxtBoxDimensions
}

//update
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

function setSelectedLine(clickedPos) {
    const lines = getMeme().lines

    for (let i = 0; i < lines.length; i++) {
        if (isTextLineClicked(clickedPos, lines[i])) {
            gMeme.selectedLineIdx = i
            return
        }
    }
}

//remove 
function removeTxtLine() {
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



function CalcTxtBoxDimensions(lineIdx = gMeme.selectedLineIdx) {
    const { pos, txt, size, font } = getTextLine(lineIdx)

    // Set font style for measuring text width
    gCtx.font = size + 'px ' + font // You can adjust the font and size as needed

    // Measure text width and height
    const textMetrics = gCtx.measureText(txt)
    const textWidth = textMetrics.width
    const textHeight = size

    // Calculate coordinates for the text box
    const x = pos.x - textWidth / 2
    const y = pos.y - textMetrics.actualBoundingBoxAscent

    // Update gTxtBoxDimensions object with calculated values
    gTxtBoxDimensions = {
        boxPos: { x, y },
        textWidth,
        textHeight,
    }
}

//Check if the click is inside the TextLine
function isTextLineClicked(clickedPos, lineIdx = gMeme.selectedLineIdx) {
    CalcTxtBoxDimensions(lineIdx)
    const { boxPos, textWidth, textHeight } = getTxtBoxDimensions(lineIdx)

    // Check if the clicked position is within the text box boundaries
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
function loadSavedMemes() {
    loadFromStorage(STORAGE_KEY)
}

function getSavedMeme(memeId) {
    const meme = gMemes.find(meme => memeId === meme.id)
    return meme
}

function addMeme(meme) {
    const newMeme = _createSavedMeme(meme)
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

function _createSavedMeme(meme) {
    return {
        id: makeId(),
        meme: meme
    }
}

function _saveMemes() {
    saveToStorage(STORAGE_KEY, gMemes)
}



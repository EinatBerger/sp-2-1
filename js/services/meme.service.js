'use strict'
const STORAGE_KEY = 'memeDB'

var gMeme = {
    id: 0,
    isImgInput: false,
    imgSrc: "",
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
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
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height/ 2 }
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
        fontColor: "blue",
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
    if (dir === 'up') {
        nextLineIdx = currentLineIdx === 0 ? gMeme.lines.length - 1 : currentLineIdx - 1
    } else {
        nextLineIdx = currentLineIdx === gMeme.lines.length - 1 ? 0 : currentLineIdx + 1
    }

    //update selectedLineIdx
    gMeme.selectedLineIdx = linesWithPosY[nextLineIdx].idx
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

function CalcTxtBoxDimensions(lineIdx) {
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
    gMeme.lines[lineIdx].txtBoxDimensions = {
        boxPos: { x, y },
        textWidth,
        textHeight,
    }
    // console.log('gMeme:', gMeme)
}

//Check if the click is inside the TextLine
function isTextLineClicked(clickedPos, lineIdx) {
    CalcTxtBoxDimensions(lineIdx)
    // const { boxPos, textWidth, textHeight } = getTxtBoxDimensions(lineIdx)
    const { boxPos, textWidth, textHeight } = getTextLine(lineIdx)
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



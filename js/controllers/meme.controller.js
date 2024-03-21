'use strict'
var gShouldDrawTextBox = true

// Render the initial image and text  
//will be use when the user select/random or upload an img 
function renderMeme() {
    const meme = getMeme()
    if (!meme || meme.length === 0) return

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    // Draw the img on the canvas
    const img = new Image()
    img.onload = function () {
        // Draw the img on the canvas
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderTextLines()

    }

    img.src = (!meme.isImgInput) ? 'img/' + meme.selectedImgId + '.jpg' : meme.imgSrc
    // Adjust the canvas to the new image size
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

    document.querySelector('.text-input').value = meme.lines[meme.selectedLineIdx].txt
    const elEditor = document.querySelector('.editor-container')
    elEditor.classList.remove('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hide')
    const elSavedMemes = document.querySelector('.saved-memes-grid-container')
    elSavedMemes.classList.add('hide')
}

function renderTextLines() {
    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        renderTextLine(idx)
    })
}

function renderTextLine(lineIdx) {
    const meme = getMeme()
    drawTextLine(lineIdx)

    // if (lineIdx === meme.selectedLineIdx) {
    //     CalcTxtBoxDimensions(lineIdx);
    //     const line = getTextLine(lineIdx);
    //     const { pos, txt, size, font, textAlign, fontColor } = line;
    //     openModal(pos.x, pos.y, size, font, textAlign, fontColor, txt);
    // }


    if (!gShouldDrawTextBox) return // dont drawTextBox 

    if (lineIdx === meme.selectedLineIdx) {
        drawTextBox(lineIdx)
    }
}

// function openModal(x, y, size, font, textAlign, fontColor, text) {
//     const elModal = document.querySelector('.modal');
//     elModal.innerText = text;
//     elModal.style.opacity = 1;
//     // Position the modal based on the text line coordinates
//     elModal.style.top = y + 'px';
//     elModal.style.left = x + 'px';
//     // Apply styling based on text line properties
//     elModal.style.font = size + 'px ' + font;
//     elModal.style.textAlign = textAlign;
//     elModal.style.color = fontColor;
// }

function drawTextLine(lineIdx) {
    const { pos, size, font, textAlign, fontColor, isStrokeText, txt } = getTextLine(lineIdx)
    gCtx.font = size + 'px ' + font
    gCtx.textAlign = textAlign
    gCtx.fillStyle = fontColor
    gCtx.strokeStyle = fontColor

    if (isStrokeText) {
        gCtx.strokeText(txt, pos.x, pos.y)
    } else {
        gCtx.fillText(txt, pos.x, pos.y)
    }
}

function drawTextBox(lineIdx) {
    CalcTxtBoxDimensions(lineIdx)
    const line = getTextLine(lineIdx)
    const { boxPos, textWidth, textHeight } = line.txtBoxDimensions

    // Draw the text box
    gCtx.strokeStyle = 'black' // Set the stroke color
    gCtx.lineWidth = 2 // Set the line width
    gCtx.strokeRect(boxPos.x - 2, boxPos.y - 4, textWidth + 4, textHeight + 4) // Draw the rectangle the num are padding
}
/////////////////////////////////////////////
// actions:
///////////////////////////////////////////////////////
function OnSetLineTxt(key, value) {
    setLineTxt(key, value)
    renderMeme()
}
///////////////////////////////////////////////////////
function OnAddLine() {
    createTextLine()
    renderMeme()
}
///////////////////////////////////////////////////////
function OnSwitchLine() {
    switchLine()
    renderMeme()
}
///////////////////////////////////////////////////////
function OnRemoveLine() {
    removeTextLine()
    renderMeme()
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
/*download meme*/

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}
////////////////////////////////////////////////////////
/*share meme on facebook*/
function onShareImg() {

    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)

}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
////////////////////////////////////////////////////////////////////////


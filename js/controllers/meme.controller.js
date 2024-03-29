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
        const lines = meme.lines
        // Check if there are any text lines
        if (!lines || lines.length === 0) {
            closeModal()
            return
         } 
        renderTextLines()
        document.querySelector('.text-input').value = meme.lines[meme.selectedLineIdx].txt
    }
    img.src = meme.imgSrc
    // Adjust the canvas to the new image size
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

    
    const elEditor = document.querySelector('.editor-container')
    elEditor.classList.remove('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hide')
    const elSavedMemes = document.querySelector('.saved-memes')
    elSavedMemes.classList.add('hide')
}

function renderTextLines() {
    const meme = getMeme()
    const lines = meme.lines
     // Check if there are any text lines
     if (!lines || lines.length === 0) {
        closeModal()
        return
     }

    meme.lines.forEach((line, idx) => {
        renderTextLine(idx)
    })
}

function renderTextLine(lineIdx) {
    const meme = getMeme()
    drawTextLine(lineIdx)
    if (lineIdx === meme.selectedLineIdx) {
        openModal(lineIdx)
    }
}

function openModal(lineIdx) {
    CalcTxtBoxDimensions(lineIdx)
    const line = getTextLine(lineIdx)
    const { size, font, textAlign, fontColor, isStrokeText, txt } = getTextLine(lineIdx)
    const { boxPos} = line.txtBoxDimensions

    const elModal = document.querySelector('.modal')
    elModal.style.opacity = 1
   
    // Position the modal based on the text line coordinates
    var modalPosX = gElCanvas.offsetLeft+boxPos.x
    var modalPosY = gElCanvas.offsetTop+boxPos.y
    elModal.style.top =  modalPosY+ 'px';
    elModal.style.left = modalPosX + 'px';

    // Apply styling based on text line properties
    elModal.innerText = txt
    elModal.style.font = size + 'px ' + font;
}

function drawTextLine(lineIdx) {
    const { pos, size, font, textAlign, fontColor, isStrokeText, txt } = getTextLine(lineIdx)
    gCtx.font = size + 'px ' + font
    gCtx.textAlign = textAlign
    gCtx.fillStyle = fontColor
    gCtx.strokeStyle = fontColor
    // gCtx.rotate(70 * Math.PI / 180)

    if (isStrokeText) {
        gCtx.strokeText(txt, pos.x, pos.y)
    } else {
        gCtx.fillText(txt, pos.x, pos.y)
    }
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

function moveCarousel(direction) {
    const elEmojiContainer = document.querySelector('.emoji-container')
    var step = 50 * direction
  
    // Calculate the new scroll position
    var scrollLeft = elEmojiContainer.scrollLeft + step
  
    // Animate the scroll
    elEmojiContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }

  function allowDrop(event) {
    event.preventDefault()
  }
  
  function drag(event, emoji) {
    event.dataTransfer.setData("text", emoji)
  }
  
  function drop(event) {
    event.preventDefault()
    var emoji = event.dataTransfer.getData("text")
    
    // Get the mouse position relative to the canvas
    // var rect = gElCanvas.getBoundingClientRect()
    var x = event.clientX - gElCanvas.offsetLeft
    var y = event.clientY - gElCanvas.offsetTop
  
    // Draw the emoji on the canvas at the mouse position
    ctx.font = "40px Arial"
    ctx.fillText(emoji, x, y)
  } 
  


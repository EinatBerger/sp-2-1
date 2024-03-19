'use strict'

function renderMeme() {
    const meme = getMeme()
    if (!meme || meme.length === 0) return


    const elEditor = document.querySelector('.editor-container')
    elEditor.classList.remove('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hide')

    // Draw the img on the canvas
    const img = new Image()
    img.onload = function () {
        // Draw the img on the canvas
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        const x = gElCanvas.width / 2
        const y = gElCanvas.height * 0.2

        // Draw text
        const text = meme.lines[meme.selectedLineIdx].txt
        // Calculate text width
        const metrics = gCtx.measureText(text)
        const textWidth = metrics.width
        //  text height
        const size = meme.lines[meme.selectedLineIdx].size

        const font = meme.lines[meme.selectedLineIdx].font
        const textAlign = meme.lines[meme.selectedLineIdx].textAlign
        console.log('textAlign:',textAlign )
        const isStrokeText = meme.lines[meme.selectedLineIdx].isStrokeText
        const fontColor = meme.lines[meme.selectedLineIdx].fontColor

        gCtx.font = size + 'px ' + font
        gCtx.textAlign = textAlign
        gCtx.fillStyle = fontColor
        gCtx.strokeStyle = fontColor

        if (isStrokeText) {
            gCtx.strokeText(text, x, y)
        } else {
            gCtx.fillText(text, x, y)
        }


        // Draw textBox (rect)
        const maxWidth = gElCanvas.width
        const minWidth = gElCanvas.width * 0.6
        //  BoxText Width
        var boxWidth = (textWidth + 20 > minWidth) ? maxWidth : minWidth
        //  BoxText height
        const boxHeight = size + 20 // Add padding

        var boxX
        if (textAlign === 'start') {
            boxX = gElCanvas.width- boxWidth
            console.log('here:', 'here')
        } else if (textAlign === 'end') {
            boxX = 0
        } else {
            boxX = gElCanvas.width / 2 - boxWidth / 2 - 5
        }


        gCtx.strokeStyle = fontColor
        gCtx.lineWidth = 2
        gCtx.strokeRect(boxX, y - size - 5, boxWidth, boxHeight)

    }

    img.src = (!meme.isImgInput) ?'img/' + meme.selectedImgId + '.jpg':meme.imgSrc
    // Adjust the canvas to the new image size
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
}



function OnSetLineTxt() {
    const newText = document.querySelector('.text-input').value
    setLineTxt(newText)
    renderMeme()
}

function OnSetLineTxtAlignment(textAlign) {
    console.log('textAlign:', textAlign)
    setLineTxtAlignment(textAlign)
    renderMeme()
}

function OnSetLineTxtStrokeText() {
    setLineTxtStrokeText()
    renderMeme()
}

function OnSetLineTxtSize(diff) {
    console.log('diff:', diff)
    setLineTxtSize(diff)
    renderMeme()
}

function OnSetLineTxtFont(font) {
    console.log('font:', font)
    setLineTxtFont(font)
    renderMeme()
}

function OnSetLineTxtColor(fillStyle) {
    console.log('fillStyle:', fillStyle)
    setLineTxtColor(fillStyle)
    renderMeme()
}


///////////////////////////////////////////////////////
/*load saved memes from local storage*/
function onLoad() {
    console.log('Not there yet')
    // gMemes= loadMemes()
    // renderMemes(gMemes)
}
///////////////////////////////////////////////////////
/*save meme to local storge*/
function onSave() {
    console.log('Not there yet')
    // addMeme(gMeme)
    // showMsg('Saved Your Meme')
}
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

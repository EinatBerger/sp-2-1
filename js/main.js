'use strict'
let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {

    top5Keywords()
    renderGallery()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    // resizeCanvas()
}


// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')

//     // Changing the canvas dimension clears the canvas
//     gElCanvas.width = elContainer.clientWidth
//     gElCanvas.height = elContainer.clientHeight
// }

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()

        const txtPos = { x: gElCanvas.width / 2, y: gElCanvas.height * 0.2 }
        createTextLine(txtPos)

        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {

    // Save the position we started from...
    // Get the event position from mouse or touch
    gStartPos = getEvPos(ev)

    if (!isTextLineClicked(gStartPos)) return

    setTextLineDrag(true)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getTextLine()
    if (!isDrag) return

    const pos = getEvPos(ev)

    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveTextLine(dx, dy)

    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos

    // The canvas is rendered again after every move
    renderMeme()
}

function onUp() {
    setTextLineDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('canvas')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()         // Prevent triggering the mouse events
        ev = ev.changedTouches[0]   // Gets the first touch point

        // Calculate the touch position inside the canvas

        // ev.pageX = distance of touch position from the documents left edge
        // target.offsetLeft = offset of the elemnt's left side from the it's parent
        // target.clientLeft = width of the elemnt's left border

        return {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }

    } else {
        return {
            x: ev.offsetX,
            y: ev.offsetY,
        }
    }
}




////////////////////////////////////////////////////////////////////
function toggleMenu() {
    document.body.classList.toggle('menu-open');
    var toggleBtn = document.querySelector('.toggle-menu-btn');
    if (document.body.classList.contains('menu-open')) {
        toggleBtn.innerText = 'x';
    } else {
        toggleBtn.innerText = '☰';
    }
}



















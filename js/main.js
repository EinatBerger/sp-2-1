'use strict'
let gElCanvas
let gCtx


function onInit() {
    top5Keywords()
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    window.addEventListener('resize', () => resizeCanvas())

}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight
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



















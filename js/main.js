'use strict'
let gElCanvas
let gCtx


function onInit() {

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






















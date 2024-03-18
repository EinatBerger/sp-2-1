'use strict'
function makeId(length = 6) {
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return id
}

// The maximum is inclusive and the minimum is inclusive
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
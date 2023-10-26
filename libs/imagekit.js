const imageKit = require('imagekit')

const { IMAGEKIT_URL_ENDPOINT,
        IMAGEKIT_PUBLIC_KEY,
        IMAGEKIT_PRIVATE_KEY
} = process.env

module.exports = new imageKit({
    publicKey : IMAGEKIT_PUBLIC_KEY,
    privateKey : IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : IMAGEKIT_URL_ENDPOINT
})
    
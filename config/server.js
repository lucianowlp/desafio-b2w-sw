const port = 5005

const express = require('express')
const server = express()

server.listen(port, () => {
    console.log(`API sendo executada na porta ${port}`)
})

module.exports = server
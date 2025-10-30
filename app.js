const net = require('net')
const blessed = require('blessed')

const { screen, chatBox, input, addMessage } = require('./ui/objects')

const PORT = 3000
const clients = []
const buffers = new Map()
const usernames = new Map()
const USERNAME = 'SERVER'

const server = net.createServer((socket) => {

    clients.push(socket)
    buffers.set(socket, '')
    usernames.set(socket, null)

    socket.write('Enter your username: ')

    socket.on('data', (data) => {

        let buf = buffers.get(socket) + data.toString()

        buf = buf.split('').reduce((acc, char) => {
            if (char === '\b' || char === '\x7f') acc = acc.slice(0, -1)
            else acc += char
            return acc
        }, '')

        let lines = buf.split(/\r?\n/)
        buffers.set(socket, lines.pop())

        lines.forEach(line => {

            const message = line.trim()
            if (!message) return

            if (!usernames.get(socket)) {
                usernames.set(socket, message)
                socket.write(`Welcome ${message}!\r\n`)
                addMessage(`Client connected: ${message}`)
                return
            }

            const username = usernames.get(socket)
            addMessage(`<${username}> ${message}`)

            clients.forEach(client => {
                if (client !== socket) client.write(`<${username}> ${message}\r\n`)
            })

        })

    })

    socket.on('end', () => {

        const username = usernames.get(socket) || socket.remoteAddress
        clients.splice(clients.indexOf(socket), 1)
        buffers.delete(socket)
        usernames.delete(socket)
        addMessage(`Client disconnected: ${username}`)

    })

})

server.listen(PORT, () => addMessage(`Server listening on port ${PORT}`))

input.on('submit', (text) => {

    const message = text.trim()
    if (!message) return

    addMessage(`<${USERNAME}> ${message}`)

    clients.forEach(client => client.write(`<${USERNAME}> ${message}\r\n`))

    input.clearValue()
    screen.render()
    input.focus()

})

input.key('enter', () => input.submit())
const blessed = require('blessed');

const screen = blessed.screen({
    smartCSR: true,
    title: 'LAN Chat Terminal'
});

const chatBox = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: '100%-3',
    content: 'Server starting...\n',
    tags: true,
    border: { type: 'line' },
    scrollable: true,
    alwaysScroll: true
});

const input = blessed.textbox({
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    padding: { left: 1, right: 1 },
    inputOnFocus: true,
    keys: true,
    border: { type: 'line' }
});

screen.append(chatBox);
screen.append(input);
input.focus();
screen.program.hideCursor();

input.on('keypress', () => {
    screen.program.showCursor();
});

input.key(['C-c'], () => {
    screen.destroy();
    process.exit(0);
});

input.key(['up', 'down'], (ch, key) => {

    screen.program.hideCursor();

    if (key.name === 'up') chatBox.scroll(-1);
    if (key.name === 'down') chatBox.scroll(1);

    screen.render();

    screen.program.showCursor();
});

input.key('enter', () => input.submit());

let renderScheduled = false;
function addMessage(message) {
    chatBox.insertBottom(message.trim());
    chatBox.setScrollPerc(100);

    if (!renderScheduled) {
        renderScheduled = true;
        setImmediate(() => {
            screen.render();
            renderScheduled = false;
        });
    }
}

module.exports = {
    screen,
    chatBox,
    input,
    addMessage
};
// Create main.js file 
// npm init -y
// npm install electron --save-dev
// add "start":"electron ." in package.json file

//BoilerPlate code
const electron = require("electron");

const app = electron.app;

function createWindow() {
    const win = new electron.BrowserWindow({
        //creates a new window instance
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    win.loadFile('index.html').then(function () {
        win.maximize();
        // win.webContents.openDevTools();
    })
}
app.whenReady().then(createWindow);

//BoilerPlate ends

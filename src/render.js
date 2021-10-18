const startRecordingBtn = document.querySelector('#start-recording');

const urlInputField = document.querySelector('#session-url-input');

const path = require('path')
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

async function startRecording() {



    const sessionWindow = new BrowserWindow({
        width: 800,
        height: 600,
    })
    const plugin = path.join(__dirname, 'ruffle/ruffle-nightly-2021_10_18-web-extension')
    await sessionWindow.webContents.session.loadExtension(plugin, { allowFileAccess: true });
    setTimeout(() => {

            sessionWindow.loadURL("https://vc1.tabrizu.ac.ir/pcke6b05jhl6/?session=breezbreezdnvywsqh375wkaq2")
        }, 3000)
        //sessionWindow.webContents.executeJavaScript("var s = document.createElement( 'script' );s.setAttribute( 'src'," + plugin + "  );document.body.appendChild(s);")
    sessionWindow.setTitle("Recording session ...");
    console.log('btnclicked')
}
startRecordingBtn.addEventListener('click', startRecording);
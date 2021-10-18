const startRecordingBtn = document.querySelector('#start-recording');

const urlInputField = document.querySelector('#session-url-input');

function startRecording() {
    const electron = require('electron');
    const BrowserWindow = electron.remote.BrowserWindow;

    const sessionWindow = new BrowserWindow({
        width: 800,
        height: 600,
    })
    sessionWindow.loadURL("https://vc1.tabrizu.ac.ir/pcke6b05jhl6/?session=breezbreezdnvywsqh375wkaq2")
    sessionWindow.setTitle("Recording session ...");
    console.log('btnclicked')
}
startRecordingBtn.addEventListener('click', startRecording);
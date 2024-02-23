const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const { autoUpdater } = require("electron-updater")
const log = require('electron-log');

log.initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  autoUpdater.checkForUpdatesAndNotify();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

autoUpdater.on('update-available', () => {
  log.info('Update available.');
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  log.info('Update downloaded; will install now');
});

autoUpdater.on('error', (error) => {
  log.error('There was a problem updating the application');
  log.error(error);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
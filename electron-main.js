const { app, BrowserWindow } = require("electron");
const path = require("path");

if (process.platform === "win32") {
  // GPU優先設定（Windowsの場合）
  app.commandLine.appendSwitch("force_high_performance_gpu");
}

/**
 * ブラウザウインドウを生成する
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
  });

  win.loadFile(path.join(__dirname, "build", "production", "index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

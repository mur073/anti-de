const path = require("path");
const { app, BrowserWindow, Menu, dialog } = require("electron");

let a, b;

const isDevMode = process.env.NODE_ENV !== "production";

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Anti-DE",
        center: true,
        minWidth: 900,
        minHeight: 600,
        icon: path.join(__dirname, "./renderer/images/icon"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    });

    if (isDevMode) {
        mainWindow.webContents.openDevTools();
    }

    const template = [
        {
          label: app.name,
          submenu: [
              { role: 'about', label: `Об ${app.name}` },
              { type: 'separator' },
              { role: 'services', label: 'Сервисы' },
              { type: 'separator' },
              { role: 'quit', label: 'Выйти' }
          ]
        },
        {
           label: 'Правка',
           submenu: [
              { role: 'undo', label: 'Отменить' },  
              { role: 'redo', label: 'Вернуть'  },
              { type: 'separator'  },
              { role: 'cut', label: 'Вырезать'},
              { role: 'copy', label: 'Скопировать' },
              { role: 'paste', label: 'Вставить' },
              { role: 'selectAll', label: 'Выбрать все' }
           ]
        },
        {
           label: 'Вид',
           submenu: [
              { role: 'reload', label: 'Обновить' },
              { type: 'separator' },
              { role: 'resetzoom', label: 'Вернуть масштаб' },
              { role: 'zoomin', label: 'Увеличить масштаб' },
              { role: 'zoomout', label: 'Уменьшить масштаб' },
              { type: 'separator' },
              { role: 'togglefullscreen', label: 'Полноэкранный режим' }
           ]
        },
        {
           role: 'window',
           label: 'Окно',
           submenu: [
              { role: 'minimize', label: 'Свернуть' },
              { role: 'close', label: 'Закрыть' }
           ]
        },
        {
           role: 'help',
           label: 'Помощь',
           submenu: [
              { label: 'Бог в помощь' },
              { label: 'Бог в помощь' },
              { label: 'Бог в помощь' },
              { label: 'Бог в помощь' },
              { label: 'Бог в помощь' },
              { type: 'separator' },
              {
                label: 'Сообщить об ошибке',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://t.me/+nsrvZp29GNoyMDYy');
                }
              }
           ]
        }
     ]
    
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
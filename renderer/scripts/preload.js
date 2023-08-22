const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile')
})

contextBridge.exposeInMainWorld('electron', {
    doThing: () => ipcRenderer.invoke('run-exe')
});
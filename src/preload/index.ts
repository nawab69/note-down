import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in browser window')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // TODO:
  })
} catch (e) {
  console.log(e)
}

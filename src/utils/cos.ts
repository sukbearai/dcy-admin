import { saveAs } from 'file-saver'

export function downloadFormCos(url: string, fileName: string) {
  fetch(url)
    .then(response => response.blob())
    .then((blob) => {
      saveAs(blob, fileName)
    })
}

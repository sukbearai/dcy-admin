import { type UserModule } from '~/types'
import Qrcode from '~/components/Qrcode.vue'

// Import Vue Quill
// https://vueup.github.io/vue-quill/guide/usage.html
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

export const install: UserModule = async ({ isClient, app }) => {
  if (isClient) {
    // 二维码组件
    const { Base64 } = await import('js-base64')
    const {
      encodeData,
      renderer25D,
      rendererCircle,
      rendererDSJ,
      rendererFuncA,
      rendererFuncB,
      rendererImage,
      rendererLine,
      rendererLine2,
      rendererRandRect,
      rendererRandRound,
      rendererRect,
      rendererResImage,
      rendererRound,
    } = await import('beautify-qrcode')

    const generateQRCodeMap = {
      A1: rendererRect,
      A2: rendererRound,
      A3: rendererRandRound,
      SP1: rendererDSJ,
      SP2: rendererRandRect,
      SP3: rendererCircle,
      B1: renderer25D,
      C1: rendererImage,
      C2: rendererResImage,
      A_a1: rendererLine,
      A_a2: rendererLine2,
      A_b1: rendererFuncA,
      A_b2: rendererFuncB,
    }

    app.component('Qrcode', Qrcode)
    app.provide('generateQrUrl', (style: keyof typeof generateQRCodeMap, content: string, width: number, height: number) => {
      const codeOption = {
        text: content,
        width,
        height,
        correctLevel: 0,
        isSpace: true,
      }
      const encodeDataResult = encodeData(codeOption)
      const generateQrUrlResult = generateQRCodeMap[style](encodeDataResult)
      return `data:image/svg+xml;base64,${Base64.encode(generateQrUrlResult)}`
    })
  }
}


/**
 * 基于crypto-js的加密工具类（AES-256-GCM）
 * 与Web Crypto API方案兼容
 */
export default class {
  static key: CryptoKey | null = null

  private static keyHexToBuffer(keyHex: string) {
    const keyBytes = []
    for (let i = 0; i < keyHex.length; i += 2) {
      keyBytes.push(parseInt(keyHex.slice(i, i + 2), 16))
    }
    return new Uint8Array(keyBytes)
  }

  static async initKey(keyHex: string) {
    this.key = await crypto.subtle.importKey(
      'raw',
      this.keyHexToBuffer(keyHex),
      {
        name: 'AES-GCM',
        length: 256
      },
      false,
      ['encrypt', 'decrypt']
    )
  }

  /**
   * 加密数据
   * @param data 待加密数据
   * @returns 加密后的对象
   */
  static async encrypt(data: unknown) {
    if (!this.key) {
      throw new Error('请先初始化密钥（调用initKey方法）')
    }

    if (!data) {
      throw new Error('请输入待加密数据')
    }

    const dataStr = JSON.stringify(data)

    // 生成12字节随机iv
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // 加密
    const encrypted = crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      this.key,
      new TextEncoder().encode(dataStr)
    )

    return {
      iv,
      encrypted: btoa(String.fromCharCode(...new Uint8Array(await encrypted)))
    }
  }

  /**
   * 解密数据
   * @param data 待解密数据
   * @param iv 加密时使用的iv
   * @returns 解密后的字符串
   */
  static async decrypt(data: string, iv: Uint8Array) {
    if (!this.key) {
      throw new Error('请先初始化密钥（调用initKey方法）')
    }

    if (!data) {
      throw new Error('请输入待解密数据')
    }

    const decrypted = crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      this.key,
      new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)))
    )
    return new TextDecoder().decode(await decrypted)
  }
}

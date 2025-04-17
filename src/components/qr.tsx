// components/qr.ts
import QRCode from 'qrcode';

export const generateQRCodeDataURL = (url: string): Promise<string> => {
  //cambio de url cont
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(url, (err: unknown, dataURL: string | PromiseLike<string>) => {
      if (err) {
        reject(err);
      } else {
        resolve(dataURL);
      }
    });
  });
};

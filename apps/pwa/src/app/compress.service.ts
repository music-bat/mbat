import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompressService {
  compressImage(file: File, width = 500): Promise<File> {
    return new Promise((resolve, reject) => {
      const fileType = file.type;
      const fileName = file.name;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = ev.target.result.toString();

        img.onload = () => {
          const height = (((100 / img.width) * width) / 100) * img.height;
          const elem = document.createElement('canvas');
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext('2d');
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, width, height);
          ctx.canvas.toBlob(
            (blob: Blob | null) => {
              const file = new File([blob], fileName, {
                type: fileType || 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(file);
            },
            fileType || 'image/jpeg',
            1
          );
        };

        reader.onerror = (error) => reject(error);
      };
    });
  }
}

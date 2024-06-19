import { Area } from "react-easy-crop";
import { createImage } from "./utils";

export async function getCroppedImage(imageSource: any, croppedArea: Area): Promise<Blob | null> {
    const image = await createImage(imageSource);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;

    if (!ctx) return null;

    ctx.drawImage(
        image,
        croppedArea.x,
        croppedArea.y,
        croppedArea.width,
        croppedArea.height,
        0,
        0,
        croppedArea.width,
        croppedArea.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
          resolve(file);
        }, 'image/jpeg');
    });
}

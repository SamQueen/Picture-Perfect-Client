'use client'
import { getCroppedImage } from '@/lib/cropImage';
import React, { useState } from 'react';
import Cropper from "react-easy-crop";
import { Point, Area } from 'react-easy-crop';

const ImageCrop = ({ image, croppedAreaPixels, setCroppedAreaPixels }: ImageCropProps) => {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    return (
        <div className='relative  h-full w-full'>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
        </div>
    )
}

export default ImageCrop
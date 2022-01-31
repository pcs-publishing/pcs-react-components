import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import Uploader from '../Uploader'
import { Modal } from 'semantic-ui-react'
import Button from '../Buttons/Button'
import ReactCrop, { Crop } from 'react-image-crop'


export interface AvatarUploaderProps {
  onUpload: (blob: Blob) => void
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const StyledCrop = styled(ReactCrop)`
  img {
    max-height: 700px !important;
  }
`

const ModalContent = styled(Modal.Content)`
  display: flex !important;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 700px;
`

const AvatarUploader = (props: AvatarUploaderProps) => {
  const [fileSrc, setFileSrc] = useState<string | null>(null)
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    aspect: 1,
    x: 10,
    y: 10,
    width: 80,
    height: 80
  })


  const onChangeFile = useCallback(async (file: File | null) => {
    if (!file) {
      clearFile()
      return
    }

    const reader = new FileReader();
    reader.addEventListener('load', () =>
      setFileSrc(reader.result as string)
    );
    reader.readAsDataURL(file);
  }, [setFileSrc])

  const onPerformCrop = async () => {
    if (!imgEl || !crop) return
    clearFile()
    const result = await getCroppedImage(imgEl, crop)
    if (result) {
      props.onUpload(result)
    }
  }

  const onLoad = useCallback((img: HTMLImageElement) => {
    setImgEl(img)

    const initialCrop = getInitialCrop(img)

    setTimeout(() => {
      setCrop({ unit: 'px', aspect: 1, ...initialCrop })
    }, 0)


  }, [setImgEl, setCrop]);

  const clearFile = () => {
    setFileSrc(null)
  }

  return <Container>
    <Uploader onDrop={onChangeFile} uploadType="avatar" acceptMimeTypes={['image/jpeg', 'image/png']} multiple={false} maxFileSize={50_000_000} size={50} />
    <Modal open={!!fileSrc} onClose={clearFile} closeIcon>
      <Modal.Header>Choose Your Avatar</Modal.Header>
      <ModalContent>
        {fileSrc ? (
          <StyledCrop
            src={fileSrc as string}
            onImageLoaded={onLoad}
            onImageError={clearFile}
            crop={crop as Crop}
            circularCrop
            keepSelection
            minWidth={30}
            minHeight={30}
            onChange={newCrop => setCrop(newCrop)}
          />
        ) : null}
      </ModalContent>
      <Modal.Actions>
        <Button primary onClick={onPerformCrop}>Save</Button>
        <Button onClick={clearFile}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  </Container>
}

async function getCroppedImage(image: HTMLImageElement, crop: Crop): Promise<Blob | undefined> {
  const canvas = document.createElement('canvas')
  const pixelRatio = window.devicePixelRatio
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return
  }

  canvas.width = crop.width * pixelRatio * scaleX;
  canvas.height = crop.height * pixelRatio * scaleY;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }

        resolve(blob)
      },
      'image/jpeg',
      0.5
    );
  });
}

function getInitialCrop(image: HTMLImageElement): { x: number, y: number, width: number, height: number } {
  const width = image.width
  const height = image.height

  const cropPossibleWidth = width * 0.9
  const cropPossibleHeight = height * 0.9

  const cropSize = Math.min(cropPossibleWidth, cropPossibleHeight)

  const x = (width - cropSize) / 2
  const y = (height - cropSize) / 2

  return {
    x,
    y,
    width: cropSize,
    height: cropSize
  }
}

export default AvatarUploader

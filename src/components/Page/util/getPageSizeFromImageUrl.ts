/**
 * @param url Image url
 * @param minWidth Minimum width you want image to render
 * @param minHeight Minimum height you want image to render
 * @param width Container width
 * @param height Container height
 * @returns Width and height of page size
 */
const getPageSizeFromImageUrl = (
  url: string,
  minWidth: number,
  minHeight: number,
  width: number,
  height: number
): Promise<{
  pageSize: { width: number; height: number }
  biggerBy: number
}> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function () {
      resolve(
        calculatePageSize(
          minWidth,
          minHeight,
          width,
          height,
          // @ts-ignore
          this.width,
          // @ts-ignore
          this.height
        )
      )
    }

    image.onerror = function () {
      resolve({ pageSize: { width, height }, biggerBy: 1 })
    }

    image.src = url
  })
}

const calculatePageSize = (
  minWidth: number,
  minHeight: number,
  width: number,
  height: number,
  imageWidth: number,
  imageHeight: number
) => {
  let biggerBy = 1
  const scaleWidthUp = imageWidth > imageHeight && minWidth > imageWidth

  if (scaleWidthUp) {
    biggerBy = minWidth / imageWidth
  }

  const scaleWidthDown = imageWidth > imageHeight && imageWidth > width

  if (scaleWidthDown) {
    biggerBy = width / imageWidth
  }

  const scaleHeight = imageHeight > imageWidth && minHeight > imageHeight

  if (scaleHeight) {
    biggerBy = minHeight / imageHeight
  }

  const scaleHeightDown = imageHeight > imageWidth && imageHeight > height

  if (scaleHeightDown) {
    biggerBy = height / imageHeight
  }

  const pageSize = getPageSize(biggerBy, imageWidth, imageHeight)

  return { pageSize, biggerBy }
}

const getPageSize = (biggerBy: number, width: number, height: number) => {
  return { width: width * biggerBy, height: height * biggerBy }
}

export default getPageSizeFromImageUrl

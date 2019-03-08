const sourceToImageCache = {}

function loadImages(sources) {
  const sourceToImage = {}
  const sourceToPromise = {}

  sources.forEach(source => {
    if (sourceToImageCache[source]) {
      sourceToImage[source] = sourceToImageCache[source]
    }
    else if (!sourceToPromise[source]) {
      sourceToPromise[source] = new Promise((resolve, reject) => {
        const image = new Image()

        image.src = source
        image.onload = resolve
        image.onerror = reject
        sourceToImage[source] = image
        sourceToImageCache[source] = image
      })
    }
  })

  return Promise.all(Object.values(sourceToPromise)).then(() => sourceToImage)
}

export default loadImages

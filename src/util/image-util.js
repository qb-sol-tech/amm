function getImgURL(name) {
    return new URL(`../assets/${name}`,import.meta.url).href
}
export{getImgURL}
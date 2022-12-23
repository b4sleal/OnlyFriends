function importAll(r) {
    let images = {};
    r.keys().map(item => { images[item.replace('./', '')] = r(item); });
    return images;
}

const userImgs = {
    Anna: importAll(require.context('./Anna', false, /\.png/))
};

export { userImgs };

// local e veri kaydeder
export const setLocal = (key,value) => {
    // stringe çevir
    const strData = JSON.stringify(value);

    // locale kaydet
    localStorage.setItem(key, strData);
};

// localden veri çeker
export const getLocal = (key) => {
    // localden veriye eriş
    const strData = localStorage.getItem(key);

    // stringi js verisine çevir ve döndür
    return JSON.parse(strData);
};

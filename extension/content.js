
const convertImage = async (dataUrl, format) => {
    return new Promise((resolve, reject) => {
        try {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const convertedDataUrl = canvas.toDataURL(`image/${format}`);
                resolve(convertedDataUrl);
            };
        } catch (error) {
            console.error('Error converting Data URL:', error);
            reject(false);
        }
    });
};

const downloadBase64Image = (base64Data, format) => {
        const link = document.createElement('a');
        link.href = base64Data;
        link.download = `download.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
};



const main=async(readerUrl,format)=>{
    const convertedDataUrl = await convertImage(readerUrl, format);
    downloadBase64Image(convertedDataUrl, format);
}

chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    let {readerUrl,format}= message
    main(readerUrl,format)
})
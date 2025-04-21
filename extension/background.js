
chrome.runtime.onMessage.addListener((message, sender, sendResponce) => {
    console.log(message);
})

chrome.runtime.onInstalled.addListener((details) => {
        chrome.storage.local.set({ formate: 'png' })
})




chrome.runtime.onInstalled.addListener(({ reason }) => {
    chrome.storage.local.get('origins', ({ origins }) => {
        if (origins === null || origins === undefined) {
            chrome.storage.local.set({
                origins: []
            });
        }
    })
})
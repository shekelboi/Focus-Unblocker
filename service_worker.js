var block_redirect_url = 'reasons/unblock.html';
export var blocked_websites = [new URL("https://www.youtube.com/watch?v=g6rFff2MAxM"), new URL("https://www.duolingo.com/")];

// We can compare if the URL's host is equal to the host of one of the block websites
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    let url = new URL(details.url);
    console.log(url.hostname);
    if (details.frameId == 0 && blocked_websites.find(website => website.hostname == url.hostname)) {
        console.log("This URL is blocked.");
        chrome.tabs.update({url: block_redirect_url});
    }
});
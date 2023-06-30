block_redirect_url = new URL("https://asset.kompas.com/crops/S3WIl-K0PbO48leil75gqLjKgvM=/177x0:1545x912/750x500/data/photo/2022/08/01/62e75917161c4.png");

var blocked_websites = [new URL("https://www.youtube.com/watch?v=g6rFff2MAxM"), new URL("https://www.duolingo.com/")];

// We can compare if the URL's host is equal to the host of one of the block websites
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    let url = new URL(details.url);
    console.log(url.hostname);
    if (details.frameId == 0 && blocked_websites.find(website => website.hostname == url.hostname)) {
    if (blocked_websites.find(website => website.hostname == url.hostname)) {
        console.log("This URL is blocked.");
        chrome.tabs.update({url: block_redirect_url.href});
    }
});
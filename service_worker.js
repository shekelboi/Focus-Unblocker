console.log('Service worker started!');
var block_redirect_url = 'reasons/unblock.html';
// For demonstration purposes only
// Impractical and unviable since the service worker may be terminated at any time
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

// This will be useful in the future
export function remove_website_from_blocked(url) {
    console.log(url);
    let remove_index = blocked_websites.findIndex(website => website.hostname == url.hostname);
    if (remove_index != -1) {
        blocked_websites.splice(remove_index);
    }
    console.log('List of blocked websites: %o', blocked_websites);
}

// Check if the URL is among the blocked websites
function is_site_blocked(url) {
    console.log(url.hostname);
    let remove_index = blocked_websites.findIndex(website => website.hostname == url.hostname);
    console.log(remove_index);
    return remove_index != -1;
}

export function add_website_to_blocked(url) {
    console.log('Add site to blocked');
    console.log(url);
    if (!is_site_blocked(url)) {
        blocked_websites.push(url);
        console.log('List of blocked websites: %o', blocked_websites);
    }
}
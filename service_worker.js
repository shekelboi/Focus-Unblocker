console.log('Service worker started!');
var block_redirect_url = 'sites/reasons/unblock.html';

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    console.log('Service worker initialized.');
    await chrome.storage.local.set({ blocked_websites: [new URL("https://www.youtube.com/watch?v=g6rFff2MAxM"), new URL("https://www.duolingo.com/")].map(url => url.href)});
});

// We can compare if the URL's host is equal to the host of one of the block websites
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    let url = new URL(details.url);
    console.log(url.hostname);
    console.log('local storage');
    chrome.storage.local.get('blocked_websites', (items) => {
        let blocked_websites = items.blocked_websites.map(href => new URL(href));
        console.log(blocked_websites);
        if (details.frameId == 0 && blocked_websites.find(website => website.hostname == url.hostname)) {
            console.log("This URL is blocked.");
            chrome.tabs.update({url: block_redirect_url});
        }
    });
});

// This will be useful in the future
export async function remove_website_from_blocked(url) {
    console.log(url);
    let { blocked_websites } = await chrome.storage.local.get('blocked_websites')
    blocked_websites = blocked_websites.map(href => new URL(href));
    let remove_index = blocked_websites.findIndex(website => website.hostname == url.hostname);
    if (remove_index != -1) {
        blocked_websites.splice(remove_index, 1);
    }
    blocked_websites = blocked_websites.map(url => url.href);
    await chrome.storage.local.set({ blocked_websites });
    console.log('List of blocked websites: %o', (await chrome.storage.local.get('blocked_websites')).blocked_websites);
}

// Check if the URL is among the blocked websites
export async function is_site_blocked(url) {
    console.log(url.hostname);
    const { blocked_websites } = await chrome.storage.local.get('blocked_websites');
    console.log(blocked_websites);
    let remove_index = blocked_websites.findIndex(href => new URL(href).hostname == url.hostname);
    console.log(remove_index);
    return remove_index != -1;
}

export async function add_website_to_blocked(url) {
    console.log('Add site to blocked: %o', url);
    if (!await is_site_blocked(url)) {
        const { blocked_websites } = await chrome.storage.local.get('blocked_websites');
        blocked_websites.push(url.href);
        await chrome.storage.local.set({ blocked_websites });
        console.log('List of blocked websites: %o', (await chrome.storage.local.get('blocked_websites')).blocked_websites);
    }
}
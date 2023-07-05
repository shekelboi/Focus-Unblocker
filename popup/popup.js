import * as sw from '../service_worker.js'

// Listing the blocked websites
var blocked_websites_list = document.getElementById("blocked_websites_list");
initialize();

function initialize() {
    check_if_site_is_blocked();
    list_blocked_websites();
}

function list_blocked_websites() {
    chrome.storage.local.get('blocked_websites', (items) => {
        while (blocked_websites_list.firstChild) {
            blocked_websites_list.removeChild(blocked_websites_list.firstChild);
        }
        items.blocked_websites.forEach((href) => {
            let website = new URL(href);
            let list_item = document.createElement('li');
            let url = website.host;
            let split = url.split('.');
            if (split.length == 3) {
                url = split[1];
            }
            list_item.appendChild(document.createTextNode(url));
            blocked_websites_list.appendChild(list_item);
        });
    });
}

var add_to_blocked_section = document.getElementById("add_site_to_blocked_section")
var remove_from_blocked_section = document.getElementById("remove_site_from_blocked_section")

function show_add_to_blocked_button_only() {
    add_to_blocked_section.hidden = false;
    remove_from_blocked_section.hidden = true;
}

function show_remove_from_blocked_button_only() {
    add_to_blocked_section.hidden = true;
    remove_from_blocked_section.hidden = false;
}

function check_if_site_is_blocked() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        let current_tab = tabs[0];
        if (current_tab.url != null && await sw.is_site_blocked(new URL(current_tab.url))) {
            show_remove_from_blocked_button_only();
        }
        else {
            show_add_to_blocked_button_only();
        }
    });
}

document.getElementById("add_site_to_blocked_button").addEventListener("click", add_site_to_blocked);
document.getElementById("remove_site_from_blocked_button").addEventListener("click", remove_site_from_blocked);

function add_site_to_blocked() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        let current_tab = tabs[0];
        if (current_tab.url != null) {
            await sw.add_website_to_blocked(new URL(current_tab.url));
        }
    });
}

function remove_site_from_blocked() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        let current_tab = tabs[0];
        // If it's undefined, it likely means that the user is on the unblock.html page.
        // Maybe the unblock.js should be queried to confirm this and to see which website it was redirected from.
        if (current_tab.url != null) {
            await sw.remove_website_from_blocked(new URL(current_tab.url));
        }
    });
}

chrome.storage.onChanged.addListener((changes) => {
    if (changes.blocked_websites != null) {
        check_if_site_is_blocked();
        list_blocked_websites();
    }
});
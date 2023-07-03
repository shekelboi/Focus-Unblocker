import * as sw from './service_worker.js'

console.log(sw.blocked_websites);

// Listing the blocked websites
var blocked_websites_list = document.getElementById("blocked_websites_list");
sw.blocked_websites.forEach((website) => {
    let list_item = document.createElement('li');
    let url = website.host;
    let split = url.split('.');
    if (split.length == 3) {
        url = split[1];
    }
    list_item.appendChild(document.createTextNode(url));
    blocked_websites_list.appendChild(list_item);
});

// Dealing with the add and remove buttons and sections
var site_added = false

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

if (site_added) {
    show_remove_from_blocked_button_only();
}
else {
    show_add_to_blocked_button_only();
}

document.getElementById("add_site_to_blocked_button").addEventListener("click", add_site_to_blocked);
document.getElementById("remove_site_from_blocked_button").addEventListener("click", remove_site_from_blocked);

function add_site_to_blocked() {
    show_remove_from_blocked_button_only();
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let current_tab = tabs[0];
        if (current_tab.url != null) {
            sw.add_website_to_blocked(new URL(current_tab.url));
        }
    });
}

function remove_site_from_blocked() {
    console.log('Remove site from blocked');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let current_tab = tabs[0];
        // If it's undefined, it likely means that the user is on the unblock.html page.
        // Maybe the unblock.js should be queried to confirm this and to see which website it was redirected from.
        console.log(current_tab.url);
        if (current_tab.url != null) {
            sw.remove_website_from_blocked(new URL(current_tab.url));
        }
    });
    
    show_add_to_blocked_button_only();
}

// TODO: refresh listing once a new website is added to the blocklist.
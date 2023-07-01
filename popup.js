import {blocked_websites} from './service_worker.js'

console.log(blocked_websites);


var blocked_websites_list = document.getElementById("blocked_websites_list");
blocked_websites.forEach((website) => {
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
    console.log('Add site to blocked');
    show_remove_from_blocked_button_only();
}

function remove_site_from_blocked() {
    console.log('Remove site from blocked');
    show_add_to_blocked_button_only();
}

chrome.tabs.getCurrent((tab) => {
    console.log(tab);
});
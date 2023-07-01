import {blocked_websites} from './service_worker.js'

console.log(blocked_websites);

// blocked_websites.find(website => website.host == )

// document.querySelector()

document.getElementById("add_site_to_blocked").addEventListener("click", add_site_to_blocked);
document.getElementById("remove_site_from_blocked").addEventListener("click", remove_site_from_blocked);

function add_site_to_blocked() {
    console.log('Add site to blocked');
}

function remove_site_from_blocked() {
    console.log('Remove site from blocked');
}

chrome.tabs.getCurrent((tab) => {
    console.log(tab);
});
  
document.addEventListener("DOMContentLoaded", function() {
    var unblockButton = document.getElementById("unblockButton");
    unblockButton.addEventListener("click", storeReason);
});

function storeReason() {
    var input = document.getElementById("reasons").value;
    var validationMessage = document.getElementById("validationMessage");

    if (input.trim() === "") {
        validationMessage.textContent = "This field is required.";
        return;
    }

    chrome.storage.local.set({ "reason": input }, function() {
        validationMessage.textContent = "Reason stored successfully!";
    });
}

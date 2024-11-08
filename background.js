// Create the context menu item for links
browser.contextMenus.create({
    id: "add-to-readwise",
    title: "Add Link to Readwise Reader",
    contexts: ["link"]  // This ensures the menu appears only when right-clicking links
  });
  
  // Listen for clicks on the context menu item
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "add-to-readwise") {
      // Retrieve the saved API token from storage
      browser.storage.local.get("authToken").then(({ authToken }) => {
        if (authToken) {
          // Call the function to add the link to Readwise
          addToReadwise(authToken, info.linkUrl);
        } else {
          console.error("API token not set. Please configure it in the extension options.");
        }
      });
    }
  });
  
// Function to show a floating notification on the page
function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "10px";
    notification.style.backgroundColor = "rgba(60, 180, 75, 0.9)";  // Soft green background
    notification.style.color = "#ffffff";
    notification.style.fontSize = "14px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "10000";
    notification.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
    notification.style.pointerEvents = "none";  // Prevent interaction with the notification
  
    document.body.appendChild(notification);
  
    // Remove the notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  


  // Function to send the link to Readwise Reader API
  async function addToReadwise(apiToken, url) {
    const API_URL = "https://readwise.io/api/v3/save/";
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Token ${apiToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add the link to Readwise Reader: ${response.status} ${response.statusText}`);
      }
  
      console.log("Link successfully added to Readwise Reader");
  
      // Inject the notification script into the active tab to show a success message
      browser.tabs.executeScript({ file: "notification.js" });
  
    } catch (error) {
      console.error(error.message);
    }
  }
  
  
  
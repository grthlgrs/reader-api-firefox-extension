// Function to save the API token
document.getElementById("saveOptions").addEventListener("click", () => {
    const authToken = document.getElementById("authToken").value;
    browser.storage.local.set({ authToken }).then(() => {
      // Show a confirmation message
      const statusMessage = document.getElementById("statusMessage");
      statusMessage.textContent = "API token saved successfully!";
      setTimeout(() => { statusMessage.textContent = ""; }, 2000);
    });
  });
  
  // Load the saved API token into the input field on options page load
  document.addEventListener("DOMContentLoaded", () => {
    browser.storage.local.get("authToken").then(({ authToken }) => {
      if (authToken) {
        document.getElementById("authToken").value = authToken;
      }
    });
  });
  
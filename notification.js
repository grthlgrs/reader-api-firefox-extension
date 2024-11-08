(function showNotification() {
    const notification = document.createElement("div");
    notification.textContent = "Link added to Readwise Reader";
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "10px";
    notification.style.backgroundColor = "rgba(60, 180, 75, 0.9)";
    notification.style.color = "#ffffff";
    notification.style.fontSize = "14px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "10000";
    notification.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
    notification.style.pointerEvents = "none";
  
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 3000);
  })();
  
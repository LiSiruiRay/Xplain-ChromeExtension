chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getVideoInfo") {
    const timeElement = document.querySelector(".ytp-time-current");
    const time = timeElement ? timeElement.textContent : null;
    sendResponse({ currentTime: time });
  }
});

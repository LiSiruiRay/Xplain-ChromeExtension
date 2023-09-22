// function getVideoId() {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get("v");
// }

// function getCurrentTimestamp() {
//   const videoElement = document.querySelector("video");
//   return videoElement ? videoElement.currentTime : null;
// }

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "getVideoInfo") {
//     sendResponse({
//       videoId: getVideoId(),
//       timestamp: getCurrentTimestamp(),
//     });
//   }
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getVideoInfo") {
    const timeElement = document.querySelector(".ytp-time-current");
    const time = timeElement ? timeElement.textContent : null;
    sendResponse({ currentTime: time });
  }
});

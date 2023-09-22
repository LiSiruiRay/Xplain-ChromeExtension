// function executeAfterDelay() {
//   console.log("5 seconds have passed!");

// }

export function getVideoID() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      if (!tab || !tab.url) {
        return reject(new Error("No active tab found"));
      }
      const url = new URL(tab.url);
      const params = new URLSearchParams(url.search);
      const videoId = params.get("v");
      resolve(videoId);
    });
  });
}

export function getCurrTime() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(
        tab.id,
        { action: "getVideoInfo" },
        (response) => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          if (response && response.currentTime) {
            console.log("Current Time: ", response.currentTime);
            resolve(response.currentTime);
          } else {
            console.log("Unable to get current time. response: ", response);
            reject(new Error("Unable to get current time"));
          }
        }
      );
    });
  });
}

// export function getVideoID() {
//   var gotID = "";
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     // Get the first tab object in the array (should be the only one due to the query)
//     var tab = tabs[0];
//     // Parse the URL
//     const url = new URL(tab.url);

//     const params = new URLSearchParams(url.search);

//     // Get the value of the 'v' parameter (video ID)
//     const videoId = params.get("v");

//     // Log the URL of the current tab to the console
//     gotID = videoId;
//     console.log(tab.url);
//     console.log("video id: ", videoId);

//     // ytp-time-current
//   });

//   console.log("got id: ", gotID);
// }

// Use the chrome.tabs.query API to query the current active tab in the current window

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   const tab = tabs[0];
//   chrome.tabs.sendMessage(tab.id, { action: "getVideoInfo" }, (response) => {
//     if (response && response.currentTime) {
//       console.log("Current Time: ", response.currentTime);
//     } else {
//       console.log("Unable to get current time. response: ", response);
//     }
//   });
// });

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   const tab = tabs[0];
//   chrome.tabs.sendMessage(tab.id, { action: "getVideoInfo" }, (response) => {
//     const eles = document.getElementsByClassName("ytp-time-current");
//     console.log("elemtnet: ", eles[0]);

//     console.log(document.querySelector(".ytp-time-current"));
//     // console.log("Call query");
//     // setTimeout(executeAfterDelay, 5000);
//     // const linkElement = document.head.querySelector('link[rel="shortlinkUrl"]');
//     // console.log("testing element: ", linkElement.getAttribute("href"));

//     // console.log("testingtestingtesting");
//     // console.log("video id printing test", document.getElementById("thumbnail"));
//     // document.getElementById("thumbnail").textContent = response.videoId;
//     // document.getElementById("timestamp").textContent = response.timestamp;
//   });
// });
// module.exports = getVideoID;

const msgerForm = get(".msger-inputarea");
// const msgerInput = get(".msger-input");
const msgerInput = get(".msger-input");
const originalInputElement = msgerInput.cloneNode(true);
const msgerChat = get(".msger-chat");
import { getVideoID } from "./youtube_video.js";
import { getCurrTime } from "./youtube_video.js";
const url = "http://35.153.182.249:5000/questions"; // replace with your API endpoint
const data = {
  transcript_id: "X",
  time_stamp: 109,
  history_data: {},
  question_text: "What is the person talking about?",
};

function convertToSeconds(timeString) {
  const timeComponents = timeString.split(":").map(Number);

  let totalSeconds = 0;

  if (timeComponents.length === 3) {
    // Format: hh:mm:ss
    const [hours, minutes, seconds] = timeComponents;
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
  } else if (timeComponents.length === 2) {
    // Format: mm:ss
    const [minutes, seconds] = timeComponents;
    totalSeconds = minutes * 60 + seconds;
  } else {
    throw new Error("Invalid time format");
  }

  return totalSeconds;
}

async function ask(videoID, timeStamp, question_text) {
  data.transcript_id = videoID;
  data.time_stamp = timeStamp;
  data.question_text = question_text;

  try {
    console.log("ask called, data: ", data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const answer = await response.json();
    return answer;
  } catch (error) {
    console.error("Fetch error:", error);
    return error;
  }
}

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :(",
];

const BOT_IMG = "resources/image/cloud-2.png";
const PERSON_IMG = "resources/image/cloud-2.png";
const BOT_NAME = "BOT";
const PERSON_NAME = "Sajad";

msgerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  msgerInput.replaceWith(originalInputElement);
  console.log("Event listener triggered");
  console.log("check ori ele: ", originalInputElement);

  const msgText = msgerInput.value;
  msgerInput.value = "";
  console.log("aaaaa----------------checking msg: ", msgText);
  if (!msgText) return;
  var resp = "";

  console.log("res: ", resp);

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);

  const img = document.createElement("img");
  img.src = "./loading.gif";
  img.width = 50; // Adjust width as needed
  img.height = 50;
  img.style.marginRight = "auto";
  img.style.display = "block";
  msgerInput.replaceWith(img);

  // const inputElement = document.createElement("input");
  // inputElement.type = "text";
  // inputElement.className = "msger-input";
  // inputElement.placeholder = "Enter your message...";
  // const i2 = document.createElement("img");
  // i2.src = "./loading.gif";
  // i2.width = 100;
  // msgerInput.replaceWith(originalInputElement);
  // msgerInput.classList.add("new-class");
  // msgerInput.classList.remove("msger-input");

  // msgerInput.

  var videoID = "";
  var videoTime = "";

  try {
    const videoIDInner = await getVideoID();
    videoID = videoIDInner;
  } catch (error) {
    botResponse(
      "There is a problem happened while getting your video id, could you please try refresh?"
    );
    originalInputElement.value = "";
    msgerInput.replaceWith(originalInputElement);
    // replaceInputBack(msgerInput);
    return;
  }

  try {
    const videoTimeInner = await getCurrTime();
    videoTime = convertToSeconds(videoTimeInner);
  } catch (error) {
    botResponse(
      "There is a problem happened while getting your current video's time stamp, could you please try refresh?"
    );
    const inputElement = document.createElement("input");
    // inputElement.type = "text";
    // inputElement.class = "msger-input";
    // inputElement.placeholder = "Enter your message...";
    // msgerInput.replaceWith(inputElement);
    // replaceInputBack(msgerInput);
    return;
  }

  try {
    const answer = await ask(videoID, videoTime, msgText);
    console.log(answer);
    resp = answer;
  } catch (error) {
    console.error("Error calling ask:", error);
  }

  botResponse(resp.answer.content);
  originalInputElement.value = "";
  msgerInput.value = "";
  // replaceInputBack(msgerInput);
  console.log("after call resp ", resp.answer.content);
});

function replaceInputBack(msgerInput) {
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.className = "msger-input";
  inputElement.placeholder = "Enter your message...";
  inputElement.value = "";
  msgerInput.replaceWith(inputElement);
}

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(msgText) {
  appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

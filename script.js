const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
import { getVideoID } from "./youtube_video.js";
import { getCurrTime } from "./youtube_video.js";
// require("dotenv").config();
const url = "http://35.153.182.249:5000/questions"; // replace with your API endpoint
const data = {
  transcript_id: "HFT_i4Q5dtM",
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

async function test_api() {
  try {
    const videoId = await getVideoID();
    const videoTime = await getCurrTime();
    const timeSec = convertToSeconds(videoTime);
    // console.log("Video ID:----", videoId);
    data.transcript_id = videoId;
    data.time_stamp = timeSec;
  } catch (err) {
    console.error(err);
  }

  // try {
  //   const videoTime = await getCurrTime();
  //   console.log("curr time: ----", convertToSeconds(videoTime));
  // } catch (err) {
  //   console.error(err);
  // }
  // const vID = getVideoID();
  // data.transcript_id = convertToSeconds(vID);
  // console.log("datatatata: ", data);
  try {
    console.log("test_api called, data: ", data);
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

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "resources/image/cloud-2.png";
const PERSON_IMG = "resources/image/cloud-2.png";
const BOT_NAME = "BOT";
const PERSON_NAME = "Sajad";

msgerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Event listener triggered");

  const msgText = msgerInput.value;
  if (!msgText) return;
  var resp = "";
  try {
    const answer = await test_api();
    console.log(answer);
    resp = answer;
  } catch (error) {
    console.error("Error calling test_api:", error);
  }

  console.log("res: ", resp);

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse(resp.answer.content);
  console.log("after call resp ", resp.answer.content);
});

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
  // const r = random(0, BOT_MSGS.length - 1);
  // const msgText = BOT_MSGS[r];
  appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  // const delay = msgText.split(" ").length * 100;
  // console.log(msgText);

  // setTimeout(() => {
  //   appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  // }, delay);
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
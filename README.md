# extension

# **Xplain: Chrome Extension**

This is a chrome extension version. The website version is located at: [here](https://xplain-website.vercel.app/). The website will only support a MIT open course.

You can find all the back end and front end code(for the website) in this [repo](https://github.com/LiSiruiRay/Xplain)

You can find detailed introduction of this project (including our initial pitching idea, our prospect, our initial expectation, etc) in [here](https://devpost.com/software/xplain?ref_content=user-portfolio&ref_feature=in_progress), though I will rewrite all of them under this README, too.

This project was initial started during MIT hackathon on Sep 16th 2023. Our idea was helping people who learn by videos. When met a question during watching a video, don’t search it up on google or ask ChatGPT anymore, simply click on our extension and ask. We aim to accelerate your learning experiences and make your learning more smooth.

## How to use it?

1. When available on Google extension store, search Xplain
2. Clone all the file to your local computer, import it into your chrome.

---

Here is the initial introduction:

## **Inspiration**

Current massive online courses are great resources to bridge the gap in educational inequality. Nevertheless, studies show that students often feel frustrated and have a high chance of giving up on their courses if there’s no support. We need to provide extra help to students to empower their potential through personalizing their learning experience.

## **What it does**

We are building an AI chatbot to enhance online learning. It will offer real-time support during online lectures (like MIT OCW) through interactive quizzes and personalized questions, promoting engagement and understanding, and helping to bridge the educational inequality gap.

Below are some of our products functions—

Answer Questions: Our platform can be used as a personal tutor. While having any questions about the video, pause and ask. Our bot will answer it for you, with simple language, outside resources, reference of this specific course (along which part of the video you should rewatch and what part of the text you should check out).

Summarization: For the long videos (particularly for those without sections), we will use a clustering algorithm along with LLMs to generate a summarization and sections for the video.

Pop up quiz: We will use our bot, fed with quiz and assignment from course website, to generate a series pop up quiz while you watching the video. This will first make sure that you are paying attention on the video and second that you are understanding the content.

Personalized active learning helper: We will also implement a function that allows you to select your current level of knowledge, vocabulary, and ability to understand language. By doing so, we allowed the bot to actively pop up tips and explanation of video content.

## **How we built it**

We used React as front end and Flask as back end. For now we will use ChatGPT as our AI engine.

## **Challenges we ran into**

- When deploy project with Vercel, the database will be read-only. Thus if we want to write into database, we will encounter problems. We avoid this problem by going databaseless.
- Limitation of ChatGPT’s token size. We developed an algorithm to solve the problem involving feeding different pieces of passage into ChatGPT and let it do a several-layer summarization.

## **Accomplishments that we're proud of**

- Pause the video, ask a question, a “peopleless” intelligent will answer your question! Wouldn’t that be exciting enough?

## **What we learned**

- How Vercel interact with database
- How to regulate ChatGPT’s API

## **What's next for Xplain**

### **More features**

- Search in the video. Now video platforms you cannot really search to certain concise frame. With our platform, users will be able to search in a video.
- Personalization in further steps: We will build databases for each users upon which we could generate more personalized report for users.
- More than words: Now our platform is answering the question totally based on words. Yet next step we can make it generate a series of animation to better explain the question

### **Wider usage**

- Other than YouTube videos, we will extend our platform to other video platforms. With our translation feature, we can extend it different languages. Also, we can also extend our project, with whisper, to any other video platform without subtitle, like Edx, Udemy, etc.
- Furthermore, other than only using the transcript as input, we will also try to implement our own “Large Video Model”, making our model understand from more abundant and deeper dimension.
- Even better, we could extend our project to non-video form of information. For example, we can do a PDF helper for those who read a lot. We can also extend, with image recognition, our platform to live videos, people’s lives, even directly interact with people’s brain instead of through words.

## **Built With**

OpenAI API, Flask, Python, React, JavaScript

## **Try it out**

- [xplain-website.vercel.app](https://xplain-website.vercel.app/)

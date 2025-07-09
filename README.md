# 🧠 LeetRoast - AI-Powered LeetCode Assistant

LeetRoast is a Chrome extension that helps you solve LeetCode problems by providing smart AI-generated hints — and roasts your code (lightly and lovingly, of course 😅).

> 🚀 No more struggling in silence — let the AI guide you, laugh with you, and teach you to code smarter.

---

## ✨ Features

- ✅ **AI-generated hints** (2–3 helpful nudges)
- 🔍 **Detects the problem** you're working on
- 💻 **Reads your code** from the LeetCode editor
- 😂 **Gives a fun roast** of your current code attempt
- ⏱️ **Auto-popup after 10 seconds** on a problem page
- 🖱️ Optional **manual “Generate” button** in popup
- 🧠 Powered by **Google Gemini API**



---

## 🛠️ Installation (Dev Mode)

1. Clone or download this repo.
2. Open Chrome and go to: `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **“Load unpacked”**
5. Select the project folder

> 💡 Now you’ll see the LeetRoast icon in your Chrome toolbar!

---

## 🧪 How to Use

### Option 1: Auto Mode
- Go to any [LeetCode problem](https://leetcode.com/problems/)
- Wait **10 seconds**
- A popup will appear asking:  
  > "Need a hint for this problem?"
- Click **"Yes"** to get hints and a roast!

### Option 2: Manual Mode
- Click the 🧠 LeetRoast extension icon in Chrome
- Click the **“Generate”** button
- See hints & roast in the popup window

---

## ⚙️ Configuration

### API Key (if using Gemini directly):
If you're using the Gemini API directly (not via proxy backend):

1. Replace the API key inside `content.js`:
   ```js
   const apiKey = "YOUR_GEMINI_API_KEY";

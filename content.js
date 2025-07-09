async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });
  return tabs[0];
}

document.addEventListener("DOMContentLoaded", () => {
  const hintBtn = document.getElementById("getbtn");
  if (hintBtn) {
    hintBtn.addEventListener("click", getdata);
  }
});

async function getdata() {
  console.log("clicked");
  const hintBox = document.querySelector("#text");
  hintBox.textContent = "💬 Gemini is thinking...";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const activeTab = await getActiveTabURL();
  let problemTitle = null;

  if (activeTab.url.includes("https://leetcode.com/problems/")) {
    problemTitle = activeTab.url
      .split("https://leetcode.com/problems/")[1]
      .split("/")[0];
    console.log(problemTitle);
  } else {
    console.log("unable to get the titile");
    hintBox.innerHTML =
      "<b>This page doesn't appear to be Leetcode.com</b></br></br>Please visit a Leetcode problem page to generate AI hints.";
    return;
  }

  const apiKey = "AIzaSyBxy9185SqBQ9hjIt5lOOy9EwxyV-hV_DA";
  console.log(problemTitle);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give a short and helpful coding hint for the LeetCode problem titled: "${problemTitle}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    hint = data.candidates[0].content.parts[0].text;
    // hintBox.innerHTML = "💡 Hint: " + hint;
    hintBox.innerHTML = `💡 Hint:  </br> ${hint}`;
    console.log(hint);
  } catch (err) {
    hintBox.innerHTML = " Failed to get hint from Gemini.";
    console.log(err);
  }
}
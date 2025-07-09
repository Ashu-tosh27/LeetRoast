function getProblemTitle() {
  const path = window.location.pathname;
  if (path.startsWith("/problems/")) {
    return path.split("/")[2];
  }
  return null;
}

function extractUserCode() {
  const editor = document.querySelector(".view-lines");
  if (!editor) return "No code detected.";
  const lines = [...editor.querySelectorAll("div")];
  return lines.map((line) => line.innerText).join("\n");
}

window.getHintFromAI = async function () {
  const hintBox = document.getElementById("hintResult");
  if (!hintBox) return;

  hintBox.innerHTML = "💬 Thinking...";
  const problemTitle = getProblemTitle();
  const userCode = extractUserCode();

  const prompt = `
You're an expert coding assistant.

Here is a LeetCode problem titled: "${problemTitle}"
Here is the user's code attempt:

\`\`\`python
${userCode}
\`\`\`

1. Give 2–3 helpful hints to help them solve the problem.
2. Roast their code lightly and humorously.
`;

  const apiKey = "AIzaSyBxy9185SqBQ9hjIt5lOOy9EwxyV-hV_DA";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    hintBox.innerHTML = text.replaceAll("\n", "<br>");
  } catch (err) {
    hintBox.innerHTML = "❌ Failed to get response.";
    console.error(err);
  }
};

// Auto popup after 10 seconds
if (window.location.href.includes("leetcode.com/problems/")) {
  setTimeout(() => {
    if (document.getElementById("leetai-popup")) return;

    const popup = document.createElement("div");
    popup.id = "leetai-popup";
    popup.style.position = "fixed";
    popup.style.bottom = "30px";
    popup.style.right = "30px";
    popup.style.zIndex = "9999";
    popup.style.padding = "15px";
    popup.style.background = "#1c1a1c";
    popup.style.color = "white";
    popup.style.borderRadius = "10px";
    popup.style.fontFamily = "Work Sans, sans-serif";
    popup.style.boxShadow = "0px 0px 15px rgba(0, 0, 0, 0.4)";
    popup.innerHTML = `
      <div style="margin-bottom: 10px;">💡 Need a hint for this problem?</div>
      <button id="yesBtn" style="margin-right: 10px; padding: 6px 12px; border: none; border-radius: 8px; background-color: #683fea; color: white; cursor: pointer;">Yes, give me a hint</button>
      <button id="noBtn" style="padding: 6px 12px; border: none; border-radius: 8px; background-color: #555; color: white; cursor: pointer;">No thanks</button>
      <div id="hintResult" style="margin-top: 10px; font-size: 14px;"></div>
    `;
    document.body.appendChild(popup);

    document.getElementById("yesBtn").onclick = window.getHintFromAI;
    document.getElementById("noBtn").onclick = () => popup.remove();
  }, 10000);
}

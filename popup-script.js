// popup-script.js
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
    hintBtn.addEventListener("click", async () => {
      const tab = await getActiveTabURL();

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const existing = document.getElementById("leetai-popup");
          if (!existing) {
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
          }
        },
      });
    });
  }
});

// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("get-help");

  button.addEventListener("click", async () => {
    // Inject script into the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => {
        console.log("Injected script running...");

        // Get problem title
        // Try to find problem title using multiple fallback strategies
        let title = 'Unknown Problem';

        const h4Title = document.querySelector('h4');
        if (h4Title) {
        title = h4Title.innerText;
        } else {
        const headTitle = document.title; // fallback to tab title
        const match = headTitle.match(/(.*) - LeetCode/);
        if (match) title = match[1];
        }


        // Wait for Monaco Editor to load
        const waitForEditor = () => {
          return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 20;

            const interval = setInterval(() => {
              const editor = window.monaco?.editor.getModels?.()[0];
              if (editor) {
                clearInterval(interval);
                resolve(editor.getValue());
              }
              attempts++;
              if (attempts >= maxAttempts) {
                clearInterval(interval);
                resolve('');
              }
            }, 100); // Retry every 100ms
          });
        };

        const code = await waitForEditor();

        if (!code) {
          alert(" Could not extract your code. Make sure the LeetCode editor is visible and has code in it.");
          return;
        }

        console.log(" Code captured, sending to backend...");
        console.log("Title:", title);
        console.log("Code Preview:", code.slice(0, 80) + '...');

        try {
          const response = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, code }),
          });

          const data = await response.json();

          if (data.hints_and_roast) {
            alert(data.hints_and_roast);
          } else {
            alert("🧐 No response from backend.");
          }
        } catch (error) {
          console.error("Fetch failed:", error);
          alert("⚠️ Failed to contact backend server.");
        }
      },
    });
  });
});

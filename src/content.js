async function loadSVG(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

async function injectLoopControls(chromeControls, rightControls) {
  const abContainer = document.createElement("div");
  abContainer.classList.add("loop-controls");

  const buttonA = document.createElement("button");
  const buttonB = document.createElement("button");
  abContainer.appendChild(buttonA);
  abContainer.appendChild(buttonB);

  chromeControls.insertBefore(abContainer, rightControls);

  buttonA.innerHTML = await loadSVG(chrome.runtime.getURL("images/looks_one.svg"));
  buttonB.innerHTML = await loadSVG(chrome.runtime.getURL("images/looks_two.svg"));
}

function tryInject(framesLeft = 30) {
  const chromeControls = document.querySelector(".ytp-chrome-controls");
  const rightControls = document.querySelector(".ytp-right-controls");

  if (chromeControls && rightControls) {
    if (chromeControls.querySelector(".loop-controls")) return;
    injectLoopControls(chromeControls, rightControls);
    return;
  }

  if (framesLeft > 0) {
    requestAnimationFrame(() => tryInject(framesLeft - 1));
  }
}

tryInject();
window.addEventListener("yt-navigate-finish", () => tryInject());

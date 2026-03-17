async function loadSVG(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

async function addElement() {
  const chromeControls = document.querySelector(".ytp-chrome-controls");
  const rightControls = document.querySelector(".ytp-right-controls");

  // Create div container for A/B controls
  const abContainer = document.createElement("div");
  abContainer.classList.add("loop-controls");

  // Create A/B buttons
  const buttonA = document.createElement("button");
  const svgAUrl = chrome.runtime.getURL("images/looks_one.svg");
  buttonA.innerHTML = await loadSVG(svgAUrl);

  const buttonB = document.createElement("button");
  const svgBUrl = chrome.runtime.getURL("images/looks_two.svg");
  buttonB.innerHTML = await loadSVG(svgBUrl);

  // Append to container
  abContainer.appendChild(buttonA);
  abContainer.appendChild(buttonB);

  chromeControls.insertBefore(abContainer, rightControls);
}

addElement();

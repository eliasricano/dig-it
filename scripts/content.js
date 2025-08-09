import ExtensionControls from "./ExtensionControls";

document.body.onload = addElement;

function addElement() {
    const chromeControls = document.querySelector(".ytp-chrome-controls");
    const rightControls = document.querySelector(".ytp-right-controls");

    const loopingControls = document.createElement("div", {
        is: "extension-controls",
    });

    const button = document.createElement("button");
    button.appendChild(document.createTextNode("Extension button"));

    chromeControls.insertBefore(button, rightControls);
}

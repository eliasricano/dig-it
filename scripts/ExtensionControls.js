class ExtensionControls extends HTMLDivElement {
    constructor() {
        super();
    }
}

customElements.define("extension-controls", ExtensionControls, {
    extends: "div",
});

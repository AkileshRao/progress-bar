const setSize = (size) => {
    if (size == "sm") return "5px";
    if (size == "md") return "10px";
    if (size == "lg") return "15px";
    if (size == "xl") return "20px";
}

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

class ProgressBar extends HTMLElement {
    static get observedAttributes() {
        return ["value", "color", "size"]
    }

    constructor() {
        super()

        this.attachShadow({ mode: "open" })

        let template = document.getElementById("progress_bar_template")
        this.shadowRoot.append(template.content.cloneNode(true))
        this.handleProgress = this.handleProgress.bind(this)
        this.handleColor = this.handleColor.bind(this)
    }


    handleProgress() {
        let value = this.getAttribute("value")
        let step = this.getAttribute("step")
        value < 100 && this.setAttribute("value", +step + +value)
    }

    handleColor() {
        this.setAttribute("color", randomColor())
    }
    connectedCallback() {
        this.shadowRoot.querySelector("#increase").addEventListener("click", this.handleProgress)

        this.shadowRoot.querySelector("#random_color").addEventListener("click", this.handleColor)
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("#increase").removeEventListener("click", this.handleProgress)

        this.shadowRoot.querySelector("#random_color").removeEventListener("click", this.handleColor)
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name == "value" && newVal <= 100) {
            this.shadowRoot.querySelector("#current_progress").style.width = `${newVal}%`
        }

        if (name == "size") {
            this.shadowRoot.querySelector("#total_progress").style.height = setSize(newVal)
            this.shadowRoot.querySelector("#current_progress").style.height = setSize(newVal)
        }

        if (name == "color") {
            this.shadowRoot.querySelector("#current_progress").style.background = newVal;
            this.shadowRoot.querySelector("#random_color").style.background = newVal;
            this.shadowRoot.querySelector("#increase").style.background = newVal;
        }
    }
}


customElements.define("progress-bar", ProgressBar)

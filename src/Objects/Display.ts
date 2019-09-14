import { State } from "../Three/World";

class Display {
    static print(state: State) {
        const domElement = document.querySelector("div.order");
        const p = document.createElement("p");
        p.textContent = state.order
        domElement.appendChild(p);
    }

    static delete() {
        const domElement = document.querySelector("div.order");
        const orders = domElement.querySelectorAll("p");
        orders[orders.length - 1].remove();
    }
}

export default Display;
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

    static allDelete() {
        const domElement = document.querySelector("div.order");
        const orders = domElement.querySelectorAll("p");
        orders.forEach(order => order.remove());
    }

    static displayPoint(point: number) {
        const domElement = document.querySelector("h2");
        const tensuu = 30 - point;
        domElement.textContent = "ポイント: " + tensuu.toString();
    }

    static goal(point: number) {
        const domElement = document.querySelector("h2");
        domElement.textContent += "Goal!";
    }
}

export default Display;
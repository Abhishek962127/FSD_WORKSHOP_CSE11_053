import EventEmitter from "node:events";

function createDomEvent() {
    const myEmitter = new EventEmitter();

    return {
        addEventListener(eventType, listener) {
            myEmitter.on(eventType, listener);
        },

        removeEventListener(eventType, listener) {
            myEmitter.off(eventType, listener);
        },

        dispatchEvent(event) {
            event.target = this;
            event.currentTarget = this;
            console.log(this);
            myEmitter.emit(event.eventType, event);
        }
    };
}

const button = createDomEvent();

button.addEventListener("save", () => {
    console.log("save...");
});
button.addEventListener('click',()=>{
    console.log("Button click")
});
button.addEventListener('color',()=>{
    console.log("Background color change")
})
button.dispatchEvent({
    eventType: "color"
});
import Eventemitter from "node:events";
const myEmitter = new Eventemitter();
myEmitter.on("greet", (teacher) => {
    console.log(`Class started by ${teacher}`);
});
myEmitter.off("goodbye", (teacher) => {
    console.log(`Class finished by ${teacher}`);
});
myEmitter.emit("greet", "Mr. Smith");
myEmitter.emit("goodbye", "Mr. Smith");
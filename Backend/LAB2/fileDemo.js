import { log } from "node:console";
import fs from "node:fs/promises"

const filePath = "./userData.txt";
async function run(params) {
    await createFile("Hello world")
    await readFile();
    await appenFile("Abhishek")
    await readFile();
    deleteFile();
}
async function createFile(content) {
    try {
        await fs.writeFile(filePath, content, "UTF-8");
        console.log(`File create sucessfully:- ${content}`)
    }
    catch (error) {
        console.log(`Error in file ${error}`);
    }
}
async function readFile() {
    try {
        const content = fs.readFile(filePath, "UTF-8")
        console.log(content)
    }
    catch (error) {
        console.log(`Error in file ${error}`);
    }
}
async function appenFile() {
    try {
        await fs.appendFile(filePath, content, "UTF-8");
        console.log(`File create sucessfully:- ${content}`)
    }
    catch (error) {
        console.log(`Error in file ${error}`);
    }
}
async function deleteFile() {
    try {
        await fs.unlink(filePath);
        console.log("File deleted");
    }
    catch (error) {
        console.log(`Error in deleting file ${error}`)
    }
}
run();

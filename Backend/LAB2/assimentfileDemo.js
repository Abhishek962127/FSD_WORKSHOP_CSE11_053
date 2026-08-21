import fs from "node:fs/promises";

const filePath = "./assigment.json";

async function run() {
    await createFile({ name: "Abhishek" });

    await readFile();

    await appendFile({ age: 18 });

    await readFile();

    await deleteFile();
}

async function createFile(data) {
    try {
        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2),
            "UTF-8"
        );

        console.log("JSON file created successfully");
    }
    catch (error) {
        console.log(`Error in file: ${error}`);
    }
}

async function readFile() {
    try {
        const content = await fs.readFile(filePath, "UTF-8");

        const data = JSON.parse(content);

        console.log(data);
    }
    catch (error) {
        console.log(`Error in reading file: ${error}`);
    }
}

async function appendFile(newData) {
    try {
        const content = await fs.readFile(filePath, "UTF-8");

        const data = JSON.parse(content);

        Object.assign(data, newData);

        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2),
            "UTF-8"
        );

        console.log("Data added successfully");
    }
    catch (error) {
        console.log(`Error in appending file: ${error}`);
    }
}

async function deleteFile() {
    try {
        await fs.unlink(filePath);

        console.log("File deleted");
    }
    catch (error) {
        console.log(`Error in deleting file: ${error}`);
    }
}

run();
import express from "express";
import cors from "cors";

const app = express();
const port = 7000;

app.use(express.json());
app.use(cors());

const arr = [
    {
        id: 111,
        name: "ABhi",
        dept: "Cse",
        classs: "Cse11",
    },
    {
        id: 102,
        name: "Abhitansu",
        dept: "Cse",
        classs: "Cse11",
    },
    {
        id: 101,
        name: "sonkar",
        dept: "Cse",
        classs: "Cse13",
    },
];

const registeredData = [];

// GET /
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Server",
        arr,
    });
});

// GET /user
app.get("/user", (req, res) => {
    res.status(200).json({
        message: "Welcome to Server",
        arr,
    });
});

// POST /create
app.post("/create", (req, res) => {
    try {
        const { id, name, dept, classs } = req.body;

        const newUser = {
            id,
            name,
            dept,
            classs,
        };

        arr.push(newUser);

        res.status(200).json({
            message: "user created successfully",
            newUser,
        });

    } catch (error) {
        console.log(`Error message ${error}`);
    }
});


// =============================
// SIGNUP
// =============================

app.post("/signup", (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if email already exists
        const existingUser = registeredData.find(
            (user) => user.email === email
        );

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Create new user
        const newUser = {
            id: registeredData.length + 1,
            name,
            email,
            password
        };

        // Store user
        registeredData.push(newUser);

        res.status(201).json({
            message: "Signup successful",
            user: newUser
        });

    } catch (error) {

        console.log(`Signup error: ${error}`);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


// GET /registered
app.get("/registered", (req, res) => {
    res.status(200).json({
        users: registeredData,
    });
});


// GET /user/:id
app.get("/user/:id", (req, res) => {
    try {

        const id = req.params.id;

        const search = arr.find((u) => u.id == id);

        if (!search) {
            return res.status(404).json({
                message: "Not found in array",
            });
        }

        return res.status(200).json({
            message: "User found",
            user: search,
        });

    } catch (error) {

        console.log(`Message : ${error}`);
    }
});


// PUT /edit/:id
app.put("/edit/:id", (req, res) => {
    try {

        const id = parseInt(req.params.id);

        const { name, dept, classs } = req.body;

        const search = arr.findIndex((u) => u.id == id);

        if (search == -1) {
            return res.status(404).json({
                message: "Not found in array",
            });
        }

        arr[search] = {
            id: id,
            name,
            dept,
            classs,
        };

        return res.status(200).json({
            message: "User updated successfully",
            user: arr[search],
        });

    } catch (error) {

        console.log(`Message : ${error}`);
    }
});


// GET /userByid/:id
app.get("/userByid/:id", (req, res) => {
    try {

        const id = req.params.id;

        const use = arr.find((u) => u.id == id);

        if (!use) {
            return res.status(404).json({
                message: "user not found",
            });
        }

        return res.status(200).json({
            message: "user found",
            use,
        });

    } catch (error) {

        console.log(`message : ${error}`);
    }
});


app.listen(port, () => {
    console.log(`running on server ${port}`);
});
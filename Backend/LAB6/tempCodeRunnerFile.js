import express from "express";
import cors from "cors";

const app = express();

const port = 7000;

// Middleware
app.use(express.json());
app.use(cors());


// -------------------- DATA --------------------

const arr = [
    {
        id: 111,
        name: "ABhi",
        dept: "Cse",
        classs: "Cse11"
    },
    {
        id: 102,
        name: "Abhitansu",
        dept: "Cse",
        classs: "Cse11"
    },
    {
        id: 101,
        name: "sonkar",
        dept: "Cse",
        classs: "Cse13"
    }
];

const registeredData = [];


// -------------------- HOME --------------------

app.get("/", (req, res) => {

    res.status(200).json({
        message: "Welcome to Server",
        arr
    });

});


// -------------------- GET ALL USERS --------------------

app.get("/user", (req, res) => {

    res.status(200).json({
        message: "All users",
        users: arr
    });

});


// -------------------- CREATE USER --------------------

app.post("/create", (req, res) => {

    try {

        const { id, name, dept, classs } = req.body;

        if (!id || !name || !dept || !classs) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const newUser = {
            id,
            name,
            dept,
            classs
        };

        arr.push(newUser);

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


// -------------------- GET REGISTERED USERS --------------------

app.get("/registered", (req, res) => {

    res.status(200).json({
        message: "Registered users",
        users: registeredData
    });

});


// -------------------- GET USER BY ID --------------------

app.get("/user/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const search = arr.find((u) => u.id === id);

        if (!search) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "User found",
            user: search
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


// -------------------- UPDATE USER --------------------

app.put("/edit/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const { name, dept, classs } = req.body;

        const index = arr.findIndex((u) => u.id === id);

        if (index === -1) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        arr[index] = {
            id,
            name,
            dept,
            classs
        };

        res.status(200).json({
            message: "User updated successfully",
            user: arr[index]
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


// -------------------- GET USER BY ID --------------------

app.get("/userByid/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const user = arr.find((u) => u.id === id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "User found",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


// -------------------- DELETE USER --------------------

app.delete("/user/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const index = arr.findIndex((u) => u.id === id);

        if (index === -1) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const deletedUser = arr.splice(index, 1);

        res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser[0]
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


// -------------------- SIGNUP --------------------

app.post("/signup", (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const existingUser = registeredData.find(
            (user) => user.email === email
        );

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        const newUser = {

            id: registeredData.length + 1,

            name,

            email,

            password

        };

        registeredData.push(newUser);

        res.status(201).json({

            message: "Signup successful",

            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

});


// -------------------- SERVER --------------------

app.listen(port, () => {

    console.log(`Server running on http://localhost:${port}`);

});
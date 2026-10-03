import express from "express";
import cors from "cors";

const app = express();

const port = 7000;


// -------------------- MIDDLEWARE --------------------

app.use(express.json());
app.use(cors());


// -------------------- DATA --------------------

const arr = [
    {
        id: 111,
        name: "ABhi",
        email: "abhi@gmail.com",
        password: "123456",
        dept: "Cse",
        classs: "Cse11"
    },

    {
        id: 102,
        name: "Abhitansu",
        email: "abhitansu@gmail.com",
        password: "123456",
        dept: "Cse",
        classs: "Cse11"
    },

    {
        id: 101,
        name: "sonkar",
        email: "sonkar@gmail.com",
        password: "123456",
        dept: "Cse",
        classs: "Cse13"
    }
];


// ====================================================
// HOME
// ====================================================

app.get("/", (req, res) => {

    res.status(200).json({

        message: "Welcome to Server",

        arr

    });

});


// ====================================================
// GET ALL USERS
// ====================================================

app.get("/user", (req, res) => {

    res.status(200).json({

        message: "All users",

        users: arr

    });

});


// ====================================================
// SIGNUP
// ====================================================

app.post("/signup", (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Check required fields
        if (!name || !email || !password) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }


        // Check duplicate email
        const existingUser = arr.find(
            (user) => user.email === email
        );


        if (existingUser) {

            return res.status(400).json({

                message: "Email already registered"

            });

        }


        // Generate new ID
        const newId =
            arr.length > 0
                ? Math.max(...arr.map(user => user.id)) + 1
                : 1;


        // Create new user
        const newUser = {

            id: newId,

            name: name,

            email: email,

            password: password,

            dept: "Cse",

            classs: "Cse11"

        };


        // Add user to array
        arr.push(newUser);


        // Don't send password to frontend
        res.status(201).json({

            message: "Signup successful",

            user: {

                id: newUser.id,

                name: newUser.name,

                email: newUser.email,

                dept: newUser.dept,

                classs: newUser.classs

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"

        });

    }

});


// ====================================================
// LOGIN
// ====================================================

app.post("/login", (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Check fields
        if (!email || !password) {

            return res.status(400).json({

                message: "Email and password are required"

            });

        }


        // Find user
        const user = arr.find(
            (user) =>
                user.email === email &&
                user.password === password
        );


        // User not found
        if (!user) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }


        // Login successful
        res.status(200).json({

            message: "Login successful",

            user: {

                id: user.id,

                name: user.name,

                email: user.email,

                dept: user.dept,

                classs: user.classs

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"

        });

    }

});


// ====================================================
// CREATE USER
// ====================================================

app.post("/create", (req, res) => {

    try {

        const {
            id,
            name,
            email,
            password,
            dept,
            classs
        } = req.body;


        // Check all fields
        if (
            !id ||
            !name ||
            !email ||
            !password ||
            !dept ||
            !classs
        ) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }


        // Check duplicate ID
        const existingId = arr.find(
            (user) => user.id === id
        );


        if (existingId) {

            return res.status(400).json({

                message: "ID already exists"

            });

        }


        // Check duplicate email
        const existingEmail = arr.find(
            (user) => user.email === email
        );


        if (existingEmail) {

            return res.status(400).json({

                message: "Email already registered"

            });

        }


        // Create user
        const newUser = {

            id,

            name,

            email,

            password,

            dept,

            classs

        };


        arr.push(newUser);


        res.status(201).json({

            message: "User created successfully",

            user: newUser

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"

        });

    }

});


// ====================================================
// GET USER BY ID
// ====================================================

app.get("/user/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);


        const search = arr.find(
            (user) => user.id === id
        );


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

        console.log(error);

        res.status(500).json({

            message: "Server error"

        });

    }

});


// ====================================================
// UPDATE USER
// ====================================================

app.put("/edit/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);


        const {
            name,
            email,
            password,
            dept,
            classs
        } = req.body;


        // Check fields
        if (
            !name ||
            !email ||
            !password ||
            !dept ||
            !classs
        ) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }


        // Find user
        const index = arr.findIndex(
            (user) => user.id === id
        );


        if (index === -1) {

            return res.status(404).json({

                message: "User not found"

            });

        }


        // Update user
        arr[index] = {

            id,

            name,

            email,

            password,

            dept,

            classs

        };


        res.status(200).json({

            message: "User updated successfully",

            user: arr[index]

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"

        });

    }

});


// ====================================================
// DELETE USER
// ====================================================

app.delete("/user/:id", (req, res) => {

    try {

        const id = parseInt(req.params.id);


        // Find user
        const index = arr.findIndex(
            (user) => user.id === id
        );


        if (index === -1) {

            return res.status(404).json({

                message: "User not found"

            });

        }


        // Delete user
        const deletedUser = arr.splice(index, 1);


        res.status(200).json({

            message: "User deleted successfully",

            user: deletedUser[0]

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"

        });

    }

});


// ====================================================
// SERVER
// ====================================================

app.listen(port, () => {

    console.log(
        `Server running on http://localhost:${port}`
    );

});
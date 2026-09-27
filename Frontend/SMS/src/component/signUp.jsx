import { useState } from "react";

function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:7000/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                alert("Signup successful!");

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

            } else {
                alert(data.message);
            }

        } catch (error) {

            console.log(error);
            alert("Unable to connect to server");

        }
    };

    return (
        <div className="signup-page">

            <div className="signup-box">

                <h1>Create Account</h1>

                <p>Sign up to get started</p>

                <form onSubmit={handleSubmit}>

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Sign Up
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Signup;
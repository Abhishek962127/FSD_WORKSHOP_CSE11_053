import { useState } from "react";
import axios from "axios";

function Signup() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [message, setMessage] = useState("");


    const handleSignup = async (e) => {

        e.preventDefault();


        // Check password
        if (password !== confirmPassword) {

            setMessage(
                "Passwords do not match"
            );

            return;

        }


        try {

            const result = await axios.post(

                "http://localhost:7000/signup",

                {

                    name: name,

                    email: email,

                    password: password

                }

            );


            setMessage(
                result.data.message
            );


            // Clear form

            setName("");

            setEmail("");

            setPassword("");

            setConfirmPassword("");


        } catch (error) {


            if (error.response) {

                setMessage(
                    error.response.data.message
                );

            } else {

                setMessage(
                    "Server error"
                );

            }

        }

    };


    return (

        <div className="signup">

            <h1>
                Sign Up
            </h1>


            <form onSubmit={handleSignup}>


                <input

                    type="text"

                    placeholder="Enter name"

                    value={name}

                    onChange={(e) =>
                        setName(e.target.value)
                    }

                    required

                />


                <input

                    type="email"

                    placeholder="Enter email"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                    required

                />


                <input

                    type="password"

                    placeholder="Enter password"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                    required

                />


                <input

                    type="password"

                    placeholder="Confirm password"

                    value={confirmPassword}

                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }

                    required

                />


                <button type="submit">

                    Sign Up

                </button>


            </form>


            <p className="signup-message">

                {message}

            </p>


        </div>

    );

}

export default Signup;
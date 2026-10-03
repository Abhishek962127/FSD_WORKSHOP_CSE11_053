import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();


        try {

            const response = await fetch(
                "http://localhost:7000/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);

                return;

            }


            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            alert("Login successful");


            // Clear form
            setEmail("");
            setPassword("");


            // Go to Dashboard
            navigate("/dashboard");


        } catch (error) {

            console.log(error);

            alert("Server error");

        }

    };


    return (

        <div className="page-container">

            <h1>Login</h1>


            <form onSubmit={handleLogin}>

                <div>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                </div>


                <div>

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                </div>


                <button type="submit">
                    Login
                </button>

            </form>


            <br />


            <button onClick={() => navigate("/signup")}>
                Don't have an account? Signup
            </button>

        </div>

    );

}

export default Login;
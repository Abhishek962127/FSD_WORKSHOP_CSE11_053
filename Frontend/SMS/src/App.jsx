import { useState } from "react";
import Signup from "./component/signUp";
import ApiTester from "./component/ApiTester";
import "./App.css";

function App() {

    const [page, setPage] = useState("signup");

    return (
        <div>

            <nav className="navbar">

                <h2>My Application</h2>

                <div>

                    <button onClick={() => setPage("signup")}>
                        Signup
                    </button>

                    <button onClick={() => setPage("api")}>
                        API Tester
                    </button>

                </div>

            </nav>

            {page === "signup" && <Signup />}

            {page === "api" && <ApiTester />}

        </div>
    );
}

export default App;
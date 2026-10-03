import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";

import ApiTester from "./component/ApiTester";
import SignUp from "./component/signUp";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";

import "./App.css";

function App() {

    return (

        <BrowserRouter>

            <nav className="navbar">

                <h2>My Application</h2>

                <div>

                    <Link to="/signup">
                        <button>Signup</button>
                    </Link>

                    <Link to="/login">
                        <button>Login</button>
                    </Link>

                    <Link to="/dashboard">
                        <button>Dashboard</button>
                    </Link>

                    <Link to="/api">
                        <button>API Tester</button>
                    </Link>

                </div>

            </nav>


            <Routes>

                
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/signup"
                    element={<SignUp />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/api"
                    element={<ApiTester />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
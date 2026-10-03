import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };


    // If user is not logged in
    if (!user) {

        return (

            <div className="page-container">

                <h2>Please login first</h2>

                <button onClick={() => navigate("/login")}>
                    Go to Login
                </button>

            </div>

        );

    }


    return (

        <div className="dashboard">

            <h1>Dashboard</h1>

            <h2>
                Welcome, {user.name}
            </h2>


            <div>

                <p>
                    <strong>ID:</strong> {user.id}
                </p>

                <p>
                    <strong>Name:</strong> {user.name}
                </p>

                <p>
                    <strong>Email:</strong> {user.email}
                </p>

                <p>
                    <strong>Department:</strong> {user.dept}
                </p>

                <p>
                    <strong>Class:</strong> {user.classs}
                </p>

            </div>


            <br />


            <button onClick={handleLogout}>
                Logout
            </button>

        </div>

    );

}

export default Dashboard;
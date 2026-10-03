import { useState } from "react";
import axios from "axios";

function ApiTester() {

    const [method, setMethod] = useState("GET");

    const [url, setUrl] = useState(
        "http://localhost:7000/user"
    );

    const [body, setBody] = useState("");

    const [response, setResponse] = useState("");

    const [status, setStatus] = useState("");


    const sendRequest = async () => {

        try {

            setResponse("");
            setStatus("Loading...");


            let data;


            // Convert JSON text into JavaScript object
            if (body.trim() !== "") {

                data = JSON.parse(body);

            }


            const result = await axios({

                method: method,

                url: url,

                data: data,

                headers: {
                    "Content-Type": "application/json"
                }

            });


            setStatus(result.status);


            setResponse(
                JSON.stringify(
                    result.data,
                    null,
                    2
                )
            );


        } catch (error) {

            // Server responded with error
            if (error.response) {

                setStatus(error.response.status);

                setResponse(
                    JSON.stringify(
                        error.response.data,
                        null,
                        2
                    )
                );

            }

            // Request was not sent
            else {

                setStatus("Error");

                setResponse(error.message);

            }

        }

    };


    const handleMethodChange = (e) => {

        const newMethod = e.target.value;

        setMethod(newMethod);


        if (
            newMethod === "GET" ||
            newMethod === "DELETE"
        ) {

            setBody("");

        }

    };


    return (

        <div className="api-container">

            <h1>API TESTER</h1>


            <div className="request-bar">


                <select
                    value={method}
                    onChange={handleMethodChange}
                >

                    <option value="GET">
                        GET
                    </option>

                    <option value="POST">
                        POST
                    </option>

                    <option value="PUT">
                        PUT
                    </option>

                    <option value="DELETE">
                        DELETE
                    </option>

                </select>


                <input
                    type="text"
                    value={url}
                    onChange={(e) =>
                        setUrl(e.target.value)
                    }
                    placeholder="Enter API URL"
                />


                <button onClick={sendRequest}>
                    Send
                </button>

            </div>


            {(method === "POST" ||
                method === "PUT") && (

                <div className="request-body">

                    <h3>
                        Request Body
                    </h3>


                    <textarea
                        value={body}
                        onChange={(e) =>
                            setBody(e.target.value)
                        }
                        placeholder={`{
    "name": "Abhishek",
    "email": "abhi@gmail.com"
}`}
                    />

                </div>

            )}


            <div className="response">

                <div className="response-header">

                    <h3>
                        Response
                    </h3>


                    <span>
                        Status: {status}
                    </span>

                </div>


                <pre>

                    {response ||
                        "Response will appear here..."}

                </pre>

            </div>

        </div>

    );

}

export default ApiTester;
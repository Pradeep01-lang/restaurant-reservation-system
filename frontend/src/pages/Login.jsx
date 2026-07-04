import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(formData);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert(data.message);

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {

            alert(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="mb-3">

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        required
                    />

                </div>

                <button className="btn btn-success">
                    Login
                </button>

            </form>

        </div>

    );
}

export default Login;
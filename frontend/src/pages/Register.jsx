import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer"
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

            const data = await registerUser(formData);

            alert(data.message);

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message || "Registration Failed"
            );

        }
    };

    return (

        <div className="container mt-5">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                        required
                    />
                </div>

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

                <button className="btn btn-primary">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;
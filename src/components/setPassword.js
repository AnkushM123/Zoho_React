import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import messages from "../core/constants/messages";
import passwordRegex from "../core/constants/password-regex";
import auth from "../core/services/auth-service";
import { configureToastOptions } from "../core/services/toast-service";

function SetPassword() {
    const [message, setMessage] = useState('');
    const [inputData, setInputData] = useState({
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({});
    const id = localStorage.getItem("id");

    const validation = () => {
        const error = {}
        if (!inputData.password.trim()) {
            error.password = messages.setPassword.error.passwordRequired;
        } else if (!passwordRegex.test(inputData.password)) {
            error.password = messages.setPassword.error.passwordValidation;
        }

        if (!inputData.confirmPassword.trim()) {
            error.confirmPassword = messages.setPassword.error.confirmPasswordRequired;
        } else if (!passwordRegex.test(inputData.confirmPassword)) {
            error.confirmPassword = messages.setPassword.error.passwordValidation;
        }
        setError(error);
        if (!inputData.password.trim() || !passwordRegex.test(inputData.password) || !inputData.confirmPassword.trim() || !passwordRegex.test(inputData.confirmPassword)) {
            return true;
        }
    };

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const loginData = async (e) => {
        e.preventDefault();
        if (validation()) {
            return;
        }

        if (inputData.password !== inputData.confirmPassword) {
            setMessage(messages.setPassword.error.passwordUnmatched);
            return;
        }
        try {
            const result = await auth.setPassword(inputData, id);
            setMessage('');
            setTimeout(function () {
                const toastOptions = configureToastOptions();
                toast.options = toastOptions;
                toast.success(messages.setPassword.success.passwordChanged);
            });
        } catch (error) {
            const toastOptions = configureToastOptions();
            toast.options = toastOptions;
            toast.error(error);
        }
    }

    return (
        <>
            <center>
                <div class="card text-center" style={{ width: "600px", marginTop: "60px" }}>
                    <div class="card-header h5 text-white bg-primary gradient-custom-2">Password Reset</div>
                    <div class="card-body px-5">
                        <form action="#" method="post" onSubmit={loginData}>
                            <div class="mb-3">
                                <label for="password" class="form-label font-weight-bold" style={{ marginRight: "340px" }}>New Password:</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="enter new password" onChange={handleChange} />
                                {error.password && <p class="form-label font-weight-bold" style={{ color: "red" }}>{error.password}</p>}
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label font-weight-bold" style={{ marginRight: "340px" }}>Confirm Password:</label>
                                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="enter confirm password" onChange={handleChange} />
                                {error.confirmPassword && <p class="form-label font-weight-bold" style={{ color: "red" }}>{error.confirmPassword}</p>}
                            </div>
                            <br></br>
                            <button type="submit" class="btn btn-primary w-100 gradient-custom-2">Change Password</button>
                        </form>
                        <div class="d-flex justify-content-between mt-4">
                            <Link to="/">Back to login</Link>
                        </div>
                    </div>
                </div>
                {error.email && <p class="form-label font-weight-bold" style={{ color: "red" }}>{error.email}</p>}
                {message && <p className="form-label font-weight-bold" style={{ color: "red" }}>{message}</p>}
            </center>
        </>
    )
}

export default SetPassword;
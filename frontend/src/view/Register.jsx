
import { useState } from 'react';
import { Login, TravelExplore } from '@mui/icons-material'
import api from '../APIClient.js';
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from '@mui/material';
import { Link } from "react-router-dom";


function RegisterPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirm) {
            setAlertMessage("Passwords do not match.");
            setAlertOpen(true);
        }
        else {
            api.createUser(email, username, password).then((user) => {
                console.log(user)
                navigate("/");
            }).catch((error) => {
                console.log("error", error);
                setAlertMessage("There was a problem registering your email.");
                setAlertOpen(true)

            });
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        if (alertOpen) setAlertOpen(false);
      };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full">
                <div className="flex justify-center">
                    <div className="p-2 bg-[#A49694] rounded-full flex items-center justify-center">
                        <TravelExplore fontSize="large" className="h-6 w-6" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Travlr Log In</h2>
            </div>
            <div className="w-full mt-10 mx-3 bg-white py-8 px-4 shadow rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-gray-600 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-1">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-gray-600 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="text"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-gray-600 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="confirm"
                                name="confirm"
                                type="text"
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-gray-600 sm:text-sm"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A49694] hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500  "
                    >
                        <Login fontSize="small" />
                        <span className="text-md ml-1">Register</span>
                    </button>
                    <div className="flex items-center justify-center">
                        <Link to="/" className="hover:underline">Back to login</Link>
                    </div>
                </form>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={alertOpen}
                    onClose={handleClose}
                    autoHideDuration={5000}
                >
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default RegisterPage;  
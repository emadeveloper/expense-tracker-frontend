import React, { useState } from "react";

import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import AuthLayout from "../../components/layout/AuthLayout";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

const Signup = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Handle Signup Form Submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        //let profileImageURL = '';

        if (!fullName) {
            setError('Full name is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        if (!password || password.length < 8) {
            setError('Password is required. 8 characters min.');
            return;
        }

        if (!confirmPassword || password.length < 8) {
            setError('Confirm password is required');
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');

        // Signup API call
        try {
           /*  if (profilePic) {
                const formData = new FormData();
                formData.append('file', profilePic);
                formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

                const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                const uploadData = await uploadResponse.json();
                profileImageURL = uploadData.secure_url; // Get the uploaded image URL
            } */

            const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    email,
                    password,
                    confirmPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // Redirect to login page after successful signup
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again later.');
        }

    };

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-sm text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below
                </p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="Enter your full name"
                            type="text"
                        />
                        <Input
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                            label="Username"
                            placeholder="Enter your username"
                            type="text"
                        />
                        <div className="col-span-2">
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="emmanuel@example.com"
                            type="text"
                        />
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="Min 8 characters"
                                type="password"
                            />
                        </div>
                        <div className="col-span-2">
                            <Input
                                value={confirmPassword}
                                onChange={({ target }) => setConfirmPassword(target.value)}
                                label="Confirm Password"
                                placeholder="Min 8 characters"
                                type="password"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        SIGN UP
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link className="font-medium text-primary underline" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Signup;

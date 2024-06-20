import React from "react";
import { getApp } from "realm-web";
import { APP_ID } from "../realm/constants";

const Reset = async() => {

  const app = getApp(APP_ID);      
// implement reset functionality
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        await app.emailPasswordAuth.sendResetPasswordEmail({ email });
    };

    const handleSubmitnew = async (event) => {
        event.preventDefault();
        const pass = document.getElementById("password").value;
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const tokenId = params.get("tokenId");
        try {
            if (!token || !tokenId) {
                throw new Error(
                    "You can only call resetPassword() if the user followed a confirmation email link"
                );
            } else {
                await app.emailPasswordAuth.resetPassword({
                    password: pass,
                    token,
                    tokenId,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="form-group">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                    />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
                <form onSubmit={handleSubmitnew}>
                    <label htmlFor="password">Enter New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter new password"
                    />
                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    );
       
}

export default Reset;
import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Firebase/Context/useAuth/useAuth";
import SocialLogin from "../Social Login/SocialLogin";

const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <div className="card-body">
        <h3 className="text-3xl text-start font-bold">Welcome Back</h3>
        <p>Login with ZapShift</p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* password */}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Enter Password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be in 6 character</p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
        <p>
          Not have any account ?{" "}
          <Link
            to={"/register"}
            className="text-blue-400 font-semibold hover:text-blue-700"
          >
            Register Now
          </Link>
        </p>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;

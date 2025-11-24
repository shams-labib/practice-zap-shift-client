import React from "react";
import useAuth from "../../Firebase/Context/useAuth/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import SocialLogin from "../Social Login/SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const profileImg = data.photo[0];

    createUser(data.email, data.password)
      .then((userData) => {
        const formData = new FormData();
        formData.append("image", profileImg);

        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMGBB_KEY
            }`,
            formData
          )
          .then((res) => {
            const url = res.data.data.url;

            const updateUser = {
              displayName: data.name,
              photoURL: url,
            };

            updateUserProfile(updateUser);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(userData.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input outline-none"
              placeholder="Your name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Please enter your name boobie</p>
            )}
            <label className="label">Photo</label>
            <input
              {...register("photo", { required: true })}
              type="file"
              className="file-input outline-none"
              placeholder="Select Photo"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">
                Please provide your boobies picture
              </p>
            )}
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input outline-none"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Please provide your email boobie</p>
            )}
            <label className="label">Password</label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              })}
              type="password"
              className="input outline-none"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Please enter password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be in 6 character</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">Please provide a strong password</p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;

"use client";

import { SignUpFormFields, SignUpFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { fromZodError } from "zod-validation-error";
import { createUser } from "@/lib/server_actions/actions";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { watch } from "fs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({ resolver: zodResolver(SignUpFormSchema) });

  const selectedRole = watch("role");

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    console.log(data);
    const signUpUser = await createUser(data);

    if (signUpUser) {
      toast({
        className: "bg-green-600 text-neutral-100",
        title: "SmartScore",
        description: "Successfully Created the User.",
      });
      console.log(signUpUser);
    }

    const res = SignUpFormSchema.safeParse(data);
    if (!res.success) {
      console.log(fromZodError(res.error));
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl drop-shadow-2xl rounded px-8 max-sm:px-4 pt-6 pb-8 mb-4 sm:w-1/2"
      >
        <Label
          className="block text-gray-700 text-sm font-bold mb-4 border-b-2 border-zinc-300"
          htmlFor="SignupTag"
        >
          Sign-Up
        </Label>
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </Label>
          <Input
            {...register("name", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your Name"
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <Input
            {...register("username", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
          {errors.username && (
            <div className="text-red-500">{errors.username.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <div className="flex items-center justify-around">
            <div>
              <Input
                {...register("role", { required: true })}
                type="radio"
                id="faculty"
                name="role"
                value="faculty"
                className="h-4"
              />
              <span className="ml-2">Faculty</span>
            </div>
            <div>
              <Input
                {...register("role", { required: true })}
                type="radio"
                id="student"
                name="role"
                value="student"
                className="h-4"
              />
              <span className="ml-2">Student</span>
            </div>
          </div>
          {errors.role && (
            <div className="text-red-500">Please Select A Role</div>
          )}
        </div>

        {selectedRole === "student" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="classSection"
            >
              Section
            </label>
            <Input
              {...register("classSection", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="classSection"
              type="classSection"
              placeholder="Enter your Class Section"
            />
            {errors.classSection && (
              <div className="text-red-500">{errors.classSection.message}</div>
            )}
          </div>
        )}

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="text-red-500 text-xs">
              Password must be at least 8 characters long
              <br /> Password must contain at least one uppercase letter
              <br /> Password must contain at least one symbol
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <Label className="text-sm mt-4 text-balance">
          Already have an account?
          <span onClick={()=>{router.push("/")}} className="text-lsblue hover:text-blue-800"> Click Here </span>
          to Login
        </Label>
      </form>
    </div>
  );
};

export default SignupForm;

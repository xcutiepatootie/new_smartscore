"use client";

import { SignUpFormFields, SignUpFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { fromZodError } from "zod-validation-error";
import { createUser } from "@/lib/server_actions/actions";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { watch } from "fs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { department } from "./Section_Component/department";
import {
  sections_CAS,
  sections_CSS,
  sections_SHS,
} from "./Section_Component/sections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DevTool } from "@hookform/devtools";

const SignupForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({ resolver: zodResolver(SignUpFormSchema) });

  const selectedRole = watch("role");
  const selectedDepartment = watch("department");
  let setSection: typeof sections_CSS;
  switch (selectedDepartment) {
    case "College of Computer Studies":
      setSection = sections_CSS;
      break;
    case "College of Arts and Science":
      setSection = sections_CAS;
      break;
    case "Senior High School":
      setSection = sections_SHS;
      break;
  }

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
    <div className="flex h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-2xl drop-shadow-2xl max-sm:px-4 sm:w-1/2"
      >
        <Label
          className="mb-4 block border-b-2 border-zinc-300 text-sm font-bold text-gray-700"
          htmlFor="SignupTag"
        >
          Sign-Up
        </Label>
        <div className="mb-4">
          <Label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name
          </Label>
          <Input
            {...register("name", { required: true })}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <Input
            {...register("username", { required: true })}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            {...register("email", { required: true })}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
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

        <div className="grid grid-cols-2 gap-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="department"
          >
            Department:
          </label>
          <Controller
            control={control}
            name="department"
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent
                    {...register("department", { required: true })}
                  >
                    {department.map((dept, index) => (
                      <div key={index}>
                        <SelectItem value={dept.value}>{dept.value}</SelectItem>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />

          {selectedRole === "student" && (
            <>
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="classSection"
              >
                Section
              </label>
              <Controller
                control={control}
                name="classSection"
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-auto">
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent>
                        {setSection?.map((section: any, index: number) => (
                          <div key={index}>
                            <SelectItem value={section.value}>
                              {section.value}
                            </SelectItem>
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />

              {/*  <Input
                {...register("classSection", { required: true })}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="classSection"
                type="classSection"
                placeholder="Enter your Class Section"
              /> */}
              {errors.classSection && (
                <div className="text-red-500">
                  {errors.classSection.message}
                </div>
              )}
            </>
          )}
        </div>

        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            {...register("password", { required: true })}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="text-xs text-red-500">
              Password must be at least 8 characters long
              <br /> Password must contain at least one uppercase letter
              <br /> Password must contain at least one symbol
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline transform rounded bg-blue-500 px-4 py-2 font-bold text-white transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <Label className="mt-4 text-balance text-sm">
          Already have an account?
          <span
            onClick={() => {
              router.push("/");
            }}
            className="text-lsblue hover:text-blue-800"
          >
            Click Here
          </span>
          to Login
        </Label>
      </form>
      {/*   <DevTool control={control} /> */}
    </div>
  );
};

export default SignupForm;

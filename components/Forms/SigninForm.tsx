"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields, FormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { fromZodError } from "zod-validation-error";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const SigininForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.status === 200) {
      router.push("/dashboard");
      toast({
        title: "Redirecting...",
        description: "Login Successful",
      });
    }

    if (result?.status === 401) {
      router.push("/dashboard");
      toast({
        title: "Login Failed",
        description: "Invalid Email or Password",
        variant: "destructive",
      });
    }
    console.log(result);

    const res = FormSchema.safeParse(data);
    if (!res.success) {
      console.log(fromZodError(res.error));
    }
  };
  return (
    <div className="flex justify-center items-center h-auto px-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl drop-shadow-2xl rounded px-4 pt-6 pb-8 max-sm:px-8 max-sm:w-full"
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-4 border-b-2 border-zinc-300"
          htmlFor="SigninTag"
        >
          Sign-In
        </label>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            {...register("email")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        {/*  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">
                        Role
                    </label>
                    <div className="flex items-center justify-around">
                        <div>
                            <input
                                {...register('role', { required: true })}
                                type="radio"
                                id="faculty"
                                name="role"
                                value="faculty"
                            />
                            <span className="ml-2">Faculty</span>
                        </div>
                        <div>
                            <input
                                {...register('role', { required: true })}
                                type="radio"
                                id="student"
                                name="role"
                                value="student"
                            />
                            <span className="ml-2">Student</span>

                        </div>
                    </div>
                    {errors.role && (<div className='text-red-500'>{errors.role.message}</div>)}
                </div> */}
        <div className="flex items-center justify-between">
          <button
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <Label className="text-sm mt-4">
          Don't have an account yet?{" "}
          <span
            onClick={() => {
              router.push("/signup");
            }}
            className="text-lsblue hover:text-blue-800"
          >
            {" "}
            Click Here{" "}
          </span>
          to Sign Up
        </Label>
      </form>
      <div></div>
    </div>
  );
};

export default SigininForm;

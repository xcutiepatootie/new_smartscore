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
import { FaSpinner } from "react-icons/fa";

const SigininForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(FormSchema) });
  console.log({ isSubmitting });

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
    <div className="flex h-auto w-full items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-[50%] rounded bg-white px-4 pb-8 pt-6 shadow-2xl drop-shadow-2xl max-sm:w-full max-sm:px-8"
      >
        <label
          className="mb-4 block border-b-2 border-zinc-300 text-sm font-bold text-gray-700"
          htmlFor="SigninTag"
        >
          Sign-In
        </label>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            {...register("email")}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
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
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
        <div className="mb-5 flex items-center justify-between">
          <button
            disabled={isSubmitting}
            className="focus:shadow-outline transform rounded bg-blue-500 px-4 py-2 font-bold text-white transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            {isSubmitting ? (
              <Label className="flex flex-row items-center justify-center space-x-2 text-lg">
                <FaSpinner className="mr-4 animate-spin" />
                {"Signing In..."}
              </Label>
            ) : (
              <Label className="flex flex-row space-x-2 text-lg">Sign In</Label>
            )}
          </button>
        </div>
        <Label className="text-md mt-8">
          Don&apos;t have an account yet?{" "}
          <span
            onClick={() => {
              router.push("/signup");
            }}
            className="text-blue-600 hover:scale-150 hover:text-blue-800"
          >
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

"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { Formik } from "formik";
import { FiChevronRight } from "react-icons/fi";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useState } from "react";

export type RegisterFormValues = {
  email: string;
  password: string;
};

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();

  const loginFunc = async (values: RegisterFormValues) => {
    if (!isLoaded) {
      toast.error(
        "Something went wrong while trying to authenticate. Please check your browser compatibility"
      );
      return;
    }

    setIsLoading(true);
    try {
      setIsLoading(true);
      const signupResult = await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      if (signupResult.status === "complete") {
        await setActive({ session: signupResult.createdSessionId });
        window.location.href = "/";
      } else if (signupResult.status === "missing_requirements") {
        setIsLoading(false);
        toast.error("Please check your credentials and input and try again.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        "Something went wrong while trying to authenticate. Please check your credentials."
      );
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(v) => {
        loginFunc(v);
      }}
    >
      {({ handleChange, handleSubmit }) => (
        <div className="w-full relative flex max-w-[280px]  flex-col space-y-2 justify-start items-start">
          <div className="w-full flex flex-col justify-start items-start space-y-1">
            <Input
              as="input"
              type="email"
              labelText="E-mail"
              loading={isLoading}
              onChange={handleChange("email")}
              inputWrapperClassName="w-full"
              placeholderText="eg. john@doe.com"
            />
            <Input
              as="input"
              type="password"
              labelText="Password"
              loading={isLoading}
              onChange={handleChange("password")}
              inputWrapperClassName="w-full"
              placeholderText="Minimum 8 characters"
              tooltipText="We would never ask you for your password, or one-time verification code."
            />
          </div>
          <Button
            type="submit"
            onClick={() => handleSubmit()}
            loading={isLoading}
            className="space-x-1 w-full"
          >
            <span>Continue</span>
            <FiChevronRight
              className="text-white"
              size={18}
              strokeWidth={2.5}
            />
          </Button>
        </div>
      )}
    </Formik>
  );
}

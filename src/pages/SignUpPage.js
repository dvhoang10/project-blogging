import React, { useEffect } from "react";
import { Field } from "components/field";
import IconEyeToggle from "components/icons/IconEyeToogle";
import { Input } from "components/input";
import { Label } from "components/label";
import useToggleValue from "hooks/useToggleValue";
import { Button } from "components/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LayoutAuthentication from "layouts/LayoutAuthentication";
import { Checkbox } from "components/checkbox";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email format")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      term: false,
    },
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
    useToggleValue();
  useEffect(() => {
    document.title = "Register";
  }, []);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    // console.log("🚀 ~ arrErrors:", arrErrors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handleSignUp = (values) => {
    console.log("🚀 ~ values:", values);
  };

  return (
    <LayoutAuthentication>
      <form
        className="max-w-[600px] mx-auto"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div className="text-sm lg:text-base text-center font-normal mb-[30px] lg:mb-[25px]">
          You already have an account?{" "}
          <Link to="/" className="font-medium text-primary">
            Login
          </Link>
        </div>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            control={control}
            name="fullname"
            type="text"
            placeholder="Enter your fullname"
          />
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Create your password"
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </Field>
        <Checkbox
          control={control}
          name="term"
          checked={acceptTerm}
          onClick={handleToggleTerm}
        >
          <p className="flex-1 text-xs lg:text-sm">
            I agree to the{" "}
            <span className="underline text-primary">Term of Use</span> and have
            read and understand the{" "}
            <span className="underline text-primary">Privacy policy</span>.
          </p>
        </Checkbox>
        <Button
          type="submit"
          className="w-full mx-auto max-w-[300px]"
          kind="primary"
          isLoading={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;

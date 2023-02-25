import Button from "components/button/Button";
import Field from "components/field/Field";
import IconEyeToogle from "components/icons/IconEyeToogle";
import Input from "components/input/Input";
import Label from "components/label/Label";
import useToggleValue from "hooks/useToggleValue";
import LayoutAuthentication from "layouts/LayoutAuthentication";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Checkbox } from "components/checkbox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { useAuth } from "contexts/auth-context";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email format")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: yupResolver(schema),
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const watchRememberMe = watch("rememberMe");
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login successful!");
      reset({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      // if (error.message.includes("wrong-password"))
      //   toast.error("It seems your password was wrong");
      toast.error("Login unsuccessful!");
    }
  };
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Login";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <div>
      <LayoutAuthentication>
        <form
          className="max-w-[600px] mx-auto"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="text-sm lg:text-base text-center font-normal mb-[30px] lg:mb-[25px]">
            You don't have an account?{" "}
            <Link to="/register" className="font-medium underline text-primary">
              Register
            </Link>
          </div>
          <Field>
            <Label htmlFor="email">Email address</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              control={control}
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your password"
            >
              <IconEyeToogle
                open={showPassword}
                onClick={handleTogglePassword}
              ></IconEyeToogle>
            </Input>
          </Field>
          <div className="flex items-center justify-between mb-[25px]">
            <Checkbox
              name="rememberMe"
              checked={watchRememberMe === true}
              onClick={() => {
                setValue("rememberMe", !watchRememberMe);
              }}
            >
              <p className="flex-1 text-xs cursor-pointer lg:text-sm">
                Remember me
              </p>
            </Checkbox>
            <div className="text-xs font-normal lg:text-sm text-primary ">
              <Link to="/">Forgot password</Link>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full max-w-[300px] mx-auto h-12 lg:h-[60px]"
            kind="primary"
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </form>
      </LayoutAuthentication>
    </div>
  );
};

export default SignInPage;

"use client";

import React, { useState } from "react";
import Modal from "./modal";
import { signIn } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { GoSync } from "react-icons/go";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { addUser } from "@/utils/api";

export default function AuthModal() {
  const [error, setError] = useState("");
  const authModal = useAuthModal();

  let isLoginTabActive = authModal.tab === "login";

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      displayName: "",
      username: "",
      password: "",
    },
  });

  const handleSignIn = async (data: FieldValues) => {
    const response = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });
    if (response?.error) {
      setError("Invalid credentials");
      return;
    }
    authModal.toggle();
    router.refresh();
  };

  const onSubmit = async (data: FieldValues) => {
    setError("");

    // log in
    if (isLoginTabActive) {
      handleSignIn(data);
    }

    // sign up
    else {
      const response = await addUser(data);
      if (response?.message) {
        setError(response.message);
        return;
      }
      handleSignIn(data);
    }
  };

  const title = isLoginTabActive ? "Log in" : "Sign Up";

  const switchTab = () => {
    setError("");
    clearErrors();
    reset();
    if (authModal.tab === "login") {
      authModal.setTab("register");
    } else {
      authModal.setTab("login");
    }
  };

  return (
    <Modal isOpen={authModal.isOpen} toggle={authModal.toggle} title={title}>
      <div className="flex flex-col gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {!isLoginTabActive && (
            <>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="border px-3 py-2 rounded-md w-full"
                  {...register("email", {
                    required: "Please enter an email address",
                  })}
                />
                {errors.email && <p>{errors.email.message as string}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border px-3 py-2 rounded-md w-full"
                  {...register("displayName", {
                    required: "Please enter a full name",
                  })}
                />
                {errors.displayName && (
                  <p>{errors.displayName.message as string}</p>
                )}
              </div>
            </>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              className="border px-3 py-2 rounded-md w-full"
              {...register("username", {
                required: "Please enter a username",
              })}
            />
            {errors.username && <p>{errors.username.message as string}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="border px-3 py-2 rounded-md w-full"
              {...register("password", {
                required: "Please enter a password",
              })}
            />
            {errors.password && <p>{errors.password.message as string}</p>}

            {error && <p>{error}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="blue_button"
              disabled={isSubmitting}
            >
              {title}
              {isSubmitting && (
                <div className="animate-spin">
                  <GoSync />
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="flex gap-1">
          {isLoginTabActive ? (
            <>
              <span>Don&apos;t have an account?</span>
              <span
                className="cursor-pointer text-[#0095F6] hover:text-[#1877F2]"
                onClick={switchTab}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              <span>Have an account?</span>
              <span
                className="cursor-pointer text-[#0095F6] hover:text-[#1877F2]"
                onClick={switchTab}
              >
                Log in
              </span>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

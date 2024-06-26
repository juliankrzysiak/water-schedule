import { useField } from "@/hooks/useField";
import { notify } from "@/utils";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/auth";
import { Title } from "./Common/Title";

export const LoginForm = () => {
  const [{ ...email }, setEmail] = useField({ type: "text", id: "email" });
  const [{ ...password }, setPassword] = useField({
    type: "password",
    id: "pwd",
  });
  const navigate = useNavigate();

  const login = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      notify("error", error.message);
    }
    if (data.session) {
      setEmail("");
      setPassword("");
      navigate("/calendar");
    }
  };

  return (
    <form
      className="relative flex flex-col px-6 py-8 font-['Inter'] text-gray-200"
      onSubmit={login}
    >
      <Title title="Hydration" />
      <div className="mb-4 flex flex-col gap-1">
        <label className="" htmlFor="email">
          Email address
        </label>
        <input
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          {...email}
        />
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label className="" htmlFor="pwd">
          Your Password
        </label>
        <input
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          {...password}
        />
      </div>
      <button className="btn-primary btn mb-8" type="submit">
        Sign in
      </button>
      <div className="flex flex-col items-center gap-1 font-light underline">
        <Link to="/account/password">Forgot your password?</Link>
        <Link to="/account/register">Don't have an account? Sign up</Link>
      </div>
    </form>
  );
};

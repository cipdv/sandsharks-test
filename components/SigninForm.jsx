"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const SigninForm = () => {
  const router = useRouter();

  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const result = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Failed to sign in - check your email and password");
    }

    router.refresh();
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-100 p-4 rounded-md mt-6 w-full lg:w-3/5 mx-auto"
    >
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="block mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="block"
      />
      {/* <input type="hidden" name="csrfToken" value={csrfToken} /> */}
      <button type="submit" className="btn mt-4">
        Sign in
      </button>
      <h2 className="mt-4">
        <Link href="/signup">
          Haven't signed up yet? Click here to sign-up.
        </Link>
      </h2>
    </form>
  );
};

export default SigninForm;

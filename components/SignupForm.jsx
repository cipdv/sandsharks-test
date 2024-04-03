"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const SignupForm = () => {
  const router = useRouter();

  const initialState = {
    firstName: "",
    preferredName: "",
    lastName: "",
    email: "",
    pronouns: "",
    password: "",
    confirmPassword: "",
    emailNotifications: undefined,
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
    const result = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Failed to sign up - try again");
    }

    router.refresh();
    router.push("/dashboard");
  };

  //how do I clear this form after submission?

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-100 p-4 rounded-md mt-6 w-full lg:w-3/5 mx-auto"
    >
      <h1 className="text-2xl font-bold">Become a Sandsharks Member</h1>
      <div className="flex flex-col gap-3 glassmorphism mt-4">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Your legal first name"
          required
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="preferredName">Preferred Name</label>
        <input
          type="text"
          id="preferredName"
          name="preferredName"
          placeholder="This is the name other members will see on the website"
          value={formData.preferredName}
          onChange={handleChange}
        />
        {/* {errors.firstName && <p className="text-red-500">{errors?.firstName?.message}</p>} */}
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Your legal last name"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
        {/* {errors.lastName && <p className="text-red-500">{errors?.lastName?.message}</p>} */}

        <label htmlFor="pronouns">Pronouns</label>
        <select
          id="pronouns"
          name="pronouns"
          required
          value={formData.pronouns}
          onChange={handleChange}
        >
          <option value="" disabled="disabled">
            Select
          </option>
          <option value="they/them">They/them</option>
          <option value="she/her">She/her</option>
          <option value="he/him">He/him</option>
          <option value="other">Other</option>
        </select>
        {/* {errors.pronouns && <p className="text-red-500">{errors?.pronouns?.message}</p>} */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="This email will be your login as well as for email updates if you opt in"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="emailNotifications"
            value={formData.emailNotifications}
            onChange={handleChange}
          />
          <label className="ml-2">
            Check here if you want to receive email notifications when updates
            are posted
          </label>
        </div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Must be at least 6 characters long"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {/* {errors.password && <p className="text-red-500">{errors?.password?.message}</p>} */}
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Must match the password above"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {/* )} */}
        {/* <p aria-live="polite" className="sr-only" role="status">
                        {state?.message}
                    </p> */}

        <button className="btn" type="submit">
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;

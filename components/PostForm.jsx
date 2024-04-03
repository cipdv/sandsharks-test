"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PostForm = () => {
  const initialState = {
    title: "",
    message: "",
    date: "",
    startTime: "",
    endTime: "",
    beginnerClinicOffered: false,
    beginnerClinicStartTime: "",
    beginnerClinicEndTime: "",
  };

  const [formData, setFormData] = useState(initialState);
  //how do I clear this form after submission?

  const router = useRouter();

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
    const result = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Failed to create post");
    }

    router.refresh();
    // router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-100 p-4 rounded-md">
      <div className="flex flex-col gap-3 glassmorphism">
        <h1 className="text-2xl font-bold">Create a new post</h1>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Message</label>
        <textarea
          className="min-h-[200px] w-full"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
          <div className="sm:w-4/12">
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="w-full"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="sm:w-4/12">
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              className="w-full"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>
          <div className="sm:w-4/12">
            <label>End Time</label>
            <input
              type="time"
              name="endTime"
              className="w-full"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            name="beginnerClinicOffered"
            defaultChecked={formData.beginnerClinicOffered}
            onChange={handleChange}
          />
          <label className="ml-2">Beginner Clinic Offered</label>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
          <div className="sm:w-1/2">
            <label>Beginner Clinic Start Time</label>
            <input
              type="time"
              name="beginnerClinicStartTime"
              className="w-full"
              value={formData.beginnerClinicStartTime}
              onChange={handleChange}
            />
          </div>
          <div className="sm:w-1/2">
            <label>Beginner Clinic End Time</label>
            <input
              type="time"
              name="beginnerClinicEndTime"
              className="w-full"
              value={formData.beginnerClinicEndTime}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* )} */}
        {/* <p aria-live="polite" className="sr-only" role="status">
                        {state?.message}
                    </p> */}
        <button className="btn">Create new post</button>
      </div>
    </form>
  );
};

export default PostForm;

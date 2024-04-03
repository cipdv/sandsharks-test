import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Post from "../../(models)/postModel";

export async function POST(req) {
  try {
    const body = await req.json();

    const { title, message, date, startTime, endTime } = body.formData;
    const {
      beginnerClinicOffered,
      beginnerClinicStartTime,
      beginnerClinicEndTime,
    } = body.formData;

    const newPost = new Post({
      title,
      message,
      date,
      startTime,
      endTime,
      beginnerClinic: {
        beginnerClinicOffered,
        beginnerClinicStartTime,
        beginnerClinicEndTime,
      },
      createdAt: new Date(),
    });

    console.log(newPost);
    await newPost.save();

    revalidatePath("/dashboard");
    return NextResponse.json({ message: "post created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

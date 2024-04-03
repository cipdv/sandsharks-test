import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { encrypt } from "../../../(lib)/auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/navigation";
//models
import Member from "../../../(models)/memberModel";

export async function POST(req) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    preferredName,
    pronouns,
    email,
    emailNotifications,
    password,
    confirmPassword,
  } = body;

  //check if passwords match
  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Passwords do not match" },
      { status: 400 }
    );
  }

  try {
    //check if user already exists
    const memberExists = await Member.findOne({ email: email });

    if (memberExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newMember = new Member({
      firstName,
      lastName,
      preferredName,
      pronouns,
      email,
      emailNotifications,
      memberType: "pending",
      password: hashedPassword,
      waiver: false,
      createdAt: new Date(),
    });

    await newMember.save();

    //remove password from the object
    let resultObj = newMember.toObject();
    delete resultObj.password;

    // Create the session
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    const session = await encrypt({ resultObj, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });

    return NextResponse.json(
      { message: "Member signup successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return {
      message:
        "Failed to register: make sure all required fields are completed and try again",
    };
  }
}

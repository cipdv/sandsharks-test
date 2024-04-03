import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { encrypt } from "../../../(lib)/auth";
//models
import Member from "../../../(models)/memberModel";
import { redirect } from "next/navigation";

export async function POST(req) {
  console.log("logging in...");
  // Verify credentials && get the user

  const body = await req.json();

  const { email, password } = body;

  console.log("body", body);

  try {
    const result = await Member.findOne({ email: email });

    if (!result) {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 400 }
      );
    }

    //check if passwords match
    const passwordsMatch = await bcrypt.compare(password, result.password);
    if (!passwordsMatch) {
      return new NextResponse(400, { error: "invalid credentials" });
    }

    //remove password from the object
    let resultObj = result.toObject();
    delete resultObj.password;

    // Create the session
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    const session = await encrypt({ resultObj, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });

    return NextResponse.json({ message: "signin successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

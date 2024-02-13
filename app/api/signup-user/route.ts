import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { name, username, email, password, role } = reqBody;
    console.log(reqBody);

    if (!name || !username || !email || !password || !role) {
      return new Response("Missing Info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    /*  let user
        switch (role) {
            case 'faculty':
                user = await prisma.faculty.create({
                    data: {
                        name,
                        username,
                        email,
                        hashedPssword,
                        role
                    },
                });
                break;
            case 'student':
                user = await prisma.student.create({
                    data: {
                        name,
                        username,
                        email,
                        hashedPassword,
                        role
                    },
                })
                break;
        } */
    return new Response("User Successfully Created ", {
      status: 200,
      statusText: "User Successfully Created",
    });
  } catch (error: any) {
    if (
      (error.code === "P2002" && error.meta?.target?.includes("username")) ||
      (error.code === "P2002" && error.meta?.target?.includes("email"))
    ) {
      return new Response("Internal Error", {
        status: 409,
        statusText: "Username or Email already exists",
      });
    } else {
      console.log(error, "Registration Error");
    }
    return new Response("Internal Error", { status: 500 });
  }
}

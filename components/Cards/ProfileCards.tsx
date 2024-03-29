import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "next-auth";
import { Separator } from "../ui/separator";
import { lexend, poppins } from "@/utils/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export async function ProfileCards({ user }: any) {
  let user_section = null;
  if (user.role === "student") {
    const { section } = user.userSection;
    user_section = section;
  }

  return (
    <div className="grid h-screen w-full grid-cols-3 gap-4 p-12">
      <Card className="h-full w-full">
        <CardContent className="flex h-full flex-col items-center justify-evenly">
          <Avatar className="h-[40%] w-auto">
            <AvatarImage className="" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div
            className={`${poppins.className} flex min-h-44 flex-col items-center justify-start`}
          >
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <h2 className="text-xl font-extralight">{user.email}</h2>
          </div>

          {user.role === "student" && <p>Section: {user_section}</p>}
        </CardContent>
      </Card>

      <Card className="col-span-2 w-full">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <Separator className="my-2  bg-yellow-500 opacity-20" />
        </CardHeader>
        <CardContent className="grid grid-cols-2">
          <div
            className={`${poppins.className} space-y-8 font-light text-gray-500`}
          >
            <p>Name</p>
            <Separator className="my-2  bg-yellow-800" />
            <p>Email</p>
            <Separator className="my-2  bg-yellow-800" />
            <p>Username</p>
            <Separator className="my-2  bg-yellow-800" />

            {user.role === "student" && <p>Section</p>}
            <p>TBA: </p>
          </div>
          <div className={`${lexend.className} space-y-8`}>
            <p>{user.name}</p>
            <Separator className="my-2  bg-yellow-800" />

            <p>{user.email}</p>
            <Separator className="my-2  bg-yellow-800" />

            <p>{user.username}</p>
            <Separator className="my-2  bg-yellow-800" />

            {user.role === "student" && <p>Section: {user_section}</p>}
            <p>To Be Added </p>
          </div>
        </CardContent>

        <CardFooter>
          <p></p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfileCards;

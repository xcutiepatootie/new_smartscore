import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "next-auth";

export async function ProfileCards({ user }: any) {
  let user_section = null;
  if (user.role === "student") {
    const { section } = user.userSection;
    user_section = section;
  }

  return (
    <div>
      <Card className="w-[83vw]">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Name: {user.name}</p>
        </CardContent>
        <CardContent>
          <p>Email: {user.email}</p>
        </CardContent>
        <CardContent>
          <p>Username: {user.username}</p>
        </CardContent>
        {user.role === "student" && (
          <CardContent>
            <p>Section: {user_section}</p>
          </CardContent>
        )}

        <CardContent>
          <p>TBA: </p>
        </CardContent>

        <CardFooter>
          <p></p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfileCards;

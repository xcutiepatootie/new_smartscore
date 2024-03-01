import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  async function getFromSB() {
    "use server";
    const res = await fetch("http://localhost:8080/api/assignments");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedData = await res.json();
    console.log(fetchedData);
    return fetchedData;
  }

  const data = await getFromSB();
  console.log(data);
  const session = await getServerSession();
  if (session) {
    console.log(session.user.id);
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row max-sm:flex-col">
        <div>
          <Image src={"/1.png"} alt="HAHA" width={500} height={250} />
        </div>
        <div className="">
          <h1>Landing page</h1>
        </div>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ProfileImageUpload from "./profile-image-upload";
import { currentUser } from "@/lib/current-user";

export default async function ProfilePage() {
  const user = await currentUser();

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="flex flex-col items-center gap-4">
        <Avatar className="w-32 h-32">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <ProfileImageUpload />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Name: </h2>
        <p>{user?.name}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Email: </h2>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}

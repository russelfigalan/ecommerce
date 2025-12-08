// import { redirect } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/lib/current-user";
import ProfileImageUpload from "../../_components/profile-image-upload";
// import SettingsForm from "../../_components/settings-form";
import { ChangeUsernameForm } from "../../_components/change-username-form";
import { ChangeEmailForm } from "../../_components/change-email-form";
import { ChangePasswordForm } from "../../_components/change-password-form";

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
      <div>
        <h2 className="text-xl font-semibold">Username: </h2>
        <p>{user?.username}</p>
      </div>
      <div>
        <ChangeUsernameForm />
        <ChangeEmailForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}

import PageNotFound from "@/components/page-not-found";
import { getUser } from "@/utils/api";
import ProfileButtons from "./profile-buttons";
import ProfileAvatar from "./profile-avatar";
import { UserType } from "@/models/User";

const Profile = async ({ params }: { params: { username: string } }) => {
  const user = (await getUser(params.username)) as UserType;

  if (!user) {
    return <PageNotFound />;
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <ProfileAvatar profileImage={user.profileImage} />
      </div>
      <div className="flex flex-[2] flex-col">
        <div>
          <div className="flex gap-2 items-center">
            <div className="text-lg flex-1">{user.username}</div>
            <div className="flex items-center gap-3">
              <ProfileButtons />
            </div>
          </div>
        </div>
        <div className="flex gap-10 pt-7">
          <div>
            <strong>{user.posts.length}</strong> posts
          </div>
          <div>
            <strong>{user.followers.length}</strong> followers
          </div>
          <div>
            <strong>{user.following.length}</strong> following
          </div>
        </div>
        <div className="flex flex-col pt-7">
          <p className="font-bold">{user.displayName || user.username}</p>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import PageNotFound from "@/components/page-not-found";
import { getPosts, getUser } from "@/utils/api";
import ProfileButtons from "./profile-buttons";
import ProfileAvatar from "./profile-avatar";
import { UserType } from "@/models/User";
import PostCard from "@/components/posts/post-card";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProfileInfo from "./profile-info";

const Profile = async ({ params }: { params: { username: string } }) => {
  const user = (await getUser(params.username)) as UserType & {
    following: UserType[];
    followers: UserType[];
  };
  const session = await getServerSession(authOptions);

  if (!user) {
    return <PageNotFound />;
  }

  const posts = await getPosts({
    userId: user._id.toString(),
    onlyPostsOfFollowedUsers: false,
  });

  if (!posts) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex justify-center md:block">
          <ProfileAvatar profileImage={user.profileImage || "/avatar.jpg"} />
        </div>
        <div className="flex flex-[2] flex-col items-center md:items-start">
          <div>
            <div className="block md:flex text-center md:text-left gap-2 items-center">
              <div className="text-lg flex-1 mb-5 md:mb-0">{user.username}</div>
              {session && (
                <div className="flex items-center gap-3">
                  <ProfileButtons user={user} />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-10 pt-7">
            <ProfileInfo
              posts={posts}
              following={user.following}
              followers={user.followers}
            />
          </div>
          <div className="flex flex-col pt-7 text-center md:text-left">
            <p className="font-bold">{user.displayName || user.username}</p>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-1 grid-cols-3 mt-10">
        {posts.map((post: any) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default Profile;

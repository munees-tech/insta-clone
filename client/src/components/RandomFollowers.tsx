import { useUser, useFollow } from "../hooks/useFollow";

const RandomFollowers = () => {
  const { data: suggestuser, isLoading } = useUser();
  const followMutation = useFollow();

  if (isLoading) return <p className="text-white">Loading...</p>;

  const handleFollow = (userId: string) => {
    followMutation.mutate(userId);
  };

  return (
    <div className="hidden sm:block rounded-2xl p-4 text-white w-72 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Suggested for you</h2>

      <div className="flex flex-col gap-3">
        {Array.isArray(suggestuser) &&
          suggestuser.map((u: any) => (
            <div key={u.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={u.profilePic || "/avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p>{u.userName}</p>
              </div>

              <button
                onClick={() => handleFollow(u.id)}
                className="text-blue-500 text-sm font-semibold hover:underline"
              >
                Follow
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RandomFollowers;

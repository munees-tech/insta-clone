import { useState } from "react";
import { SlLike } from "react-icons/sl";
import { FaTrash } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import {
  usePosts,
  useLikePosts,
  useAddComment,
  useDelete,
} from "../hooks/usePosts";
import Loading from "./Loading";

const Feed = () => {
  const { data: posts = [], isLoading } = usePosts();
  const likeMutation = useLikePosts();
  const commentMutation = useAddComment();
  const deleteMutation = useDelete();

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  if (isLoading) {
    return (
        <Loading /> 
    );
  }

  const handleLikePost = (postId: number) => {
    likeMutation.mutate(postId);
  };

  const openCommentModal = (postId: number) => {
    setCurrentPostId(postId);
    setIsCommentOpen(true);
  };

  const handleAddComment = () => {
    if (!commentText.trim() || currentPostId === null) return;
    commentMutation.mutate({ postId: currentPostId, text: commentText });
    setCommentText("");
    setIsCommentOpen(false);
    setCurrentPostId(null);
  };

  const handleDelete = (postId: number) => {
    deleteMutation.mutate(postId);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-18 text-white w-full px-4 lg:px-0">
      <div className="w-full max-w-md mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts available</p>
        ) : (
          posts.map((post: any) => (
            <div
              key={post.id}
              className="border border-gray-600 p-4 rounded-xl shadow-md"
            >
              <p className="text-xl p-2 mb-2 text-gray-300">
                {post.description}
              </p>
              {post.img && (
                <img className="w-full rounded" src={post.img} alt="" />
              )}

              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <SlLike
                    onClick={() => handleLikePost(post.id)}
                    className="hover:text-pink-600 cursor-pointer"
                  />
                  <p>{post.like?.length || 0}</p>
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <FaRegComment
                      className=" hover:text-blue-700 cursor-pointer"
                      onClick={() => openCommentModal(post.id)}
                    />
                    <p>{post.comment?.length || 0}</p>
                    <div className="text-white"></div>
                  </div>
                </div>
                <FaTrash
                  onClick={() => handleDelete(post.id)}
                  className="hover:text-red-500 cursor-pointer"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comment Modal */}
      {isCommentOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-96 text-white flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Add Comment</h2>

            {/* show post comment */}

            <textarea
              className="p-2 rounded bg-gray-700 outline-none w-full h-24 resize-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsCommentOpen(false)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Feed;

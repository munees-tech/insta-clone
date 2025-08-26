import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useAddPost, usePosts } from "../hooks/usePosts";
import Loading from "./Loading";

const AddPostForm = () => {
  const addPostMutation = useAddPost();
  const { isLoading } = usePosts();
  const [formData, setFormData] = useState<{
    description: string;
    img: string | null; // we store Base64 string for now
  }>({
    description: "",
    img: null,
  });

  // handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, img: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description.trim()) return;

    if (isLoading) {
      return <p className="text-gray-200"><Loading /></p>;
    }
    addPostMutation.mutate({
      description: formData.description,
      img: formData.img ?? "",
    });
    console.log(formData.description);
    setFormData({
      description: "",
      img: null,
    });
  };

  return (
    <div className="w-full max-w-md p-5 rounded-xl shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4">Create Post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border border-gray-600 rounded-lg p-3 bg-black text-white outline-none"
          type="text"
          placeholder="What's on your mind?"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* file input */}
        <div className="flex justify-between items-center">
          <label htmlFor="post-upload" className="cursor-pointer">
            <input
              id="post-upload"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <CiImageOn className="text-blue-500" size={26} />
          </label>

          <button
            type="submit"
            className="bg-blue-600 w-14 hover:bg-blue-700 rounded-full p-2 font-semibold text-white"
          >
            Post
          </button>
        </div>

        {/* preview */}
        {formData.img && (
          <img
            src={formData.img}
            alt="preview"
            className="mt-3 rounded-lg max-h-60 object-cover"
          />
        )}
      </form>
    </div>
  );
};

export default AddPostForm;

import { toast } from "sonner";
import { axiosInstance } from "../lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch posts
const fetchPosts = async () => {
  const res = await axiosInstance.get("/post/all");
  return res.data;
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

// Like/Unlike post
export const useLikePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      await axiosInstance.post(`/post/like/${postId}`);
      return postId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({description,img}:{description:string,img:string}) => {
     const res = await axiosInstance.post("/post/",{description,img});
     return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["posts"]})
    }
  })
}

// Add comment
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, text }: { postId: number; text: string }) => {
      await axiosInstance.post(`/post/comment/${postId}`, { text });
      return { postId, text };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: number) => {
      await axiosInstance.delete(`/post/${postId}`);
      return postId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Deleted succesfully")
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

// Fetch suggested users
export const fetchUser = async () => {
  const res = await axiosInstance.get("/user/suggesteduser");
  return res.data;
};

export const fetchCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentuser"],
    queryFn: fetchCurrentUser,
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};

export const useFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await axiosInstance.post(`/user/following/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useProfileChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ img, bio }: { img?: any; bio: string }) => {
      const formData = new FormData();
      if (img) formData.append("img", img);
      formData.append("bio", bio);

      const res = await axiosInstance.post("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentuser"] });
    },
  });
};

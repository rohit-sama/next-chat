"use client";

import { z } from "zod";
import { FC, useState } from "react";
import { set, useForm } from "react-hook-form"
import Button from "./ui/Button";
import axios, { Axios, AxiosError } from "axios";
import { addFriendsValidator } from "@/lib/validations/addFriends";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFriendButtonProps {}
type FormData = z.infer<typeof addFriendsValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [success, setSuccess] = useState<boolean>(false);


  const {register , handleSubmit, setError, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(addFriendsValidator),
  })


  const addFriend = async (email: String) => {
    try {
      const ValidateEmail = addFriendsValidator.parse({ email });

      await axios.post("/api/friends/add", { email: ValidateEmail });

      setSuccess(true);
    } catch (error) {
      if(error instanceof z.ZodError) {
        setError("email", {message: error.message})
        return
      }
      if(error instanceof AxiosError){
        setError("email", {message: error.response?.data})
        return
      }

      setError("email", {message: "Something went wrong"})
    }

  };

  const onSubmit = (data: FormData) => { 
    addFriend(data.email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add a friend by email
      </label>
      <div className="mt-2 flex gap-4">
        <input
        {...register("email")}
          type="text"
          className="block w-full rounded-md border-0 pu-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus-ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
        <Button> Add </Button>
      </div>
      <p className="text-sm mt-1 text-red-600"> {errors.email?.message}</p>
      {success? ( <p className="text-sm mt-1 text-green-600"> Friend added successfully </p>): null}
    </form>
  );
};

export default AddFriendButton;

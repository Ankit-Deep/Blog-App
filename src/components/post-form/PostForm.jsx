import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, Button, RTE } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { addPostSlice } from "../../store/postSlice";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  // console.log("userdata is ", userData);

  const submit = async (data) => {
    // If the user wants to edit a post means there is an existing post which user wants to edit/update
    if (post) {
      // This is the file / image the user wants to update
      const file = data.image[0]
        ? await service.fileUpload(data.image[0])
        : null;

      // Deleting the old image
      if (file) {
        service.deleteFile(post.featuredImage);
      }

      // Updating the database with new image or file
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        // userName : userData.name,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // If the user wants to create a new post / blog:--

      const file = data.image[0]
        ? await service.fileUpload(data.image[0])
        : null;

      // const file = await service.fileUpload(data.image[0]);
      console.log("file upload : ", file);

      // Creating a new post
      if (file || !file) {
        console.log("file data is : ", data);

        const fileId = file ? file.$id : null;
        data.featuredImage = fileId;

        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
          // userName: userData.name,
        });

        console.log("\ndbPost is ", dbPost);
        // Navigating the user if dbPost has been successfully done
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // Change the slug (if the user enters space than we will replace it with '-' dash/ hyphen )
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    } else return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap sm:flex-row flex-col rounded-xl bg-[#9eb0c8] shadow-xl shadow-slate-700 sm:px-3 px-1 pt-2 pb-5 sm:my-0 my-5"
    >
      {/* This is the left part of the form */}
      <div className="sm:w-2/3 w-full px-3 rounded-xl ">
        <h1 className="px-1 text-xl font-normal underline py-1">
          Create a new Blog !!
        </h1>

        <Input
          label="Title :"
          placeholder="Title"
          className="mb-2"
          required
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-2"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content :"
          name="content"
          required
          control={control}
          // {...register("content", { required: false })}
          defaultValue={getValues("content")}
        />
      </div>

      {/* This is the right part of the form */}
      <div className="sm:w-1/3 w-full px-3 py-2 sm:py-8 flex flex-col rounded-xl">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-2"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />

        {post && (
          <div className="w-full">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          hover={post ? "hover:bg-green-600" : "hover:bg-blue-700"}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
// export default PostForm;

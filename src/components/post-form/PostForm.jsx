import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, Button, RTE } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const userData = useSelector((state) => state.auth.userData);
  console.log("userdata is ", userData);

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
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // If the user wants to create a new post / blog:--

      // const file = data.image[0]
      //   ? await service.fileUpload(data.image[0])
      //   : null;

      const file = await service.fileUpload(data.image[0]);

      // Creating a new post
      if (file) {
        console.log("data is : ", data)

        const fileId = file.$id;
        data.featuredImage = fileId;

        // const userId = await authService.getCurrentState();
        // console.log("user id is ", userId);

        const dbPost = await service.createPost({
          // featuredImage : fileId,
          ...data,
          userId: userData.$id,
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
      className="flex flex-wrap border-black border-2 rounded-xl bg-[#778da9]"
    >
      {/* This is the left part of the form */}
      <div className="w-2/3 px-3 border-2 rounded-xl">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
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
          control={control}
          // {...register("content", { required: false })}
          defaultValue={getValues("content")}
        />
      </div>

      {/* This is the right part of the form */}
      <div className="w-1/3 px-3 border-2 flex flex-col rounded-xl">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
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
          {/* {" "} */}
          {post ? "Update" : "Submit"}{" "}
        </Button>
      </div>
    </form>
  );
}
// export default PostForm;

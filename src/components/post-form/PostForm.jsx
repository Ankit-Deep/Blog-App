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

  const submit = async (data) => {
    // If the user wants to edit a post means there is an existing post which user wants to edit/update
    if (post) {
      // This is the file / image the user wants to update
      const file = data.image[0]
        ? await service.fileUpload(data.image[0])
        : null;

      // Deleting the old image
      if (file) {
        await service.deleteFile(post.featuredImage);
      }

      // Updating the database with new image or file
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        userName: userData.name,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // If the user wants to create a new post / blog:--

      // const file = data.image[0]
      //   ? await service.fileUpload(data.image[0])
      // : null;

      const file = await service.fileUpload(data.image[0]);

      // Creating a new post
      if (file) {

        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
          userName: userData.name,
        });

        // Navigating the user if dbPost has been successfully done

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // Change the slug (if the user enters space than we will replace it with '-' dash/ hyphen )
  const slugTransform = useCallback(
    (value) => {
      if (value && typeof value === "string") {
        return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");
      } else return "";
    },
    [submit, PostForm]
  );

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue, PostForm, submit]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="sm:w-full  flex flex-wrap flex-col bg-[#dbe2eb] sm:my-16 my-14 sm:px-5 px-3 py-5 rounded-md"
    >
      {/* This is the left part of the form */}
      <h1 className=" text-2xl font-medium py-2">Create a new Blog...</h1>
      <div className=" w-full rounded-xl flex flex-col md:flex-row gap-2">
        <div className=" md:w-4/6">
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
        </div>

        <div className=" md:w-2/6 flex flex-col justify-between gap-2">
          <Input
            label="Featured Image :"
            type="file"
            className=""
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image")}
          />

          {post && (
            <div className="w-full">
              <img
                src={service.getFileImagePreview(post.featuredImage)}
                alt={post.title}
                className="rounded"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-3"
            {...register("status", { required: true })}
          />
        </div>
      </div>

      {/* This is the right part of the form */}
      <div className=" w-full py-2 flex flex-col gap-5 ">
        <RTE
          label="Content :"
          name="content"
          required
          control={control}
          // {...register("content", { required: false })}
          defaultValue={getValues("content")}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
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

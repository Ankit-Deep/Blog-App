import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, label, control, defaultValue = "" }) {
  return (
    <>
      <div className="w-full ">
        {label && <label className="inline-block py-2 px-1 text-lg ">{label} </label>}

        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              initialValue={defaultValue}
              apiKey="0559941llz7w7kkhc57lfbibmyjt7x068444hmvqyobvimlf"
              // value={value}
              init={{
                // selector: 'Editor[name="content"]',
                track: false,         // disables tracking
                referrerPolicy: 'origin',
                premium_features: false,
                initialValue: defaultValue,
                max_height: 600,
                min_height: 600,
                // width:"350",
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],

                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",

                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </>
  );
}

// export default RTE;

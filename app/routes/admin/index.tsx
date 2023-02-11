import type { DataFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useId, useRef } from "react";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { isNonNull } from "~/lib/isNonNull";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  isPlaylistKey,
} from "~/modules/playlist/repository.server";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";

export { headers } from "~/modules/admin/route";

const PostPlaylistForm = zfd.formData({
  title: zfd.text(z.string({ required_error: "必須項目です" })),
  date: zfd
    .text(z.string({ required_error: "必須項目です" }))
    .refine((v) => !isNaN(new Date(v).getTime()), {
      message: "日付の形式が正しくありません",
    })
    .transform((v) => {
      const date = new Date(v);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }),
  url: zfd.text(
    z
      .string({ required_error: "必須項目です" })
      .url("URLの形式が正しくありません")
  ),
});

const DeletePlaylistForm = zfd.formData({
  id: zfd.text(
    z.string({ required_error: "必須項目です" }).refine(isPlaylistKey, {
      message: "不正な値です",
    })
  ),
});

const createActionResponse = (data: {
  success?: true;
  errors?: z.typeToFlattenedError<z.infer<typeof PostPlaylistForm>, string>;
  toast?: { level: "success" | "error"; message: string };
}) => {
  return {
    success: data.success ?? false,
    errors: data.errors ?? null,
    toast: data.toast ?? null,
  };
};

export const action = async ({ request }: DataFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      const result = PostPlaylistForm.safeParse(await request.formData());

      if (!result.success) {
        return json(createActionResponse({ errors: result.error.flatten() }), {
          status: 400,
        });
      }

      try {
        await createPlaylist(result.data);
        return json(createActionResponse({ success: true }));
      } catch {
        return json(
          createActionResponse({
            toast: {
              level: "error",
              message: "登録に失敗しました",
            },
          })
        );
      }
    }
    case "DELETE": {
      const result = DeletePlaylistForm.safeParse(await request.formData());
      if (!result.success) {
        return json(
          createActionResponse({
            toast: {
              level: "error",
              message: "削除に失敗しました",
            },
          }),
          { status: 400 }
        );
      }
      try {
        await deletePlaylist(result.data.id);
        return json(createActionResponse({}));
      } catch {
        return json(
          createActionResponse({
            toast: {
              level: "error",
              message: "削除に失敗しました",
            },
          }),
          { status: 400 }
        );
      }
    }
    default: {
      return json(createActionResponse({}), { status: 405 });
    }
  }
};

export const loader = async () => {
  const playlists = await getPlaylists();

  return json({
    playlists: playlists.filter(isNonNull),
  });
};

export default function AdminIndex() {
  const data = useLoaderData<typeof loader>();
  const ref = useRef<HTMLFormElement>(null);
  const actionData = useActionData<typeof action>();
  const formId = useId();
  const transition = useTransition();

  useEffect(() => {
    if (actionData?.toast) {
      toast(actionData.toast.message, {
        type: actionData.toast.level,
      });
    }
  }, [actionData?.toast]);

  useEffect(() => {
    if (actionData?.success) {
      ref.current?.reset();
    }
  }, [actionData?.success]);

  return (
    <div>
      <div className="max-w-lg mx-auto">
        <Form
          ref={ref}
          method="post"
          onSubmit={(v) => {
            console.log("submit");
          }}
        >
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor={`${formId}_title`} value="表示用の名前" />
            </div>
            <TextInput id={`${formId}_title`} type="text" name="title" />

            {actionData?.errors?.fieldErrors.title?.map((error) => (
              <p key={error} className="text-red-700">
                {error}
              </p>
            ))}
          </div>

          <div className="mt-3">
            <div className="mb-2 block">
              <Label htmlFor={`${formId}_date`} value="日付" />
            </div>
            <TextInput id={`${formId}_date`} type="date" name="date" />
            {actionData?.errors?.fieldErrors.date?.map((error) => (
              <p key={error} className="text-red-700">
                {error}
              </p>
            ))}
          </div>

          <div className="mt-3">
            <div className="mb-2 block">
              <Label htmlFor={`${formId}_url`} value="再生リストのURL" />
            </div>
            <TextInput
              id={`${formId}_url`}
              type="text"
              name="url"
              placeholder="https://www.youtube.com/playlist?list=xxxx"
            />
            {actionData?.errors?.fieldErrors.url?.map((error) => (
              <p key={error} className="text-red-700">
                {error}
              </p>
            ))}
          </div>

          {actionData?.errors?.formErrors?.map((error) => (
            <p className="mt-2" key={error}>
              {error}
            </p>
          ))}

          <Button
            className="mt-3"
            type="submit"
            disabled={transition.state === "submitting"}
          >
            {transition.state === "submitting" ? (
              <>
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
                追加中...
              </>
            ) : (
              "追加"
            )}
          </Button>
        </Form>
      </div>

      <ul className="max-w-lg mt-6 mx-auto">
        {data.playlists.map((playlist) => (
          <li className="flex mt-2 gap-4" key={playlist.id}>
            <p className="flex-1">
              <a href={playlist.url} rel="noopener noreferrer" target="_blank">
                <span className="w-24 inline-block">{playlist.date}</span>

                <span className="underline underline-offset-2">
                  {playlist.title}
                </span>
              </a>
            </p>
            <Form method="delete">
              <input type="hidden" name="id" value={playlist.id} />
              <Button color="failure" size="xs" type="submit">
                <TrashIcon className="w-4 h-4" />
              </Button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client"

import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";  
import { MoodValidation } from "@/lib/validations/mood";
import { createMood } from "@/lib/actions/thread.actions";

import { Input } from "@/components/ui/input"
//import { start } from "repl";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing"


interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}
const MAX_FILE_SIZE_MB = 4;
interface State {
  fileSizeError: string | null;
  loading: boolean;
}

function PostMood({ userId }: { userId: string }) {
    const { startUpload } = useUploadThing("media");
    const [files, setFiles] = useState<File[]>([])
    const router = useRouter();
    const pathname = usePathname();
    const [state, setState] = useState<State>({
      fileSizeError: null,
      loading: false,
    });

    const form = useForm({
        resolver: zodResolver(MoodValidation),
        defaultValues: {
            mood: '',
            accountId: userId, 
            moodImage: '',
        }
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
      e.preventDefault();

      const fileReader = new FileReader ();

      if(e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];

          const fileSizeMB = file.size / 1024 / 1024;
            if (fileSizeMB > MAX_FILE_SIZE_MB) {
              setState({
                fileSizeError: 'File size exceeds 4MB limit',
                loading: false,
              });
              return;
            } else {
              // Clear any previous error messages
              setState({
                fileSizeError: null,
                loading: false,
              });
            }

          setFiles(Array.from(e.target.files));

          if (!file.type.includes('image')) return;

          fileReader.onload = async (event) => {
              const moodImageUrl = event.target?.result?.toString() || '';

              fieldChange(moodImageUrl);
          }

          fileReader.readAsDataURL(file);
      }
    }

    const onSubmit = async (values: z.infer<typeof MoodValidation>) => {
      try {
        setState({
          ...state,
          loading: true,
        });
        
        const blob = values.moodImage;

        const hasImageChanged = isBase64Image(blob);

        if(hasImageChanged) {
            const imgRes = await startUpload(files)

            if(imgRes && imgRes[0].fileUrl){
                values.moodImage = imgRes[0].fileUrl;
            }
        }  

        await createMood ({ 
            text: values.mood,
            author: userId,
            communityId: null,
            path: pathname,
            moodImage: values.moodImage,
        });

        router.push("/");
      } catch (error: any) {
          throw new Error(`Cannot create mood ${error.message}`)
      } finally {
        setState({
          ...state,
          loading: false,
        });
      }

    }

    return (
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col justify-start gap-10"
          >
          
        
        <FormField 
        control={form.control}
        name="moodImage"
        render={({ field }) => (
          <FormItem className="flex items-center gap-4 mt-10">
            <FormLabel className="flex h-24 w-24 items-center justify-center rounded-md bg-snow-1">
              {field.value ? (
                <Image 
                src={field.value}
                alt="mood Image"
                width={100}
                height={100}
                priority
                className="rounded-md object-contain"
                />
                ): (
                <div></div>
              )}
          </FormLabel>
            <FormControl className="flex-1 text-base-semibold text-chilean-pink-1">
                <Input 
                    type="file"
                    accept="image/*"
                    placeholder="Upload your photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <div className="text-red-400 text-xs h-6 overflow-hidden ">
                {!state.fileSizeError && !field.value && <div>Must upload an image.</div>}
                {state.fileSizeError && <div>{state.fileSizeError}</div>}
              </div>
            </FormItem>
          )}
        />
        
        <FormField 
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem className="mt-20 flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-lg text-chilean-pink-0">
                  Description
                </FormLabel>
  
                <FormControl className="no-focus bg-snow-1 text-light-1">
                  <Textarea
                      rows={1}
                      {...field}
                  />
                </FormControl>
                <div className="text-red-400 text-xs h-6 overflow-hidden ">
                  {field.value && (field.value.length < 4 || field.value.length > 500) && (
                    <div >Description must be between 4 and 500 characters.</div>
                  )}
                </div>
              </FormItem>
            )}
          />

        <Button type="submit" className="flex justify-center bg-chilean-pink-1 text-snow" disabled={state.loading}>
          {state.loading ? "Creating Mood..." : "Create Mood"}
        </Button>

        </form>
        </Form>
    )
    
}

export default PostMood;
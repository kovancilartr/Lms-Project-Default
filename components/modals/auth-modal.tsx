import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const AuthModal = () => {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" size="sm">
          <LogIn className="h-4 w-4" />
          Giriş Yap
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center">
        <DialogHeader className="text-center pt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 40 40"
            className="mx-auto size-10 text-zinc-950 dark:text-white"
            aria-hidden
          >
            <mask
              id="a"
              width="40"
              height="40"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
            </mask>
            <g fill="currentColor" mask="url(#a)">
              <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
              <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
            </g>
          </svg>
          <DialogTitle className="mt-4 text-xl font-medium tracking-tight text-zinc-950 dark:text-white">
            Giriş Paneli
          </DialogTitle>
        </DialogHeader>

        <SignIn.Root>
          <SignIn.Step name="start" className="w-full space-y-6 px-8 py-6">
            <Clerk.GlobalError className="block text-sm text-red-400" />
            <div className="space-y-2">
              <Clerk.FieldError className="block text-sm text-red-400" />
              <Clerk.Field name="identifier" className="">
                <Clerk.FieldError className="block text-sm text-red-400" />
                <div className="space-y-2 flex flex-row justify-center items-center space-x-4">
                  <Clerk.Label className="text-sm font-medium text-zinc-950 dark:text-white flex-1">
                    Kullanıcı Adı veya Email Adresi
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    required
                    className="w-3/5 rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset 
                  ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] 
                  focus:ring-zinc-950 data-[invalid]:ring-red-400 placeholder:text-black text-black"
                  />
                </div>
              </Clerk.Field>
              <Clerk.Field name="password" className="">
                <Clerk.FieldError className="block text-sm text-red-400" />
                <div className="space-y-2 flex flex-row justify-center items-center space-x-4">
                  <Clerk.Label className="text-sm font-medium text-zinc-950 dark:text-white flex-1">
                    Şifre
                  </Clerk.Label>
                  <Clerk.Input
                    type="password"
                    required
                    className="w-3/5 rounded-md bg-white px-3.5 py-2 text-sm 
                  outline-none ring-1 ring-inset ring-zinc-300
                   hover:ring-zinc-400 focus:ring-[1.5px] 
                   focus:ring-zinc-950 data-[invalid]:ring-red-400 
                   placeholder:dark:text-black text-black"
                  />
                </div>
              </Clerk.Field>
            </div>
            <SignIn.Action
              submit
              className="w-full rounded-md bg-zinc-950 dark:bg-white dark:text-black p-2 text-base font-medium 
              text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 
              focus-visible:outline-[1.5px] focus-visible:outline-offset-2 
              focus-visible:outline-zinc-950 active:text-white/70 flex flex-row justify-center items-center gap-2"
              onClick={() => {
                toast({
                  title: "Giriş Başarılı",
                  description:
                    "Giriş işleminiz başarılı. Yönlendiriliyorsunuz...",
                });
              }}
            >
              <LogIn className="h-4 w-4" />
              Giriş Yap
            </SignIn.Action>
          </SignIn.Step>
        </SignIn.Root>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

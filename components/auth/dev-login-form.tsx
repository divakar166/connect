"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { developerLogin } from "@/actions/developerLogin";
import { DeveloperLoginSchema } from "@/lib/schemas";
import Link from "next/link";
import { BeatLoader } from "react-spinners";

export const DevLoginForm = () => {
  const [error,setError] = useState<string | undefined>()
  const [success,setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof DeveloperLoginSchema>>({
    resolver: zodResolver(DeveloperLoginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  });

  const onSubmit = (values:z.infer<typeof DeveloperLoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(()=>{
      developerLogin(values)
        .then((data)=>{
          setSuccess(data?.success)
          setError(data?.error)
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonHref="/auth/developer/register"
      backButtonLabel="Don't have an account?"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset">
                      Forgot Password?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >{isPending ? <BeatLoader /> : "Login"}</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
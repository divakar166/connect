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
import { startTransition, useState } from "react";
import { developerRegister } from "@/actions/developerRegister";
import { useRouter } from "next/navigation";
import { DeveloperRegisterSchema } from "@/lib/schemas";

export const DevRegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof DeveloperRegisterSchema>>({
    resolver: zodResolver(DeveloperRegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name:""
    }
  });

  const onSubmit = (values:z.infer<typeof DeveloperRegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(()=>{
      developerRegister(values)
        .then((data)=>{
          if(data?.success){
            setSuccess(data?.success)
            setTimeout(()=>{
              router.push('/auth/developer/login');
            }, 1000)
          }
          setError(data?.error)
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="Find Your Next Opportunity"
      backButtonHref="/auth/developer/login"
      backButtonLabel="Already have an account?"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
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
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full"
          >
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
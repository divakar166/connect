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
import { recruiterRegister } from "@/actions/recruiterRegister";
import { RecruiterRegisterSchema } from "@/lib/schemas";

export const RecruiterRegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RecruiterRegisterSchema>>({
    resolver: zodResolver(RecruiterRegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name:"",
      mobile:""
    }
  });

  const onSubmit = (values:z.infer<typeof RecruiterRegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(()=>{
      recruiterRegister(values)
        .then((data)=>{
          setError(data.error)
          setSuccess(data.success)
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="Hire Talent"
      backButtonHref="/auth/recruiter/login"
      backButtonLabel="Already have an account?"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="flex w-full items-center space-x-2">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="XYZ Tech Pvt Ltd"
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
                  <FormItem className="w-full">
                    <FormLabel>Company Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="john.doe@xyztech.in"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <FormField
              control={form.control}
              name="mobile"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="-91 952 158 1251"
                      type="text"
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
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
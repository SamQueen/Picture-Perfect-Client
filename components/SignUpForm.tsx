"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation';
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import instance from '../lib/axiosConfig';
import { showErrorToast } from "@/lib/toast";
 
const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(20, {
    message: "First name should be no more than 20 characters"
  }),
  firstName: z.string().min(1, {
    message: "First name should have at least one character"
  }).max(35, {
    message: "First name should be no more than 35 characters"
  }),
  lastName: z.string().min(1, {
    message: "First name should have at least one character"
  }).max(35, {
    message: "First name should be no more than 35 characters"
  }),
  password: z.string().min(5, {
    message: "Password should be at least 5 characters"
  }).max(50, {
    message: "Password should be no more than 50 characters"
  }),
  confirmPassword: z.string().min(5, {
    message: "Password should be at least 5 characters"
  }).max(50, {
    message: "Password should be no more than 50 characters"
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], // path to error for confirmPassword field
});
 
export function SignUpForm() {
  const router = useRouter();

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  })
 
  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.

    try {
      const response = await instance.post('createUser', {
        username: values.username,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      });
      
      if (response.status === 200) {
        router.push('/sign-in');
      } else {
        console.log("Error Creating User" + response);
        showErrorToast("Problem creating user. Please try again later.");
      }
    } catch (err: any) {
      
      if (err.response) {
        showErrorToast(err.response.data.message);
      } else {
        showErrorToast("We're having trouble connecting. Please try again later");
      }
    }
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormControl>
                    <Input placeholder="last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input type="password" placeholder="confirmPassword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
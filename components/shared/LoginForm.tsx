// "use client"

// // import { signIn } from "@/auth"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { toast } from "@/components/ui/use-toast"

// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   password: z.string().min(6, {
//     message: "Username must be at least 6 characters.",
//   }),
// })

// export function LoginForm() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       username: "",
//       password: ""
//     },
//   })

//   async function onSubmit(data: z.infer<typeof FormSchema>) {
//     console.log("I am in submit function");
//     // toast({
//     //   title: "You submitted the following values:",
//     //   description: (
//     //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//     //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//     //     </pre>
//     //   ),
//     // })
//     await signIn("google")
//   }

//   return (
//     <Form {...form}>  
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6 shadow-md p-10 bg-white rounded-md">
//        <p className="font-bold text-justify flex justify-center items-center text-3xl">Log In</p>
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter username" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" variant="outline">Submit</Button>
//         <p className="font-bold">OR</p>
//         <button type="submit" className="bg-black text-white p-3">Sign in with Google</button>
//         {/* <form
//       action={async () => {
//         "use server"
//         await signIn("google")
//       }}
//     >
//       <button type="submit" className="bg-black text-white p-3">Signin with Google</button>
//     </form> */}
//       </form>
//     </Form>
//   )
// }

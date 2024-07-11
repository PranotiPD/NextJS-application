"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";

type ForgetPasswordInputs = {
    email : string
}

const ForgetPassword = () => {
    const router = useRouter();
    
    const onSubmit = async (data : ForgetPasswordInputs) => {
        try {
            const response = await fetch("/api/auth/reset-password", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            });

            if(!response.ok){
                throw new Error("There was an error sending an email");
            }

            //if everything is ok now show success message
            toast.success("If email is registered. You will receive reset link!")
        } catch(error : any){
            toast.error(error.message);
        }
    }

    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<ForgetPasswordInputs>();
    return(
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="text-center">Forgot Password</div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

                <div className="text-sm leading-6">
                Remember your password ?  
                  <Link
                    href="#"
                    className="text-black hover:text-gray-900 underline decoration-black"
                  >
                    Log in
                  </Link>
                </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full border border-black justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white hover:border-black transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
            </div>
        </div>
      </div>
    )
}

export default ForgetPassword;
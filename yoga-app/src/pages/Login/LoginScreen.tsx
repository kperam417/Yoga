
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/Store"; // Adjust the path to your store file
import { loginSlice, loginUser } from "../../store/LoginSlice";


const loginSchema = z.object({
  
  email: z.string().email("Invalid email address"),
  password:z.string().min(6),
  // password: z.string()
  //   .min(6, "Password must be at least 6 characters")
  //   .regex(/[A-Z]/, "Must contain at least one uppercase letter"),
  
});
type LoginFormData = z.infer<typeof loginSchema>;
export default function LoginPage() {

  const dispatch = useDispatch<AppDispatch>();
  
    // 2. Initialize React Hook Form
    const {
      register,
      handleSubmit,
      formState: { errors,isDirty }
      //reset,
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
    });

    
    const onSubmit = (data: LoginFormData) => {
     console.log("Form submitted:", isDirty);
     
     dispatch(loginUser({email: data.email, password: data.password}));
     
    };
 
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      // style={{
      //   backgroundImage: `url('/assets/namaste_yoga.png)`, // Add your image to public/assets
      // }}
    >
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/namasteyoga.png" alt="YogaOnline" className="w-16 h-16 mb-2" />
          <h1 className="text-2xl font-semibold text-green-900">Namaste Yoga</h1>
        </div>

        {/* <form className="space-y-4" onSubmit={handleSubmit(onSubmit1)}> */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm text-green-800 mb-1">Email</label>
            <input
              
              placeholder="Email" {...register('email')}
              
              className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 "
            />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <label className="block text-sm text-green-800 mb-1">Password</label>
            <input
              type="password"
              placeholder="Password" {...register('password')}
              className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <p>{errors.password?.message}</p>
          <button
            type="submit" 
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-medium transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-green-800">
          <p>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </p>
          <p className="mt-2">
            New to YogaOnline?{' '}
            <a href="#" className="text-green-900 font-semibold hover:underline">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define Zod Schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10,"Invalid mobile number"),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
  password: z.string()
    .min(6, "Password must be 6+ characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter"),
      confirmpassword: z.string({ required_error: "Confirm password is required" }),
  }).refine((data) => data.password === data.confirmpassword, {
    message: "Passwords Doesn't match",
    path: ["confirmpassword"],
  })

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  // 2. Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // 3. Submit Handler
  const onSubmit = (data: SignupFormData) => {
    console.log("Yoga signup data:", data);
    // Add your API call here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-800">Join Our Namaste Yoga</h1>
          <p className="text-gray-600 mt-2">Start your journey today</p>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
           {/* mobile Field */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            id="mobile"
            type="text"
            {...register("mobile")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border ${
              errors.mobile ? "border-red-500" : ""
            }`}
          />
          {errors.mobile && (
            <p className="mt-1 text-sm text-red-600">{errors.mobile?.message}</p>
          )}
        </div>
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirm password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("confirmpassword")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border ${
              errors.confirmpassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmpassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmpassword.message}</p>
          )}
        </div>
        {/* Yoga Level Dropdown */}
        {/* <div>
          <label htmlFor="yogaLevel" className="block text-sm font-medium text-gray-700">
            Yoga Experience Level
          </label>
          <select
            id="yogaLevel"
            {...register("yogaLevel")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div> */}

        {/* Terms Checkbox */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              type="checkbox"
              {...register("agreeToTerms")}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
              I agree to the <a href="#" className="text-green-600 hover:text-green-500">terms and conditions</a>
            </label>
            {errors.agreeToTerms && (
              <p className="text-red-600">{errors.agreeToTerms.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <a href="#" className="text-green-600 hover:text-green-500">Log in</a>
        </p>
      </form>
    </div>
  );
}
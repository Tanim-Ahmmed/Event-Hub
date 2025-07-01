import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { userLogin } = useAuth();
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await userLogin({ email, password });
      navigate("/"); 
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                required
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div>
              {err && <p className="text-red-500 text-center">{err}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

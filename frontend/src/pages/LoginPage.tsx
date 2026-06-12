import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/users/mutations";
import { useNavigate } from "react-router";

interface LoginData {
  login: {
    token: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  };
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation<LoginData>(LOGIN);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data } = await login({
      variables: { email, password },
    });
    if (data && data.login.token && data.login.user) {
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      navigate("/");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;

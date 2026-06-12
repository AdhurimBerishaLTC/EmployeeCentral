import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "@/graphql/users/mutations";
import type { CreateUserInput, User } from "@/types/user";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface CreateUserResponse {
  createUser: User;
}

interface CreateUserVariables {
  input: CreateUserInput;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation<
    CreateUserResponse,
    CreateUserVariables
  >(CREATE_USER);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await createUser({
        variables: {
          input: {
            email,
            password,
            firstName,
            lastName,
          },
        },
      });
      if (data && data.createUser) {
        toast.success("User created successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" name="firstName" placeholder="First Name" required />
        <input type="text" name="lastName" placeholder="Last Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <Button type="submit" disabled={loading}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;

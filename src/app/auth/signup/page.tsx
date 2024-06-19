"use client";
import { register } from "@/apis/auth";
import { CheckUserLoggedIn } from "@/middleware/checkAuth";
import { Routes } from "@/utils/route.utils";
import { Button, TextInput, Label } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();
  CheckUserLoggedIn();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSigningUp(true);
      await register(name, email, password);
      toast.success("Registered successfully");
      router.push(Routes.home());
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsSigningUp(false);
    }
  };
  return (
    <div className="container mt-4 shadow-md p-4 rounded-md max-w-md text-black">
      <div className="row">
        <div className="col-12">
          <h1 className="text-2xl">Sign Up</h1>
          <form onSubmit={handleSubmit} className="gap-2 flex flex-col">
            <div className="form-group">
              <Label htmlFor="name">Name</Label>
              <TextInput
                id="name"
                type="text"
                placeholder="Enter name"
                sizing={"sm"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Label htmlFor="email">Email address</Label>
              <TextInput
                id="email"
                type="email"
                placeholder="Enter email"
                sizing={"sm"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button isProcessing={isSigningUp} color={"purple"} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 text-black">
          <div className="text-center">
            <div className="inline">{"Already have an account? "}</div>
            <Link href="/auth/signin" className="text-purple-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { signin } from "@/apis/auth";
import { CheckUserLoggedIn } from "@/middleware/checkAuth";
import { Button, TextInput, Label } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");
  CheckUserLoggedIn();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSigningIn(true);
      const res = await signin(email, password);
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        setError(res.data.message);
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="container mt-4 shadow-md p-4 rounded-md max-w-md text-black">
      <div className="row">
        <div className="col-12">
          <h1 className="text-2xl">Sign in</h1>
          <form onSubmit={handleSubmit} className="gap-2 flex flex-col">
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
                sizing={"sm"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>{error && <div className="text-red-500 text-sm font-bold">{error}</div>}</div>
            <Button isProcessing={isSigningIn} color={"purple"} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 text-black">
          <div className="text-center">
            <div className="inline">{"Don't have an account? "}</div>
            <Link href="/auth/signup" className="text-purple-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useMutation } from '@tanstack/react-query'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useUser();
  // console.log(email)
  // console.log(password)

  const getUserInfo = async ({ email, password }) => {
    const response = await axios.post('http://localhost:8080/api/login', {
      email,
      password,
    })
    // console.log(response.data)
    return response.data
  }

  const { mutate, isPending, isError, error, } = useMutation({
    mutationFn: getUserInfo,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      setUserInfo(data);
      navigate('/');
    },
    onError: (error) => {
      alert("Login failed", error.response?.data?.message || error.message);
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error("Email and password are required.");
      return;
    }
    mutate({ email, password });
  };

  return (
    <main className='flex flex-col w-screen min-h-screen'>
      <Header />
      <form className='flex grow items-center' onSubmit={handleSubmit}>
        <Card className='w-10/12 sm:w-md mx-auto'>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
            <div className='flex space-x-2'>
              <Checkbox id='save-pass' />
              <Label htmlFor='save-pass' className='font-normal'>Save password</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full hover:cursor-pointer'>Sign In</Button>
          </CardFooter>
        </Card>
      </form>
                  {/* <Footer /> */}
    </main>
  );
};

export default Login;

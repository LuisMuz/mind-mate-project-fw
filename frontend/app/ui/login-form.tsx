'use client'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import '@/app/ui/globals.css';
import { useAppContext } from '../lib/UserContext';
import { handleLogin } from '../lib/actions';

export default function LoginForm() {
  const { userId, setUserId, setUserRole, userRole } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "", 
    password: "",
  }); 
  
  const [errorMessage, setErrorMessage] = useState("");

  function handleRole(role: String){
    switch(role){
      case 'ADMIN':
        router.push("/dashboard-admin");
        break;
      case 'PSYCHOLOGIST':
        router.push("/dashboard-psychologist");
        break;
      case 'CLIENT':
        router.push("/dashboard-client");
        break;
      default:
        console.warn("Unexpected user role:", userRole);
    }
  }

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const { message, id, role } = await handleLogin(formData); 

      if(message === "Login successful"){
        setUserId(id);
        setUserRole(role);
        console.log(userId);
        handleRole(role as string); 
      }else{
        setErrorMessage(message);
      }
    } catch (error: any) { 
      setErrorMessage(error.message);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-blue-400 px-6 pb-4 pt-2">
        <div className="w-full">
          <>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className="mt-4 flex items-center text-red-600">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}
        <LoginButton />
        {/* <RegisterButton/> */}
        <div className="mt-4 text-center">
          <a href="/register" className="text-xs text-gray-50 hover:text-gray-100">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  return (
    <Button className="mt-4 w-full">
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

function RegisterButton() {
  const router = useRouter();
  function goToRegister(){
    router.push('/register');
  }

  return (
    <Button onClick={goToRegister} className="mt-4 w-full">
      Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

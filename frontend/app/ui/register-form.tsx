'use client'
import React, { useState } from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { PsychologistProfile } from '../lib/definitions';

export default function RegisterForm() {

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    description: "",
    specialty: "",
    experience: "",
    education: "",
    certifications: "",
    areas_of_expertise: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value;
    setShowAdditionalFields(selectedRole === "psychologist");
    setFormData({ ...formData, role: selectedRole });
  };

  const roleMapping: { [key: string]: number } = {
    'psychologist': 1,
    'client': 2
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const createPsychologistProfile = async (profile: { 
    psychologist_id: string; 
    description: string; 
    specialty: string; 
    experience: number; 
    education: string; 
    certifications: string[]; 
    areas_of_expertise: string[]; 
  }) => {
    try {
      const response = await fetch("http://localhost:3030/psychologistProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Psychologist profile created successfully", data);
        return { ok: true, data };
      } else {
        console.error("Error:", data);
        return { ok: false, error: data.error || "An error occurred during profile creation" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { ok: false, error: "An error occurred during profile creation" };
    }
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...formData,
      certifications: formData.certifications.split(',').map(cert => cert.trim()),
      areas_of_expertise: formData.areas_of_expertise.split(',').map(area => area.trim())
    };

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: roleMapping[formData.role],
    };

    try {
      const response = await fetch("http://localhost:3030/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
            
      if (response.ok) {
        console.log("Registration successful", data);

        if (formData.role === "psychologist") {

          const psychoProfile = {
            psychologist_id: data._id,
            description: formData.description,
            specialty: formData.specialty,
            experience: parseInt(formData.experience),
            education: formData.education,
            certifications: payload.certifications,
            areas_of_expertise: payload.areas_of_expertise,
          };

          await createPsychologistProfile(psychoProfile);
        }

      } else {
        setErrorMessage(data.message || "An error occurred during registration");
      }

    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred during registration");
    }
    // console.log(payload);
    router.push("/");
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-blue-400 px-6 pb-4 pt-3">
        <div className="w-full">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">
            Name
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>

          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
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

          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
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

          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="role">
              Role
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleRoleChange}
              >
                <option value="">Select your role</option>
                <option value="psychologist">Psychologist</option>
                <option value="client">Client</option>
              </select>
              <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {showAdditionalFields && (
            <>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="description">
                Description
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Enter your description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
                <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="specialty">
                Specialty
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="specialty"
                  type="text"
                  name="specialty"
                  placeholder="Enter your specialty"
                  required
                  value={formData.specialty}
                  onChange={handleChange}
                />
                <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="experience">
                Experience (in years)
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="experience"
                  type="number"
                  name="experience"
                  placeholder="Enter your experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                />
                <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="education">
                Education
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="education"
                  type="text"
                  name="education"
                  placeholder="Enter your education"
                  required
                  value={formData.education}
                  onChange={handleChange}
                />
                <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="certifications">
                Certifications
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="certifications"
                  type="text"
                  name="certifications"
                  placeholder="Enter your certifications (comma separated)"
                  required
                  value={formData.certifications}
                  onChange={handleChange}
                />
                <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="areasOfExpertise">
                Areas of Expertise
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="areasOfExpertise"
                  type="text"
                  name="areas_of_expertise"
                  placeholder="Enter your areas of expertise (comma separated)"
                  required
                  value={formData.areas_of_expertise}
                  onChange={handleChange}
                />
                <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </>
          )}
        </div>

        {errorMessage && (
          <div className="mt-4 flex items-center text-red-600">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}

        <RegisterButton />
        <div className="mt-4 text-center">
          <a href="/" className="text-xs text-gray-50 hover:text-gray-100">
            Already have an account? Log in
          </a>
        </div>
      </div>
    </form>
  );
}

function RegisterButton() {
  return (
    <Button className="mt-4 w-full">
      Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

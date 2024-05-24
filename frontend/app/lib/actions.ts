'use server'

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  id?: number; 
  role?: string;
}



export async function handleLogin(formData: LoginFormData): Promise<LoginResponse> {
  try {
    const response = await fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json(); 

    if (data.message === "Login successful") {
      return { message: 'Login successful', id: data.id, role: data.role }; 
    } else {
      return { message: data.message, id: 0, role: "" }; 
    }
  } catch (error) {
    return { message: (error as string), id: 0, role: "" };
  }
}

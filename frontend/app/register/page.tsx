import Image from 'next/image';
import logo from '@/public/logo.png';
import RegisterForm from '@/app/ui/register-form';

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4">
        <div className="h-20 w-full rounded-lg bg-gray-600 p-3 md:h-36 flex justify-center">
          <Image
            alt='MindMate logo'
            src={logo}
            style={{
              maxHeight: '100%',
              width: "auto",
            }}
          /> 
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}

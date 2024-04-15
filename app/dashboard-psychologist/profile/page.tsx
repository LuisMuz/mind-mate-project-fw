'use client'

import { PsychologistProfileView } from '@/app/lib/definitions';
import ProfilePage from '@/app/ui/dashboard/psychologist/profile';
import { useRouter } from 'next/navigation';

export default function Page(){
    const dummy_profile: PsychologistProfileView = {
        name: "Jarvis Stark",
        description: "I am a psychologist with over 10 years of experience. I specialize in cognitive behavioral therapy.",
        specialty: "Cognitive Behavioral Therapy",
        experience: 10,
        education: "PhD in Psychology",
        certifications: ["CBT Certification", "PhD in Psychology"],
        areas_of_expertise: ["Depression", "Anxiety", "Stress Management"]
    };

    const router = useRouter();

    const handleEditProfile = () => {
        router.push('/edit-profile');
    };

    return(
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
                    Profile
                </h1>
                <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleEditProfile}>Edit</button>
            </div>
            <ProfilePage profile={dummy_profile} />
        </div>
    )
}

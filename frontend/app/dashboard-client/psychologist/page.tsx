
import { PsychologistProfileView } from '@/app/lib/definitions';
import ProfilePage from '@/app/ui/dashboard/psychologist/profile';
import { useRouter } from 'next/router';

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


    return(
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
                    Psychologist's profile
                </h1>
            </div>
            <ProfilePage profile={dummy_profile} />
        </div>
    )
}

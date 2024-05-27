'use client'
import { useEffect, useState } from 'react';
import { PsychologistProfileView } from '@/app/lib/definitions';
import ProfilePage from '@/app/ui/dashboard/psychologist/profile';
import { useRouter } from 'next/router';
import { useAppContext } from '@/app/lib/UserContext';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';

export default function Page() {
    const { userId } = useAppContext();
    const [psychologistProfile, setPsychologistProfile] = useState<PsychologistProfileView | null>(null);
    const [showTokenInput, setShowTokenInput] = useState(false);
    const [token, setToken] = useState("");
    const [error, setError] = useState("");

    const checkSession = async () => {
        try {
            const response = await fetch(`http://localhost:3030/session/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setPsychologistProfile({
                    name: data.name,
                    psychologist_id: data.psychologist_id,
                    education: data.education,
                    experience: data.experience,
                    description: data.description,
                    specialty: data.specialty,
                    certifications: data.certifications,
                    areas_of_expertise: data.areas_of_expertise
                });
            } else {
                console.log("No active session")
                setShowTokenInput(true);
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
    };

    useEffect(() => {
        checkSession();
    }, [userId]);

    const handleEndSession = async () => {
        try {
            const response = await fetch(`http://localhost:3030/session/client/${userId}`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Failed to end session');
            }
            setPsychologistProfile(null);
            setShowTokenInput(true);
            checkSession()
        } catch (err) {
            setError('An error occurred while ending the session.');
        }
    };

    const handleTokenSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3030/sessionToken/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, token }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setShowTokenInput(false);
            } else {
                setError('Invalid token');
                //console.error('Invalid token');
            }
        } catch (error) {
            setError("Error validating token");
            console.error('Error validating token:', error);
        }
        checkSession();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
                    Psychologist's profile
                </h1>
                {psychologistProfile && (
                    <button
                        onClick={handleEndSession}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        End Session
                    </button>
                )}
            </div>
            {psychologistProfile ? (
                <ProfilePage profile={psychologistProfile} />
            ) : (
                <div>
                    {showTokenInput ? (
                        <div className=''>
                            <div>
                                <input className="w-full mb-4 px-2 py-1 border border-gray-300 rounded"
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    placeholder="Enter session token"
                                />
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleTokenSubmit}>Submit</button>
                            {error && (
                                <div className="flex text-red-600 p-3
                                ">
                                    <ExclamationCircleIcon className="w-5 mr-2" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            )}
        </div>
    )
}

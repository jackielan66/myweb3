import { ButtonDemo } from '@/components/ButtonDemo'
import ProjectCard from '@/components/ProjectCard'
import { ProfileForm } from '@/components/ProfileForm'

export default function Home() {
    return (
        <main className="p-10">
            <h1 className="mb-8 text-2xl font-bold">Edit Profile</h1>
            <ButtonDemo />

            <ProjectCard />

            <div className="mt-8">
                <ProfileForm />
            </div>
        </main>
    )
}

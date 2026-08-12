import type { Metadata } from 'next'
import { teamMembers } from '@/features/team/data/team-members'
import { TeamMemberCard } from '@/features/team/components/TeamMemberCard'

export const metadata: Metadata = {
  title: 'Team',
}

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-bold tracking-tight text-zinc-100">
        Meet the team
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
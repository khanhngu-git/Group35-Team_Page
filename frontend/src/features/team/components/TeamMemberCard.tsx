import { UserRound } from 'lucide-react'
import { roleBadgeStyles, type TeamMember } from '../data/team-members'

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-200">
        <UserRound className="h-8 w-8 text-violet-700" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-zinc-100">{member.name}</h3>
      <span
        className={`mt-1.5 rounded-full px-3 py-0.5 text-xs font-semibold ${roleBadgeStyles[member.role]}`}
      >
        {member.role}
      </span>
      {member.blurb && (
        <p className="mt-4 rounded-md bg-black px-3 py-2 text-xs leading-relaxed text-zinc-300">
          {member.blurb}
        </p>
      )}
    </div>
  )
}
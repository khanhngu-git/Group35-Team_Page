export interface TeamMember {
  id: string
  name: string
  role: 'PM' | 'BA' | 'UX' | 'Dev'
  blurb?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 'daniel-francisco',
    name: 'Daniel Francisco',
    role: 'PM',
    blurb: "Keeps Team A's sprint on track, aligning UX, BA, and Dev around clear, achievable weekly goals.",
  },
  {
    id: 'wen-bin-liang',
    name: 'Wen Bin Liang',
    role: 'BA',
    blurb: 'Turns messy, half-formed ideas into requirements the whole team can actually build from, and keep...',
  },
  {
    id: 'ryan-lim',
    name: 'Ryan Lim',
    role: 'UX',
    blurb:
      'Designs intuitive, user-centered experiences that make the product feel clear, warm, and easy to navigate from the first click.',
  },
  {
    id: 'khanh-nguyen',
    name: 'Khanh Nguyen',
    role: 'Dev',
    blurb:
      'Builds the core product logic and front-end interactions, turning design ideas into reliable, usable features the team can ship with confidence.',
  },
  {
    id: 'aindrila-das-prapti',
    name: 'Aindrila Das Prapti',
    role: 'Dev',
    blurb:
      'Tests edge cases, logs bugs, and checks the website flow to keep the product smooth, stable, and ready for real-world use.',
  },
]

export const roleBadgeStyles: Record<TeamMember['role'], string> = {
  PM: 'bg-fuchsia-600 text-white',
  BA: 'bg-emerald-600 text-white',
  UX: 'bg-orange-500 text-white',
  Dev: 'bg-sky-600 text-white',
}
import type { PillarProject } from '@/types'
import TeamMemberCard from '@/components/shared/TeamMemberCard'

interface Props {
  team: PillarProject['team']
}

export default function ProjectTeamSection({ team }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <TeamMemberCard member={team.leadEngineer} />
      <TeamMemberCard member={team.projectManager} />
    </div>
  )
}

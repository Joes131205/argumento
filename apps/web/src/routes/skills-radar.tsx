import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/skills-radar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/skills-radar"!</div>
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/campaign/$level/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/campaign/$level/$id"!</div>
}

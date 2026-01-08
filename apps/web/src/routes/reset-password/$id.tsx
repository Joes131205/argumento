import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reset-password/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reset-password/$id"!</div>
}

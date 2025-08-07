import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/landing5')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/landing5"!</div>
}

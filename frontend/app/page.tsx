import { Suspense } from 'react'

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  
  return (
    <main>
      <h1>My Pet Haven</h1>
      {/* The rest of your UI will render here */}
    </main>
  )
}

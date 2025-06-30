'use client';

import { gql, useQuery } from '@apollo/client'

const GET_BOARDS = gql`
  query {
    boards {
      id
      title
    }
  }
`

export default function TestPage() {
  const { data, loading, error } = useQuery(GET_BOARDS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Boards:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
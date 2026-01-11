'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })

  if (isLoading) return <p>Loading, please wait...</p>
  if (error || !data) return <p>Something went wrong.</p>

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.createdAt}</p>
    </div>
  )
}

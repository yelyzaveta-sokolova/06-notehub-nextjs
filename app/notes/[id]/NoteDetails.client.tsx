'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import { Note } from '@/types/note'

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
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
'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import type { Note } from '@/types/note'

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>()
  const id = params.id

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !data) {
    return <p>Failed to load note</p>
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>
        <strong>Tag:</strong> {data.tag}
      </p>

      <p>{data.content}</p>

      <p>
        <small>Created at: {new Date(data.createdAt).toLocaleString()}</small>
      </p>
    </div>
  )
}

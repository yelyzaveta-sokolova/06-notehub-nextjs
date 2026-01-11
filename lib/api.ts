import axios from 'axios'
import { Note } from '@/types/note'

const api = axios.create({
  baseURL: 'https://notehub-api.goit.global',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
})

export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>('/notes', {
    params: { page, search },
  })
  return data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}

export const createNote = async (
  note: Pick<Note, 'title' | 'content' | 'tag'>
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note)
  return data
}

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`)
}

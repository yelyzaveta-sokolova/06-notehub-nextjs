'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchNotes } from '@/lib/api'
import { Note } from '@/types/note'
import styles from './NotesPage.module.css'

import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import SearchBox from '../SearchBox/SearchBox'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'

interface NotesResponse {
  notes: Note[]
  totalPages: number
}

export default function NotesPage() {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: (previousData) => previousData,
  })

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  if (isLoading) {
    return <p>Loading, please wait...</p>
  }

  if (error || !data) {
    return <p>Something went wrong.</p>
  }

  return (
    <>
      <SearchBox value={search} onChange={handleSearchChange} />

            <div className={styles.container}>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => setIsOpen(true)}
        >
          Add note
        </button>
      </div>
      <NoteList notes={data.notes} />

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NoteForm close={() => setIsOpen(false)} />
      </Modal>
    </>
  )
}

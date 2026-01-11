"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
  queryKey: ["notes", page, search],
  queryFn: () => fetchNotes(page, search),
  placeholderData: (previousData) => previousData,
});


  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create note</button>

      <SearchBox value={search} onChange={setSearch} />

      {data && <NoteList notes={data.notes} />}

      {data && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NoteForm close={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  close: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  tag: Yup.string().required("Required"),
});

export default function NoteForm({ close }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      close();
    },
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "todo" }}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" />

        <Field name="content" placeholder="Content" />
        <ErrorMessage name="content" />

        <Field as="select" name="tag">
          <option value="todo">Todo</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </Field>

        <button type="submit">Create note</button>
        <button type="button" onClick={close}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}

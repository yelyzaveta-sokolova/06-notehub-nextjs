'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/api'
import type { Note } from '@/types/note'
import styles from './NoteForm.module.css'

type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'

interface FormValues {
  title: string
  content?: string
  tag: Tag
}

interface NoteFormProps {
  close: () => void
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),

  content: Yup.string()
    .max(500, 'Content must be at most 500 characters')
    .notRequired(),

  tag: Yup.mixed<Tag>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
})

export default function NoteForm({ close }: NoteFormProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (values: FormValues): Promise<Note> =>
      createNote({
        title: values.title,
        content: values.content ?? '',
        tag: values.tag,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      close()
    },
  })

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" className={styles.input} />
          <ErrorMessage name="title" component="div" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            as="textarea"
            className={styles.textarea}
          />
          <ErrorMessage
            name="content"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field
            id="tag"
            name="tag"
            as="select"
            className={styles.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={styles.error} />
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={mutation.isPending}
          >
            Create note
          </button>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  )
}

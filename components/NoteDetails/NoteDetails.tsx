import styles from './NoteDetails.module.css'

type Props = {
  title: string
  content: string
  tag: string
  createdAt: string
}

export default function NoteDetails({
  title,
  content,
  tag,
  createdAt,
}: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <article className={styles.item}>
          <header className={styles.header}>
            <h2>{title}</h2>
            <span className={styles.tag}>{tag}</span>
          </header>

          <p className={styles.content}>{content}</p>

          <div className={styles.date}>
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </article>
      </div>
    </main>
  )
}

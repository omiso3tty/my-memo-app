import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import MemoItem from './MemoItem'

export interface Memo {
  id: string
  text: string
  createdAt: Date
}

const MemoList = () => {
  const [memos, setMemos] = useState<Memo[]>([])

  useEffect(() => {
    const q = query(collection(db, 'memos'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const memosData: Memo[] = []
      snapshot.forEach((doc) => {
        memosData.push({
          id: doc.id,
          ...doc.data(),
        } as Memo)
      })
      setMemos(memosData)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      {memos.map((memo) => (
        <MemoItem key={memo.id} memo={memo} />
      ))}
    </div>
  )
}

export default MemoList

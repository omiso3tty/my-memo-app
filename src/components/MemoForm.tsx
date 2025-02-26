import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const MemoForm = () => {
  const [text, setText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() === '') return
    try {
      await addDoc(collection(db, 'memos'), {
        text,
        createdAt: new Date(),
      })
      setText('')
    } catch (error) {
      console.error('メモの追加エラー: ', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 flex-grow mr-2"
        placeholder="新しいメモを入力"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        追加
      </button>
    </form>
  )
}

export default MemoForm

import { useState } from 'react'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Memo } from './MemoList'

type MemoItemProps = {
  memo: Memo
}

const MemoItem = ({ memo }: MemoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(memo.text)

  const handleUpdate = async () => {
    try {
      const memoRef = doc(db, 'memos', memo.id)
      await updateDoc(memoRef, { text })
      setIsEditing(false)
    } catch (error) {
      console.error('メモ更新エラー: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      const memoRef = doc(db, 'memos', memo.id)
      await deleteDoc(memoRef)
    } catch (error) {
      console.error('メモ削除エラー: ', error)
    }
  }

  return (
    <div className="border p-2 mb-2 flex justify-between items-center">
      {isEditing ? (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-1 flex-grow mr-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white p-1 mr-1"
          >
            保存
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white p-1"
          >
            キャンセル
          </button>
        </>
      ) : (
        <>
          <span>{memo.text}</span>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white p-1 mr-1"
            >
              編集
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-1"
            >
              削除
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MemoItem

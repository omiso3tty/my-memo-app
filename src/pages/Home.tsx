import MemoForm from '../components/MemoForm'
import MemoList from '../components/MemoList'

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">メモ帳アプリ</h1>
      <MemoForm />
      <MemoList />
    </div>
  )
}

export default Home

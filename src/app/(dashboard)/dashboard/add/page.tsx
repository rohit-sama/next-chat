import AddFriendButton from '@/components/AddFriendButton'
import { FC } from 'react'

const page: FC = ({}) => {

  return <main className='pt-8'>
    <h1 className='font-bold text-5xl mt-20 ml-5 mb-8'> Add a friend</h1>
    <AddFriendButton />
  </main>
}

export default page
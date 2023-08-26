import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface  LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return <div className='w-full flex flex-col gap-3'>
    <Skeleton  className='mt-4 mb-4' baseColor='#7A96EA' height={60} width={500} />
    <Skeleton baseColor='#7A96EA' height={50} width={350} />
    <Skeleton baseColor='#7A96EA' height={50} width={350} />
    <Skeleton baseColor='#7A96EA' height={50} width={350} />
  </div>
}

export default Loading
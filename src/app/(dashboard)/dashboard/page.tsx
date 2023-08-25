import { FC } from 'react'

interface pageProps {
}

const page: FC<pageProps> = ({}) => {
  

  return <div  className='flex flex-col  justify-center text-xl items-center m-auto '>
    <img className='rounded-xl' src="https://imgs.search.brave.com/XFaICX5ufTcIS3vRZrFsf6R_CviORuzjagzSjqQ-ZPE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMzLmFscGhhY29k/ZXJzLmNvbS8yMzIv/MjMyNjQ5LmpwZw" alt="" />
    <h1 className='m-2'>Start Chating !!</h1></div>
}

export default page;
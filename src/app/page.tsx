

export default async function Home() {
  return (
    <div className=" flex md:flex-col mt-10 flex-col-reverse text-center  bg-[url(/heroimg1.png)]  bg-no-repeat bg-contain text-white items-end md:ml-0  justify-center h-screen gap-5" >
      <div className="flex justify-center items-center flex-col">
    <h1
      className={` lg:text-8xl font-bold pr-5 text-4xl`}
    >
     <span className="blue_gradient">CONNECT </span>  WITH YOUR <br/>
COMMUNITY IN <br/> <span className="orange_gradient">A FUN WAY</span> 
    </h1>
    <p className="lg:text-2xl text-xl">where every conversation is a story waiting to unfold</p>
    <button className="blue_btn mt-3">Get Started</button>
    </div>
  </div>
  )
}

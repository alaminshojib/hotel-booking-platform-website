import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section >
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto bg-[url("")] bg-bottom '>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center p-2 pb-4 bg-transparent rounded-2xl'>
          
          <h1 className=' text-2xl font-semibold text-black  md:text-3xl drop-shadow-lg'>
            Something Went Wrong !!
          </h1>

          <p className=' font-medium'>
            <div><img src="/assets/404.gif" alt="" /></div>
          </p>

          <p className='mt-3 text-black text-md font-bold '>Here are some helpful links:</p>

          <div className='flex items-center w-full mt-3 gap-x-3 shrink-0 sm:w-auto'>
            <button
              onClick={() => navigate(-1 || '/')}
              className='flex items-center justify-center w-1/2 p-3 text-sm font-bold transition-colors duration-200 bg-green-500 border rounded-lg gap-x-2 sm:w-auto mt-2   hover:bg-blue-600 text-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180 text-primary'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              <span>Go back</span>
            </button>

            <button className='flex items-center justify-center w-1/2 p-3 text-sm font-bold transition-colors duration-200 bg-blue-800 border rounded-lg gap-x-2 sm:w-auto mt-2   hover:bg-blue-600 text-white' onClick={() => navigate('/')}>Take Me Home</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
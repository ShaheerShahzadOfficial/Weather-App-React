import { useRef, useState } from 'react'
import './App.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

function App() {

  const [CityWeathers, setCityWeathers] = useState<any[]>([])
  const cityInputRef = useRef(null)

  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" }).slice(0, 3);
  const dateString = `${date.getDate()} ${month} ${date.getFullYear()}`;

  // get time
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const getCity = async (e: any) => {
    e.preventDefault()

    if (cityInputRef?.current?.value) {



      const API_KEY = "f44b009cd92b217e7a02622a68be7820"
      const baseUrl = "https://api.openweathermap.org"
      const url = `${baseUrl}/data/2.5/weather?q=${cityInputRef?.current?.value}&APPID=${API_KEY}&units=metric`
      await axios.get(url).then((result) => {
        console.log(result.data, "result.data")

        const newArray = []

        newArray.unshift(result.data)

        CityWeathers.forEach((item) => {
          newArray.push(item)
        })

        setCityWeathers(newArray)

        console.log(newArray)

        cityInputRef.current.value = ""

      }).catch((error) => {
        console.log(error?.response?.data?.message || error)
        toast.error(error?.response?.data?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
    } else {
      toast.error("Enter City Name", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="grid min-h-screen App grid-rows-[auto,1fr,auto]">
      <nav className="p-4 mb-2 w-full backdrop-blur flex h-16 items-center justify-between text-white bg-[#357b688c]">
        <h1 className="text-2xl">Weather App</h1>

        <div>
          <div>{dateString}</div>
          <div>{time}</div>
        </div>
      </nav>



      {/* Form Input */}
      <div>
        <form
          className="mx-auto mt-6 h-fit flex justify-center"
          onSubmit={getCity}>

          <input type="text" ref={cityInputRef}
            className="placeholder:italic placeholder:text-white italic p-3 ml:w-96 w-64 rounded-lg bg-[#357b688c] text-white px-4 text-lg outline-none"
            placeholder='Enter City Name' minLength={0} maxLength={30} />


        </form>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-6"
        >
          {
            CityWeathers?.map((item: any, i: number) => (
              <div className='border text-white bg-[#357b688c] textShadow border-gray-500/40 shadow-2xl drop-shadow-sm backdrop-blur-sm hover:backdrop-blur-0 transition-all duration- rounded-xl' key={i}>

                <div className='flex items-center justify-center'>
                  <img src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`} alt="" />
                  <p className='text-4xl sm:text-3xl'>{item?.main?.temp}°C</p>
                </div>

                <p className='text-4xl text-center' >{item?.name}</p>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 m-10 text-xl'>
                  <div>
                    <p>Weather  <span className='font-bold'> {item?.weather[0]?.main} </span></p>
                    <p>feels like <span className='font-bold'>{item?.main?.feels_like}°C </span></p>
                    <p>humidity <span className='font-bold'>{item?.main?.humidity} g/kg</span></p>
                    <p>pressure <span className='font-bold'>{item?.main?.pressure} Pa </span></p>
                  </div>


                  <div>
                    <p>temp max <span className='font-bold'>{item?.main?.temp_max}°C</span></p>
                    <p>temp min <span className='font-bold'>{item?.main?.temp_min}°C</span></p>
                    <p>wind speed <span className='font-bold'>{item?.wind?.speed} km/h</span></p>
                    <p>wind deg <span className='font-bold'>{item?.wind?.deg}°</span></p>
                  </div>
                </div>

              </div>
            ))
          }

        </div>

      </div>


      <footer className='bg-[#357b688c] 
backdrop-blur text-white py-1 text-center'>
        © Developed by Shaheer Shahzad
      </footer>

    </div >
  )
}

export default App

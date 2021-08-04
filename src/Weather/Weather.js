import React,{useEffect,useState} from 'react';
import './Weather.css';
import axios from 'axios'
import {useForm} from 'react-hook-form'

const Weather=()=>{
    const [city,setCity]=useState('erevan')
    const [weather_data,setWeatherdata]=useState([])
    const [weather_data_days,setWeatherdatadays]=useState([])
    const [rotateDeg,setRotateDeg]=useState(false)
    const {register,handleSubmit}=useForm()

    const changeCity=data=>{
        setCity(data.cityName)
    }

    useEffect(()=>{
        axios.get(`https://goweather.herokuapp.com/weather/${city}`)
        .then(res=>{
            setWeatherdata([res.data]);
            setWeatherdatadays(res.data.forecast)
        })
    },[weather_data.length!==0,city])
    return(
        <div className="weather">
            {weather_data.map((v,i)=><div style={{backgroundImage:v.description==="Rain"?`url('https://i.pinimg.com/originals/41/90/be/4190be46508500f52ec133f793ac3b5d.gif')`:`url('https://thumbs.gfycat.com/IckyAmbitiousBasenji-max-1mb.gif')`}} key={i} className="weather_content">
                <div className="weather_today">
                <span>
                <form onSubmit={handleSubmit(changeCity)}>
                    <div className="weather_form_city">
                    <h2>{city}</h2>
                <p onClick={()=>{
                    setRotateDeg(!rotateDeg)
                }} style={{cursor:"pointer",transform:`rotate(${rotateDeg?"270deg":"90deg"})`,transition:"0.25s",color:"white"}}>&#10142;</p>
                    </div>
                    <div className="change_options" style={{display:rotateDeg?"flex":"none"}}>
                    <input {...register("cityName")} />                
                    <button className="btn">Change</button>
                    </div>
                    <div className="current_weather">
                    <p>{v.description}</p>
                    <b style={{color:"hsla(210, 100%, 75%, 1.0)"}}>{v.temperature}</b>            
                    <p>Wind speed:{v.wind}</p>
                    </div>
                </form>
                </span>   
                <div className="weather_all_days">
                {
                    weather_data_days.map((k,i)=><span className="weather_days" key={i}>
                        <p>Day {k.day}</p>
                        <p>{k.temperature}</p>
                        <p>Wind speed:{k.wind}</p>
                    </span>
                    )
                }    
                </div>
                </div> 
            </div>
        )}
        </div>
    )
}

export default Weather
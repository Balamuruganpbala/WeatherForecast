let input=document.getElementById("inputvalue")
let searched=document.getElementById("search")
let locote=document.getElementById("location")
const API_key='2cada9ca74d775498c3a285526d16cc2';





const createContent=(weatheritem,index)=>{
  let cityName=input.value
  if(index===0){
    return`
    <div >
    <h2>${cityName}(${weatheritem.dt_txt.split(" ")[0]})</h2>
     <h4>Temperature:${weatheritem.main.temp}k</h4>
    <h4>wind:${weatheritem.wind.speed}m/s</h4>
    <h4>humidity:${weatheritem.main.humidity}%</h4>
    </div>
    <div>
    <img src="https://openweathermap.org/img/wn/${weatheritem.weather[0].icon}@2x.png" >
    </div>
    </div>`
  }else{
  return`<div class="col-md-3 me-5 mb-5 col-sm-4 bg-info">
<h2>${cityName}(${weatheritem.dt_txt.split(" ")[0]})</h2>
<img src="https://openweathermap.org/img/wn/${weatheritem.weather[0].icon}@2x.png" >
<h4>Temperature:${weatheritem.main.temp}k</h4>
<h4>wind:${weatheritem.wind.speed}m/s</h4>
<h4>humidity:${weatheritem.main.humidity}%</h4></div>`}



}

const  getdetails=(name,lat,lon)=>{
      
       /*fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`)
       .then((res)=>(res.json())).then((data)=>{
        const arr=[]
         const seven= data.list.filter((forecast)=>{
            const newDay=new Date(forecast.dt_txt).getDate();
            if(!arr.includes(newDay))
                 return arr.push(newDay);
        })
        console.log(seven)
       }
      ).catch(()=>{
        alert("error occur while adding in array")
      })*/
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`)
      .then((res)=>(res.json())).then((data)=>{
        const sevendays=data.list
        const sevendaysSet=new Set();
        let y=2;
        const sevenArray=[];const sevenArray2=[]
        sevendays.forEach((forecast)=>{
            const newDay=new Date(forecast.dt_txt).getDate();
           
            if(!sevendaysSet.has(newDay)){
             sevendaysSet.add(newDay)
           sevenArray.push(forecast)
           }
           else if(y>0){
             let dt=new Date(forecast.dt_txt)
             
             dt.setDate(newDay+8-y)
             
             sevenArray2.push(forecast)
            
             sevenArray2[sevenArray2.length-1].dt_txt=dt.toISOString().substring(0,10)
             y-=1

           }
        }
            
        );
        sevenArray2.forEach((f)=>(sevenArray.push(f)))
            
            let displayed=document.getElementById("second")
              let display2=document.getElementById("forecast")
              
           display2.innerHTML=" "
           input.innerHTML=" "
           displayed.innerHTML=" "
            sevenArray.forEach((weatheritem,index)=>{
              let cityName=input.value
                     if(index===0){
                      displayed.insertAdjacentHTML("beforeend",createContent(weatheritem,cityName,index))
                     }
               
                    else{
                    display2.insertAdjacentHTML("beforeend",createContent(weatheritem,cityName,index))}
                    }              
            )

        });

            
        }
        

 

let getvalued=()=>{
     const cityName=input.value;
     if(!cityName)
      return; 

   fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_key}`)
   .then((res)=>res.json())
   .then((data)=>{
     if(!data.length)
     return alert("an error occur while name found");

         const{name,lat,lon}=data[0]
         getdetails(name,lat,lon);}
   ).catch(()=>{
    alert("error occur while fetching")
   })


}
const getCoordinate=()=>{
  navigator.geolocation.getCurrentPosition(
    (position)=>{
    
     const{latitude,longitude}=position.coords
     fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&limit=1&lon=${longitude}&appid=${API_key}`).
     then((res)=>res.json()).
     then((data)=>{
      const {name,lat,lon}=data[0];
      getdetails(name,lat,lon);

     }
     
     ).catch(()=>alert("location not detected"))
   
    },
    (error)=>{  
      if(error.code==error.PERMISSION_DENIED)
      alert("permision denied")
  

    }
  )

}
  




searched.addEventListener("click",getvalued);
locote.addEventListener("click",getCoordinate);

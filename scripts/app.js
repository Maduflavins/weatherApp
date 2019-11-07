const cityForm = document.querySelector('form')
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const forecast = new Forecast()

const updateUI = (data) =>{
    // cityDet = data.cityDet
    // weather = data.weather

    const {cityDet, weather} = data;


    //update details template

    details.innerHTML = `
                    <h5 class="my-3">${cityDet.EnglishName}</h5>
                    <div class="my-3">${weather.WeatherText}</div>
                    <div class="display-4 my-4">
                        <span>${weather.Temperature.Metric.Value}</span>
                        <span>&deg;C</span>
                    </div>
                    `;
    // update image of day/night

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    let imgSrc = weather.IsDayTime ? 'img/day.svg': 'img/night.svg';
    // let imgSrc = null;
    // if(weather.IsDayTime){
    //    imgSrc = 'img/day.svg' 
    // }else{
    //     imgSrc = 'img/night.svg'
    // }

    time.setAttribute('src', imgSrc)


    //remove hide class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}


cityForm.addEventListener('submit', e=>{
    //prevennt default
    e.preventDefault()
    //get city info
    const city = cityForm.city.value.trim()
    cityForm.reset();

    //update ui

    forecast.updateCity(city)
        .then(data=>{
            updateUI(data)
        }).catch(err=>{
            console.log(err)
        })
    

    // set local storage
    localStorage.setItem('city', city)

    
})

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data=>{
            updateUI(data)
        })
        .catch(err=>{
            console.log(err)
        })
}
console.log('Hello from console!');

const form = document.querySelector('form');
const presult = document.querySelector('#result');
const perror = document.querySelector('#error');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const address = document.querySelector('#address').value;
    perror.textContent=''
    presult.textContent='loading...'
    fetch(`http://localhost:3000/weather?address=${address}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            presult.innerHTML=''
            perror.style.color='red';
            perror.innerHTML=data.error;
            console.log(data.error);
        }else{
            console.log(data);
            perror.style.color='black'
            presult.textContent='Location: '+data.location
            perror.textContent='Weather forecast: '+data.forecast
        }
    })
   })
})

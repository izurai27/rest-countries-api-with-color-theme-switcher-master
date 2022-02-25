const searchInput = document.getElementById("searchInput");
const filter = document.getElementById("filter");
const url = 'https://restcountries.com/v3.1/';
const country = {};
const countries = document.querySelector('#countries');

const borderList = document.getElementById('borderList');
const countryDetail = document.getElementById('country-detail');
const secondScreen = document.querySelector('.second-screen');
const firstScreen = document.querySelector('.first-screen');
const back = document.querySelector('.back');
const searchbtn = document.querySelector('.searchbtn');

// displayAll('name/malaysia');

//script to listen user click
document.addEventListener('click', function(e){
  
  if (e.target.classList.contains('click')){
    firstScreen.style.display = 'none'
    secondScreen.style.display = 'block';
    console.log(e.target.dataset.name)
    displayDetailCountry(e.target.dataset.name);
  }

  if(e.target.classList.contains('back')){
    secondScreen.style.display = 'none';
    firstScreen.style.display = 'block'
  }

  if(e.target.classList.contains('filter')){
    console.log(typeof(e.target.value));
    const valueRegion = e.target.value;
    if(valueRegion !== ''){
      displayAll('region/'+valueRegion);
    }
    
  }


})


searchInput.addEventListener('keyup',inputResult)
function inputResult(e){
  // e.preventDefault();
  const valueInput = searchInput.value;

  // if (e.keyCode === 13 || e.which === 13) {
  //   e.preventDefault();
  //   return false;
  // }

  displayAll('name/'+valueInput);


}


//script to run all countries
    async function displayAll (kode) {
      try{
          const dataAll =  await fetchData (kode);
          console.log(dataAll);
          displayCountries(dataAll)
      } catch (error) {
          console.log(error)
      }
      
    }


//function to display country detail
    async function displayDetailCountry (cca) {
      const dataDetail =  await fetchData ('alpha/'+ cca);
      console.log(dataDetail);
      displayDetail(dataDetail)
    }


//function to get data based on argument all country
    function fetchData (par){
      console.log(url+par);
      return fetch(url+par,{credentials: 'omit'})
              .then (response => response.json() )
              .then (response => response)
              .catch(error => console.log(error))
    }

//function to display country (general info)
    function displayCountries(arr) {
      countries.innerHTML = '';
      let content ='';
      arr.map( elemen => content +=  `<div data-name='${elemen.cca3}' class="card click">
                                        <div data-name='${elemen.cca3}' class="img-container click">
                                          <img  class="click" data-name='${elemen.cca3}' src='${elemen.flags.svg}'/>
                                        </div>
                                        <div data-name='${elemen.cca3}' class="countryInfo click">
                                          <div data-name='${elemen.cca3}' class="name click">${elemen.name.common}</div>
                                          <div data-name='${elemen.cca3}' class="population click"><strong>Population: </strong>${elemen.population.toLocaleString('en-US')}</div>
                                          <div data-name='${elemen.cca3}' class="region click"><strong>Region: </strong>${elemen.region}</div>
                                          <div data-name='${elemen.cca3}' class="capital click"><strong>Capital: </strong>${elemen.capital}</div>
                                        </div>
                                      </div>`
      );
      countries.innerHTML = content;
    }
   
//function to display country detail
    function displayDetail(arr){
      // console.log('arr:'+arr)
      let content ='';
      const currency = Object.keys(arr[0].currencies)[0];
      
      //to get languages
      const len = Object.keys(arr[0].languages).length;
      const lang = [];
      for (let i=0; i<len; i++){
            const prop = Object.keys(arr[0].languages)[i];
            lang.push(arr[0].languages[prop])
          }
      
      
          
      arr.map ( elemen => content +=  `<div class="cardDetail">
                                        <div class="img-containerDetail">
                                          <img src='${elemen.flags.svg}'/>
                                        </div>
                                        <div class="countryDetail">
                                          <div data-name='${elemen.cca3}' class="nameDetail">${elemen.name.common}</div>
                                          <div class="details"><strong>Official Name: </strong>${elemen.name.official}</div>
                                          <div class="details"><strong>Population: </strong>${elemen.population.toLocaleString('en-US')}</div>
                                          <div class="details"><strong>Region: </strong>${elemen.region}</div>
                                          <div class="details"><strong>Sub Region: </strong>${elemen.subregion}</div>
                                          <div class="capitalDetail"><strong>Capital: </strong>${elemen.capital}</div>
                                          <div class="details"><strong>Top Level Domain: </strong>${elemen.tld[0]}</div>
                                          <div class="details"><strong>Currencies: </strong>${elemen.currencies[currency].name}</div>
                                          <div class="details"><strong>Languages: </strong>${lang.join(', ')}</div>
                                        </div>
                                      </div>`
      );
      countryDetail.innerHTML = content;

      //to get borders
      const border = arr[0].borders;
      console.log(border)
      if(border===undefined){
        document.querySelector('.border-label').style.display='none';
        borderList.innerHTML = '';
        return;
      }
      createBorder(border);
    }


//function to display border
    function createBorder (border) {
      borderList.innerHTML = '';

      border.map(element => {
        fetch (url+'alpha/'+element)
          .then(response => response.json())
          .then(res => {
            // console.log('output awal'+ output)
            document.querySelector('.border-label').style.display='block';
            borderList.innerHTML = borderList.innerHTML +  `<div class="border-item click" data-name="${res[0].cca3}">${res[0].name.common}</div>`;
            
          })
      })
            
    }


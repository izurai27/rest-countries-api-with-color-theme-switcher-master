const searchInput = document.getElementById("searchInput");
const filter = document.getElementById("filter");
const url = 'https://restcountries.com/v2/';
const country = {};
const countries = document.querySelector('#countries');

const borderList = document.getElementById('borderList');
const countryDetail = document.getElementById('country-detail');
const secondScreen = document.querySelector('.second-screen');
const firstScreen = document.querySelector('.first-screen');
const back = document.querySelector('.back');
const searchbtn = document.querySelector('.searchbtn');
const defaultCountry = ["germany","united states of america","brazil","iceland","afghanistan","Åland islands","albania","algeria"]

// displayAll('name/germany');
// displayAll('name/united states of america');
// displayAll('name/brazil');
// displayAll('name/iceland');
// displayAll('name/afghanistan');
// displayAll('name/Åland islands');
// displayAll('name/albania');
// displayAll('name/algeria');

async function getDefault (array) {
  countries.innerHTML = '';
  const len = array.length
  for (let i=0; i<len; i++){
    // console.log(countries.innerHTML);
    // console.log(array[i])
    await fetch (url+'name/'+array[i])
      .then(response => response.json())
      .then(res => {
        
        // document.querySelector('.border-label').style.display='block';
        countries.innerHTML = countries.innerHTML +  `<div data-name='${res[0].alpha3Code}' class="card click">
                                                        <div data-name='${res[0].alpha3Code}' class="img-container click">
                                                          <img  class="click" data-name='${res[0].alpha3Code}' src='${res[0].flags.svg}'/>
                                                        </div>
                                                        <div data-name='${res[0].alpha3Code}' class="countryInfo click">
                                                          <div data-name='${res[0].alpha3Code}' class="name click">${res[0].name}</div>
                                                          <div data-name='${res[0].alpha3Code}' class="population click"><strong>Population: </strong>${res[0].population.toLocaleString('en-US')}</div>
                                                          <div data-name='${res[0].alpha3Code}' class="region click"><strong>Region: </strong>${res[0].region}</div>
                                                          <div data-name='${res[0].alpha3Code}' class="capital click"><strong>Capital: </strong>${res[0].capital}</div>
                                                        </div>
                                                      </div>`
        // console.log(countries.innerHTML)
      })

  }
  
    
}
// function getDefault (array) {
//   countries.innerHTML = '';

//   array.map(element => {
//     fetch (url+'name/'+element)
//       .then(response => response.json())
//       .then(res => {
//         console.log(res)
//         // document.querySelector('.border-label').style.display='block';
//         countries.innerHTML = countries.innerHTML +  `<div data-name='${res[0].alpha3Code}' class="card click">
//                                                         <div data-name='${res[0].alpha3Code}' class="img-container click">
//                                                           <img  class="click" data-name='${res[0].alpha3Code}' src='${res[0].flags.svg}'/>
//                                                         </div>
//                                                         <div data-name='${res[0].alpha3Code}' class="countryInfo click">
//                                                           <div data-name='${res[0].alpha3Code}' class="name click">${res[0].name.common}</div>
//                                                           <div data-name='${res[0].alpha3Code}' class="population click"><strong>Population: </strong>${res[0].population.toLocaleString('en-US')}</div>
//                                                           <div data-name='${res[0].alpha3Code}' class="region click"><strong>Region: </strong>${res[0].region}</div>
//                                                           <div data-name='${res[0].alpha3Code}' class="capital click"><strong>Capital: </strong>${res[0].capital}</div>
//                                                         </div>
//                                                       </div>`
        
//       })
//   })
        
// }

getDefault(defaultCountry)

//script to listen user click
document.addEventListener('click', function(e){
  
  if (e.target.classList.contains('click')){
    firstScreen.style.display = 'none'
    secondScreen.style.display = 'block';
    console.log(e.target.dataset.name);
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
  function inputResult(){
    const valueInput = searchInput.value;
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


// displayDetailCountry('USA')


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
      arr.map( elemen => content +=  `<div data-name='${elemen.alpha3Code}' class="card click">
                                        <div data-name='${elemen.alpha3Code}' class="img-container click">
                                          <img  class="click" data-name='${elemen.alpha3Code}' src='${elemen.flags.svg}'/>
                                        </div>
                                        <div data-name='${elemen.alpha3Code}' class="countryInfo click">
                                          <div data-name='${elemen.alpha3Code}' class="name click">${elemen.name.common}</div>
                                          <div data-name='${elemen.alpha3Code}' class="population click"><strong>Population: </strong>${elemen.population.toLocaleString('en-US')}</div>
                                          <div data-name='${elemen.alpha3Code}' class="region click"><strong>Region: </strong>${elemen.region}</div>
                                          <div data-name='${elemen.alpha3Code}' class="capital click"><strong>Capital: </strong>${elemen.capital}</div>
                                        </div>
                                      </div>`
      );
      countries.innerHTML = content;
    }
   
//function to display country detail
    function displayDetail(arr){
      console.log('arr:'+arr)
      // let content ='';
      // const currency = arr[0].currencies[0].name;
      
      //to get languages
      // const len = Object.keys(arr[0].languages).length;
      // const lang = [];
      // for (let i=0; i<len; i++){
      //   const prop = Object.keys(arr[0].languages)[i];
      //       lang.push(arr[0].languages[prop])
      //     }
          
      //to get borders
      const border = arr.borders;
      console.log(border);

      if(border===undefined){
        document.querySelector('.border-label').style.display='none';
        borderList.innerHTML = '';
        // return;
      } else {createBorder(border);}
      
      document.querySelector('.imgDetail').src=arr.flags.svg;
      document.querySelector('.nameDetail').innerHTML = arr.name;
      document.querySelector('#official').innerHTML = `Native Name: ${arr.nativeName}`;
      document.querySelector('#population').innerHTML = `Population: ${arr.population.toLocaleString('en-US')}`;
      document.querySelector('#region').innerHTML = `Region: ${arr.region}`;
      document.querySelector('#subRegion').innerHTML = `Sub Region: ${arr.subregion}`;
      document.querySelector('#capital').innerHTML = `Capital: ${arr.capital}`;
      document.querySelector('#tld').innerHTML = `Top Level Domain: ${arr.topLevelDomain[0]}`;
      document.querySelector('#currency').innerHTML = `Currencies: ${arr.currencies[0].name}`;
      document.querySelector('#language').innerHTML = `Languages: ${arr.languages[0].name}`


      // arr.map ( elemen => content +=  `<div class="cardDetail">
      //                                   <div class="img-containerDetail">
      //                                     <img src='${elemen.flags.svg}'/>
      //                                   </div>
      //                                   <div class="countryDetail">
      //                                     <div data-name='${elemen.alpha3Code}' class="nameDetail">${elemen.name.common}</div>
      //                                     <div class="landscape">
      //                                       <div>
      //                                         <div class="details"><strong>Official Name: </strong>${elemen.name.official}</div>
      //                                         <div class="details"><strong>Population: </strong>${elemen.population.toLocaleString('en-US')}</div>
      //                                         <div class="details"><strong>Region: </strong>${elemen.region}</div>
      //                                         <div class="details"><strong>Sub Region: </strong>${elemen.subregion}</div>
      //                                         <div class="capitalDetail"><strong>Capital: </strong>${elemen.capital}</div>
      //                                       </div>
      //                                       <div>
      //                                         <div class="details"><strong>Top Level Domain: </strong>${elemen.tld[0]}</div>
      //                                         <div class="details"><strong>Currencies: </strong>${elemen.currencies[currency].name}</div>
      //                                         <div class="details"><strong>Languages: </strong>${lang.join(', ')}</div>
      //                                       </div>
      //                                     </div>
      //                                     <div class="borderGroup">
      //                                       <div class="border-label">Border Countries:</div>
      //                                       <div id="borderList"></div>
      //                                     </div>
      //                                   </div>
      //                                 </div>`
      // );
      // countryDetail.innerHTML = content;

    }

//function to display border
    function createBorder (border) {
      borderList.innerHTML = '';
      
      border.map(element => {
        fetch (url+'alpha/'+element)
          .then(response => response.json())
          .then(res => {
            document.querySelector('.border-label').style.display='block';
            borderList.innerHTML  += `<div class="border-item" data-name=${res.alpha3Code}>${res.name}</div>`
           
          }) 
                 
      })
    
    }
          
    


if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
      postNews();
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}


async function postNews() {
    let param = document.getElementById("postParam").value
    let url = `https://restcountries.com/v3.1/name/${param}`;
    if(param === ""){
        url="https://restcountries.com/v3.1/region/america"
    }
    const main = document.querySelector('main');
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  console.log(url)
  main.innerHTML = data.map(createCountry).join('\n');
}

function createCountry(country) {
  return `
           <div class="country">
                <a href="${country.url}" target="_blank">
                    <img src="${country.flags.png}" 
                      class="image" alt="${country.content}"/>
                    <h2>País: ${country.name.common}</h2>
                    <p>Capital: ${country.capital[0]}</p>
                </a>
           </div>
    `
}




const numeroCadastrados = document.querySelector(".numero-cadastrados");
const containerNumeros = document.querySelector(".resumo-cadastrados");
const numeroLikes = document.querySelector(".likes-cadastrados");
const containerLikes = document.querySelector(".resumo-favoritos");
const numeroPrecoMedio = document.querySelector(".numero-precoMedio");
const containerRendaMedia = document.querySelector(".resumo-precoMedio");
const numeroAreaMedio = document.querySelector(".numero-areaMedia");
const containerAreaMedia = document.querySelector(".resumo-areaMedia");

/*const apartamentosCriados = JSON.parse(localStorage.getItem("apartamentos")) || [];*/
const apartamentosCriados = loadFlats ();
console.log(apartamentosCriados);

/*const quantosChecked = JSON.parse(localStorage.getItem("quantosChecked"));*/
const quantosChecked = loadCheckedAp();
console.log(quantosChecked);

if (apartamentosCriados !== []) {
    numeroCadastrados.remove();
    numeroPrecoMedio.remove();
    numeroAreaMedio.remove();
    numerosAps();
    mediaRenda();
    mediaArea();
}

function numerosAps () {
    const paragrafoNumber = document.createElement("p");
    paragrafoNumber.innerHTML = apartamentosCriados.length;
    containerNumeros.appendChild(paragrafoNumber);
};

if (quantosChecked !== 0) {
    numeroLikes.remove();
    likesApartamentos();
};

function likesApartamentos () {
    const paragrafoLikes = document.createElement("p");
    paragrafoLikes.innerHTML = quantosChecked;
    containerLikes.appendChild(paragrafoLikes);
};

function mediaRenda () {
    const numeroPrecoMedioMap = apartamentosCriados.map(apartamento => Number(apartamento.valor));
    console.log(numeroPrecoMedioMap);
    let soma = 0;
    for (const numeros of numeroPrecoMedioMap) {
        soma += numeros;
    }
    console.log(soma);
    let mediaRenda = soma / numeroPrecoMedioMap.length;
    console.log(mediaRenda);
    const paragrafoMediaRenda = document.createElement("p");
    paragrafoMediaRenda.innerHTML = mediaRenda + " €";
    containerRendaMedia.appendChild(paragrafoMediaRenda);
};

function mediaArea () {
    const numeroAreaMedioMap = apartamentosCriados.map(apartamento => Number(apartamento.area));
    console.log(numeroAreaMedioMap);
    let soma = 0;
    for (const numeros of numeroAreaMedioMap) {
        soma += numeros;
    }
    console.log(soma);
    let mediaArea = soma / numeroAreaMedioMap.length;
    console.log(mediaArea);
    const paragrafoMediaArea = document.createElement("p");
    paragrafoMediaArea.innerHTML = mediaArea + " m²";
    containerAreaMedia.appendChild(paragrafoMediaArea);
};


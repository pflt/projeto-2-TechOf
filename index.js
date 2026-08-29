const numeroCadastrados = document.querySelector(".numero-cadastrados");
const containerNumeros = document.querySelector(".resumo-cadastrados");
const numeroLikes = document.querySelector(".likes-cadastrados");
const containerLikes = document.querySelector(".resumo-favoritos");

const apartamentosCriados = JSON.parse(localStorage.getItem("apartamentos")) || [];
console.log(apartamentosCriados);

const quantosChecked = JSON.parse(localStorage.getItem("quantosChecked"));
console.log(quantosChecked);

if (apartamentosCriados !== []) {
    numeroCadastrados.remove();
    numerosAps();
}

function numerosAps () {
    const paragrafoNumber = document.createElement("p");
    paragrafoNumber.innerText = apartamentosCriados.length;
    containerNumeros.appendChild(paragrafoNumber);
};

if (quantosChecked !== 0) {
    numeroLikes.remove();
    likesApartamentos();
};

function likesApartamentos () {
    const paragrafoLikes = document.createElement("p");
    paragrafoLikes.innerText = quantosChecked;
    containerLikes.appendChild(paragrafoLikes);
};
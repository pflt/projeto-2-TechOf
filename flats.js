const paragrafo = document.getElementById("paragrafoNenhum");
const listaFlats = document.querySelector(".lista-flats");
const listaAps = document.querySelector(".apartamentos-cadastrados");

const apartamentosCriados = JSON.parse(localStorage.getItem("apartamentos")) || [];
console.log(apartamentosCriados);

/* deu um erro pois tenho que abrir direto por um link a pagina e nao
estou abrindo direto pelo disco, temos que ativar o live server-
vou tusar agora o find e o find index para saber o que deletar*/

if (apartamentosCriados !== []) {
    paragrafo.remove();
    cardsApartamentos();
};

function apagarApartamento (event) {
    /* como fazer com que o botao saiba qual apartamento estou criando VER MELHOR O QUE O TARGET FAZ*/
    console.log("cliquei");
    const idSelecionado = event.target.id;
    const apartamentoEncontrado = apartamentosCriados.find(function (apartamento) {
        return apartamento.id == idSelecionado;
    });
    /*console.log(apartamentoEncontrado);*/
    const indiceApartamentos = apartamentosCriados.findIndex(function (apartamento) {
        return apartamento.id == idSelecionado
    });
    /*console.log(indiceApartamentos);*/
    const removidoAp = apartamentosCriados.splice(indiceApartamentos, 1);
    console.log("removido");
    /* para conseguir aceder a div com um id que seja dinamico vou usar query selector desse jeito 
    const idGetElement = "#" + idSelecionado;
    console.log(idGetElement);*/
    localStorage.setItem("apartamentos", JSON.stringify(apartamentosCriados));
    const divRemover = document.getElementById(idSelecionado);
    divRemover.remove();
};

let quantosChecked = apartamentosCriados.filter(function (apartamento) {
    return apartamento.favorito;
}).length;

function favoritarAp (event) {
    const idSelecionado = event.target.id;
    console.log("id:", idSelecionado);
    const indiceFavorito = apartamentosCriados.findIndex(function (apartamento){
        return apartamento.id == idSelecionado;
    });
    console.log("indice:", indiceFavorito);
    apartamentosCriados[indiceFavorito].favorito = event.target.checked;
    console.log("apartamentos atualizado:" + apartamentosCriados[indiceFavorito]);
    localStorage.setItem("apartamentos", JSON.stringify(apartamentosCriados));
    if (event.target.checked) {
        quantosChecked += 1;
        /*console.log("checked");
        console.log(quantosChecked);*/
    } else {
        quantosChecked -= 1;
        /*console.log("unchecked");
        console.log(quantosChecked);*/
    }
    localStorage.setItem("quantosChecked", quantosChecked);
};
    /*
    if (event.target.checked) {
        quantosChecked += 1;
        console.log("checked");
        console.log(quantosChecked);
    } else {
        quantosChecked -= 1;
        console.log("unchecked");
        console.log(quantosChecked);
    };
    localStorage.setItem("likes", JSON.stringify(quantosChecked));
 nao esta salvando o refresh nao fica salvo*/


function cardsApartamentos() {
    for (let i = 0; i < apartamentosCriados.length; i++) {
        const divAps = document.createElement("div");
        divAps.id = apartamentosCriados[i].id;
        divAps.classList.add("style-div-flats");
        listaAps.appendChild(divAps)
        const aps = document.createElement("p");
        aps.innerText = i + 1 + " -";
        aps.classList.add("numero-lista-aps");
        divAps.appendChild(aps);
        /* para nao ter que repetir uma linha a uma vou criar um for
        const flat = document.createElement("p");
        flat.innerText = "Id: " + apartamentosCriados[i].id;
        listaFlats.appendChild(flat); 
        */
        for (const chave in apartamentosCriados[i]) {
            const flat = document.createElement("p");
            flat.innerText = chave + ": " + apartamentosCriados[i][chave];
            flat.classList.add("style-flat");
            divAps.appendChild(flat);
        }
        const divFavoritar = document.createElement("div");
        divFavoritar.classList.add("style-div-favoritar");
        divAps.appendChild(divFavoritar);
        const favoritarLegenda = document.createElement("p");
        favoritarLegenda.innerText = "Favoritar:";
        divFavoritar.appendChild(favoritarLegenda);
        const favoritarCheck = document.createElement("input");
        favoritarCheck.id = apartamentosCriados[i].id;;
        favoritarCheck.type = "checkbox";
        favoritarCheck.value = "favortiatr";
        favoritarCheck.checked = apartamentosCriados[i].favorito || false;
        /* nao existe evento checked o evento tem que ser chang*/
        favoritarCheck.addEventListener("change", favoritarAp);
        divFavoritar.appendChild(favoritarCheck);
        const buttonEliminar = document.createElement("button");
        buttonEliminar.textContent = "Deletar";
        buttonEliminar.id = apartamentosCriados[i].id; /*"buttonEliminar"; temosd que usar o id do apartemntos e 
        nao como ele ira saber quem e o apartemnto pois pensei em usar o index mas ele depois de remover ira mudar novamnete */
        buttonEliminar.type = "button";
        buttonEliminar.classList.add("style-button-eliminar");
        /* tive que colcoar para dentro da funcao pois o valor do buttone sta so aqui dentro*/
        buttonEliminar.addEventListener("click", apagarApartamento);
        divFavoritar.appendChild(buttonEliminar);
    };
};







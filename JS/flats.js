const paragrafo = document.getElementById("paragrafoNenhum");
const listaFlats = document.querySelector(".lista-flats");
const listaAps = document.querySelector(".apartamentos-cadastrados");
const filtroCidade = document.getElementById("filtro-cidade");
const filtroValor = document.getElementById("filtro-valor");
const filtroArea = document.getElementById("filtro-area");
const filtroAplicar = document.getElementById("button-aplicar");
const filtroElminar = document.getElementById("button-limpar-filtro");
const formfiltros = document.querySelector(".form-filtros");
const ordenarButtonCidade = document.getElementById("button-cidade");
const ordenarButtonPreco = document.getElementById("button-preco");
const ordenarButtonArea = document.getElementById("button-area");
const ordenarButtonLimpar = document.getElementById("button-limpar");
const modal = document.getElementById("modal");
const buttonModalDeletar = document.querySelector(".modal-button-deletar");
const buttonModalCancelar = document.querySelector(".modal-button-cancelar");

/*const apartamentosCriados = JSON.parse(localStorage.getItem("apartamentos")) || [];*/
const apartamentosCriados = loadFlats();
console.log(apartamentosCriados);

/* deu um erro pois tenho que abrir direto por um link a pagina e nao
estou abrindo direto pelo disco, temos que ativar o live server-
vou tusar agora o find e o find index para saber o que deletar*/

if (apartamentosCriados.length > 0) {
    paragrafo.remove();
    cardsApartamentos();
};

let idSelecionado;

function apagarApartamento (event) {
    /* como fazer com que o botao saiba qual apartamento estou criando VER MELHOR O QUE O TARGET FAZ*/
    console.log("cliquei");
    idSelecionado = event.target.id;
    modal.classList.remove("hidden");
};

function deletarAp () {
    const apartamentoEncontrado = apartamentosCriados.find(function (apartamento) {
        return apartamento.id == idSelecionado;
    });
    /* tive que adicionar pois quando apagava um ap favoritado nao subtraia 1*/
    if (apartamentoEncontrado && apartamentoEncontrado.favorito) {
        quantosChecked -= 1;
        saveFlats(apartamentosCriados);
    }
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
    saveFlats(apartamentosCriados);
    const divRemover = document.getElementById(idSelecionado);
    divRemover.remove();
    /*para quando apagar atualizar o n umero de criacao*/
    listaAps.innerHTML = "";
    cardsApartamentos();
    modal.classList.add("hidden");
};

function cancelarAp () {
    modal.classList.add("hidden");
};

buttonModalDeletar.addEventListener("click", deletarAp);
buttonModalCancelar.addEventListener("click", cancelarAp);

/*estava ater problemas em manter o favorito como favorito*/
let quantosChecked = apartamentosCriados.filter(apartamento => {
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
    saveFlats(apartamentosCriados);
    if (event.target.checked) {
        quantosChecked += 1;
        /*console.log("checked");
        console.log(quantosChecked);*/
    } else {
        quantosChecked -= 1;
        /*console.log("unchecked");
        console.log(quantosChecked);*/
    }
    saveCheckedAp(quantosChecked);
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
            /* classe para arrumar a diferenca de carcateres de cada um*/
            flat.classList.add(chave);
            /*if (chave === "ac" && apartamentosCriados[i][chave] == true) {
                flat.innerText = chave + ": " + apartamentosCriados[i][chave] + " ";
                console.log("feito");
            }*/
            /*tenho que fazer isso se nao a chave favoritar que tive que criar depois 
            para ficar checked vai acabar aparecendo no ncard e nao quero*/
            if (chave === "favorito") {
                flat.classList.add("hidden");
            }
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
        favoritarCheck.classList.add("favoritar-check");
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

function filtrarApartamentos () {
    const filtroCidadeValue = filtroCidade.value.trim().toLowerCase();
    const filtroValorValue = filtroValor.value;
    const filtroAreaValue = filtroArea.value;
    const resultado = apartamentosCriados.filter(apartamento => {
        return (
            (filtroCidadeValue === "" || apartamento.cidade === filtroCidadeValue) &&
            (filtroValorValue === "" || apartamento.valor === filtroValorValue) &&
            (filtroAreaValue === "" || apartamento.area === filtroAreaValue)
        )
    });
    apartamentosCriados.forEach(apartamento => {
        const divFiltros = document.getElementById(apartamento.id);
        const estaNoFiltro = resultado.some(item => item.id === apartamento.id);
        divFiltros.style.display = estaNoFiltro ? "flex" : "none";
        formfiltros.reset();
    });
};

function eliminarFiltros () {
    apartamentosCriados.forEach(apartamento => {
        const divFiltros = document.getElementById(apartamento.id);
        divFiltros.style.display =  "flex";
        formfiltros.reset();
    });
};


filtroAplicar.addEventListener("click", filtrarApartamentos);
filtroElminar.addEventListener("click", eliminarFiltros);

function ordenarCidade () {
    apartamentosCriados.sort((a,b) => a.cidade.localeCompare(b.cidade)); /* localComapre (metodo de string) compara igual<> 
    mas nao numerico e sim como strings mesmo que sue ToLowerCase ele ainda sim da problemas por exemplo com acentos*/
    saveFlats(apartamentosCriados);
    const listaApsCidade = document.querySelector(".apartamentos-cadastrados");
    apartamentosCriados.forEach((apartamento) => {
        const divApCidade = document.getElementById(apartamento.id);
        /*console.log("procurando:", `apartamento-${apartamento.id}`, "achou:", divApCidade);*/
        if (divApCidade) {
            listaApsCidade.appendChild(divApCidade);
        }
    });
};
    /*
    const cidades = apartamentosCriados.map(apartamento => apartamento.cidade);
    cidades.sort();
    const indexCidades = cidades.reduce((atual, indice) => {
        return cidades.indexOf(atual) === indice;
    });
    console.log(cidades);
    console.log(indexCidades);
    */

function ordenarPreco () {
    apartamentosCriados.sort((a,b) => a.valor - b.valor);
    saveFlats(apartamentosCriados);
    const listaApsValor = document.querySelector(".apartamentos-cadastrados");
    apartamentosCriados.forEach((apartamento) => {
        const divApValor = document.getElementById(apartamento.id);
        if (divApValor) {
            listaApsValor.appendChild(divApValor);
        }
    });
};

function ordenarArea () {
    apartamentosCriados.sort((a,b) => b.area - a.area);
    /* o que importa nao e o sinal e sim quem vem antes e depois a ou b*/
    saveFlats(apartamentosCriados);
    const listaApsArea = document.querySelector(".apartamentos-cadastrados");
    apartamentosCriados.forEach((apartamento) => {
        const divApArea = document.getElementById(apartamento.id);
        if (divApArea) {
            listaApsArea.appendChild(divApArea);
        }
    });
};

function ordenarLimpar () {
    apartamentosCriados.sort((a,b) => a.id - b.id);
    saveFlats(apartamentosCriados);
    const listaApsId = document.querySelector(".apartamentos-cadastrados");
    apartamentosCriados.forEach((apartamento) => {
        const divApId = document.getElementById(apartamento.id);
        if (divApId) {
            listaApsId.appendChild(divApId);
        }
    });
};

ordenarButtonCidade.addEventListener("click", ordenarCidade);
ordenarButtonPreco.addEventListener("click", ordenarPreco);
ordenarButtonArea.addEventListener("click", ordenarArea);
ordenarButtonLimpar.addEventListener("click", ordenarLimpar);




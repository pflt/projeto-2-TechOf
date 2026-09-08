const cidade = document.getElementById("cidade");
const rua = document.getElementById("nome-rua");
const numeroRua = document.getElementById("numero-casa");
const area = document.getElementById("tamanho-area");
const ano = document.getElementById("ano-construcao");
const valor = document.getElementById("valor");
const ac = document.getElementById("has-AC");
const disponibilidade = document.getElementById("date");
const botaoCadastrar = document.getElementById("botao-cadastrar");
const form = document.getElementById("form-cadastro");
const containerErro = document.querySelector(".erroFormulario");
const modalCadastro = document.getElementById("modal-cadastro");
const buttonModalCadastrar = document.querySelector(".modal-button-cadastrar");
const buttonModalApartamentos = document.querySelector(".modal-button-aps");

function cadastrarApartamento () {
    const cidadeValor = cidade.value.trim().toLowerCase();
    const ruaValor = rua.value.trim().toLowerCase();
    const numeroRuaValor = numeroRua.value;
    const areaValor = area.value;
    const anoValor = ano.value;
    const valorValor = valor.value;
    const acValor = ac.checked;
    const disponibilidadeValor = disponibilidade.value;

    const validacoes = [
        {valor: cidadeValor, regra: x => x.length < 2, mensagem: "Complete o campo cidade.", elemento: cidade},
        {valor: ruaValor, regra: x => x.length < 2, mensagem: "Complete o campo rua.", elemento: rua},
        {valor: numeroRuaValor, regra: x => Number(x) <= 0 || !Number.isInteger(Number(x)), mensagem: "Complete o campo numero.", elemento: numeroRua},
        {valor: areaValor, regra: x => Number(x) <= 0 || !isFinite(Number(x)), mensagem: "Complete o campo valor da area.", elemento: area},
        {valor: anoValor, regra: x => !Number.isInteger(Number(x)) || Number(x) < 1900 || Number(x) > new Date().getFullYear(), mensagem: "Complete o campo ano.", elemento: ano},
        {valor: valorValor, regra: x => Number(x) <= 0 || !isFinite(Number(x)), mensagem: "Complete o campo valor.", elemento: valor},
        {valor: disponibilidadeValor, regra: x => x ==="", mensagem: "Complete o campo data disponivel.", elemento: disponibilidade}
        /* preciso por Number na frente do isInteger para poder o usar o ! */
    ];

    /*Nao esta resetando os erros esta multiplanco*/

    containerErro.innerHTML = "";
    validacoes.forEach(campo => {
        campo.elemento.style.borderColor = "";
    });

    let temErro = false;
    for (const campo of validacoes) {
        if (campo.regra(campo.valor)) {
            const erro = document.createElement("p");
            erro.innerText= campo.mensagem;
            containerErro.appendChild(erro);
            campo.elemento.style.borderColor = "red";
            /*console.log(acValor);*/
            temErro = true;
        }
    };

    /* se fizer sem o let erro e esse if, colcoando um else no if em cima ele rodaria 7 vezes*/ 
    /*adicionar o try/catch */
    if (!temErro) {
        try {
            criarApartamento(cidadeValor, ruaValor, numeroRuaValor, 
                areaValor, anoValor, valorValor, acValor,disponibilidadeValor);
                modalCadastro.classList.remove("hidden");
                /*alert("Seu apartamento foi cadastrado com sucesso!" + "\n" + "Aceda o portal Apartamentos para ve-lo!");*/
            form.reset(); /* tive que fazer pois estava enviando mas nao resentando os campos*/
    } catch (erro) {
        console.error("Nao foi possivel guardar o apartemnto", erro);
        alert("Nao foi possivel guardar o apartemnto"); /*alert so aceita um argumento*/
    }
    };
         
};

function voltarCadastrarAp () {
    modalCadastro.classList.add("hidden");
};

function paginaFlats () {
    modalCadastro.classList.add("hidden");
    /* novo conceito para ir para uma pgina com jS usar window.location.href = */
    window.location.href = "./flats.html";

};

buttonModalCadastrar.addEventListener("click", voltarCadastrarAp);
buttonModalApartamentos.addEventListener("click", paginaFlats);


    /* se fizesse desse jeito corria o primeiro erro e ja parava
quero que corrar todos os erros
    for (const campo of validacoes) {
        if (campo.regra(campo.valor)) {
            const erro = document.createElement("p");
            erro.innerText= campo.mensagem;
            containerErro.appendChild(erro);
            return;
        }
    };
*/
/*const arrApartamentos = [];   problema com napo slavar quando faz refresh*/
const arrApartamentos = loadFlats();

function criarApartamento(cidadeValor, ruaValor, numeroRuaValor, 
    areaValor, anoValor, valorValor, acValor,disponibilidadeValor ) {
    const idApartamento = Date.now();
    /*console.log(idApartamento);*/
    /* para em ajudar a apagar o apartamento e se eu colcocar na variavel que e um objeto o tirulo seja dinamico, o jeito que 
    achei foi fazer que nem o array */
    const apartamentos = {
        id: idApartamento,
        cidade: cidadeValor,
        rua: ruaValor,
        numero: numeroRuaValor,
        area: areaValor,
        ano: anoValor,
        valor: valorValor,
        ac: acValor,
        data: disponibilidadeValor,
        favorito: false
    };
    arrApartamentos.push(apartamentos);
    /*adicionar o local storage para mandar informacao a outra pagina*/
    saveFlats(arrApartamentos); 
    /*console.log(arrApartamentos);*/
};

    /* se fizesse desse jeito corria o primeiro erro e ja parava
quero que corrar todos os erros
    for (const campo of validacoes) {
        if (campo.regra(campo.valor)) {
            const erro = document.createElement("p");
            erro.innerText= campo.mensagem;
            containerErro.appendChild(erro);
            return;
        }
    };
*/
botaoCadastrar.addEventListener("click", function (event){
    event.preventDefault();
    cadastrarApartamento();
});

/*
Se eu fizesse assim meu codigo ficaria gigantesco apenas para as validacoes! 
Vou tentar encurtar!

function cadastrarApartamento () {
    const cidadeValor = cidade.value.trim();
    if (cidadeValor.length < 4) {
        const cidadeErro = document.createElement("p");
        cidadeErro.innerText= "Preencha ou complete a box cidade!"
        containerErro.appendChild(cidadeErro);
    }

    const ruaValor = rua.value.trim();
    if (ruaValor === "") {
        const ruaErro = document.createElement("p");
        ruaErro.innerText= "Preencha ou complete a box rua!"
        containerErro.appendChild(ruaErro);
    }
};


botaoCadastrar.addEventListener("click", function (event){
    event.preventDefault();
    cadastrarApartamento();

});
*/
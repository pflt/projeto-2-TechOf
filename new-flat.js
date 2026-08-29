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

function cadastrarApartamento () {
    const cidadeValor = cidade.value.trim();
    const ruaValor = rua.value.trim();
    const numeroRuaValor = numeroRua.value.trim();
    const areaValor = area.value.trim();
    const anoValor = ano.value.trim();
    const valorValor = valor.value.trim();
    const acValor = ac.checked;
    const disponibilidadeValor = disponibilidade.value;

    const validacoes = [
        {valor: cidadeValor, regra: x => x.length < 4, mensagem: "Preencha ou complete o campo cidade.", elemento: cidade},
        {valor: ruaValor, regra: x => x ==="", mensagem: "Preencha o campo rua.", elemento: rua},
        {valor: numeroRuaValor, regra: x => x === "", mensagem: "Preencha o campo numero.", elemento: numeroRua},
        {valor: areaValor, regra: x => x ==="", mensagem: "Preencha o campo valor da area.", elemento: area},
        {valor: anoValor, regra: x => x.length < 4 || x.length > 4, mensagem: "Preencha ou complete o campo ano.", elemento: ano},
        {valor: valorValor, regra: x => x.length < 1, mensagem: "Preencha ou complete o campo valor.", elemento: valor},
        {valor: disponibilidadeValor, regra: x => x ==="", mensagem: "Preencha campo data disponivel.", elemento: disponibilidade}
    ];

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
    if (!temErro) {
        criarApartamento(cidadeValor, ruaValor, numeroRuaValor, 
        areaValor, anoValor, valorValor, acValor,disponibilidadeValor);
        alert("Seu apartamento foi cadastrado com sucesso!" + "\n" + "Aceda o portal Apartamentos para ve-lo!");
        form.reset(); /* tive que fazer pois estava enviando mas nao resentando os campos*/
    } 
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
/*const arrApartamentos = [];   problema com napo slavar quando faz refresh*/
const arrApartamentos = JSON.parse(localStorage.getItem("apartamentos")) || [];

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
        data: disponibilidadeValor
    };
    arrApartamentos.push(apartamentos);
    /*adicionar o local storage para mandar informacao a outra pagina*/
    localStorage.setItem("apartamentos", JSON.stringify(arrApartamentos)); 
    console.log(arrApartamentos);
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
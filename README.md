Nosso projeto final desse modulo consiste em:
    Uma pagina de arrendamento de casa chamada RentEase.
Onde vamos trabalhar com HTML5, CSS3 E JS.
Essa aplicacao ira ajudar a registrar, comparar apartamentos ,
guardaros apartamentos, permitir pesquisa e ordenar e destacar favoritos:
    ou seja:
        - Precisamos criar uma pagina para registrar e apagar os apartamentos,
        tanto numa quanto outra verificar se ja tem ou se nao tem o apartamento, 
        para registrar inserir dados.
        - Depois de registrado ter uma pagina onde possa ver meus apartamentos registrados 
        (pensar se os outros podem ver o que eu registrei? Nao, os apartemntos sao so para a pessoa que esta a registrar)
        ter na pagina com eles um potao de eliminar ou seja apagar o apartamento, favoritar, e criar um filtro onde dependendo 
        do parametro aparecam os apartamentos, caso nao tenha nenhum emitir uma mensagem deusar outro paramatro.
        - Guardar os apartementos dentro de localStorage para ficarem salvos e nao apagados apos um refresh.
        - Salvar o projeto em repositorio local e repositorio remoto GitHub.
        - 3 paginas ligadas ( index.html (main), fltas.html (flats), new-flat.html(criar flats)).
        - Cada apartemnto deve conter um id que sera o Date.now() ou seja sera o tempo que foi gerado aquele id naquele momento, 
        desde 1970.
    
4. Estrutura obrigatória da aplicação
A aplicação deve ter três páginas HTML ligadas por links normais:
    a) Home - index.html
    • Header com logótipo ou nome RentEase e menu para as três páginas.
    • Pequeno resumo com o número total de apartamentos e o número de
    favoritos.
    • Lista ou tabela apenas com os apartamentos marcados como favoritos.
    • Botão para remover um apartamento dos favoritos sem o apagar.
    • Mensagem de estado vazio quando ainda não existem favoritos.
    
    b) Todos os apartamentos - flats.html
    • Tabela ou conjunto de cards com todos os apartamentos guardados.
    • Apresentação das propriedades definidas no modelo de dados.
    • Botão para marcar ou desmarcar cada apartamento como favorito.
    • Botão para eliminar um apartamento.
    • Mensagem de estado vazio quando não existem apartamentos.
    • Filtros por cidade, intervalo de preço e intervalo de área.
    • Ordenação por cidade, preço e área.
    • Aplicação da sequência: carregar dados, filtrar, ordenar e só depois
    renderizar
    c) Novo apartamento - new-flat.html

Formulário com um input adequado para cada propriedade editável.

    d) Fluxo de submissão
    • Mensagens de erro junto do campo ou numa área claramente identificada.
    • Botão Guardar.
    d..1. Quando os dados forem válidos:
    d..1.1. criar o objecto, adicionar ao array e guardar em localStorage.
    d..1.2. Apresentar uma mensagem de sucesso e disponibilizar um link
    para Todos os apartamentos.
    d..1.3. Limpar o formulário apenas depois de o apartamento ter sido
    guardado com sucesso.

5. Modelo de dados
        Cada apartamento deve seguir esta estrutura:
        {
        id: 1723456789012,
        city: "Porto",
        streetName: "Rua das Flores",
        streetNumber: 42,
        areaSize: 85,
        hasAC: true,
        yearBuilt: 2018,
        rentPrice: 950,
        dateAvailable: "2026-09-01",
        isFavourite: false
        }

• Usa Date.now() para criar um id numérico simples e suficientemente único
para este exercício.
• Usa um checkbox para hasAC e guarda sempre true ou false.
• O input type="date" fornece uma data no formato YYYY-MM-DD.
• Um apartamento novo começa com isFavourite igual a false.

6. Regras de validação
    Campo Tipo esperado Regra
    city Texto
    obrigatório
    Depois de trim(), deve ter pelo menos 2 caracteres.
    streetName Texto
    obrigatório
    Depois de trim(), deve ter pelo menos 2 caracteres.
    streetNumber Número inteiro Deve ser maior do que 0.
    areaSize Número Deve ser finito e maior do que 0.
    hasAC Booleano Deve resultar directamente do estado do checkbox.
    yearBuilt Número inteiro Entre 1900 e o ano actual.
    rentPrice Número Deve ser finito e maior do que 0.
    dateAvailable Data obrigatória Deve ser preenchida através do input de data.
    Critério: Se existir pelo menos um erro, o apartamento não pode ser guardado. A
    aplicação deve explicar ao utilizador o que precisa de corrigir.

7. Contrato de persistência com localStorage
    Todos os apartamentos devem ser guardados numa única chave chamada
    renteaseFlats. Filtros, ordenação e mensagens temporárias pertencem apenas ao
    estado da interface e não devem ser guardados.
    const STORAGE_KEY = "renteaseFlats";
    loadFlats() // devolve o array guardado ou []
    saveFlats(flats) // guarda o array actualizado
    • Ao abrir uma página, recuperar os apartamentos através de loadFlats().
    • Depois de criar, favoritar, desfavoritar ou eliminar, chamar saveFlats(flats).
    • Depois de guardar, voltar a renderizar a interface com o array actualizado.
    • Se a chave ainda não existir, trabalhar com um array vazio.
    • Se os dados não puderem ser lidos, mostrar uma mensagem simples e evitar
    que a página deixe de funcionar.

8. Filtros, ordenação e favoritos
    a) Filtros
        a. Cidade: mostrar apenas a cidade escolhida ou escrita pelo utilizador.
        b. Preço: permitir definir preço mínimo, máximo ou ambos.
        c. Área: permitir definir área mínima, máxima ou ambas.
        d. Um campo de filtro vazio não deve excluir apartamentos.
        e. Os filtros podem funcionar em conjunto.
    b) Ordenação
        a. Cidade por ordem alfabética.
        b. Preço do menor para o maior.
        c. Área da menor para a maior.
        d. A ordenação deve ser aplicada ao resultado já filtrado, sem alterar os
        dados guardados de forma desnecessária.
    c) Favoritos
        a. O botão de favorito alterna isFavourite entre true e false.
        b. A Home apresenta apenas apartamentos favoritos.
        c. Remover dos favoritos não elimina o apartamento.
        d. A alteração deve continuar visível depois de recarregar o browser.

9. Interface e responsive design
    a) Usar header, nav, main, section, form, label e outros elementos semânticos
    adequados.
    b) Associar cada label ao respectivo input.
    c) Garantir contraste, texto legível, foco visível e botões com nomes claros.
    d) Utilizar Flexbox ou Grid com intenção e evitar larguras fixas que quebrem em
    ecrãs pequenos.
    e) Em mobile, permitir que tabelas tenham scroll horizontal ou sejam
    substituídas por cards legíveis.
    f) Apresentar feedback visível para sucesso, erro, lista vazia e ausência de
    resultados de filtro.

10. Organização mínima dos ficheiros
        rentease/
        index.html
        flats.html
        new-flat.html
        css/
        styles.css
        js/
        storage.js
        home.js
        flats.js
        new-flat.js
        README.md 

Podes criar funções auxiliares adicionais quando isso tornar o código mais legível.
Evita copiar a mesma lógica de localStorage para todos os ficheiros: coloca
loadFlats e saveFlats em storage.js e inclui esse script antes do script específico da
página.

11. Plano de desenvolvimento em cinco dias
    Momento Foco Gate observável
    Dia 1 Estrutura e dados Três páginas ligadas, CSS base, modelo Flat definido
    e exercício de localStorage concluído.
    Dia 2 Novo apartamento Formulário validado guarda um objecto e os dados
    sobrevivem a reload.
    Dia 3 Listagem e acções Todos os apartamentos aparecem; favorito e eliminar
    actualizam localStorage e DOM.
    Dia 4 Filtros e ordenação Filtros combinados e três ordenações funcionam sem
    alterar os dados originais.
    Dia 5 Home, responsive e
    qualidade
    Favoritos na Home, estados vazios, testes, README e
    histórico Git revistos.

12. Critérios de aceitação
    a) Na primeira utilização, a aplicação abre sem erros e apresenta os estados
    vazios correctos.
    b) Um apartamento válido fica visível depois de guardar e continua disponível
    após reload.
    c) Dados inválidos não são guardados e produzem mensagens compreensíveis.
    d) Os filtros de cidade, preço e área funcionam isoladamente e em conjunto.
    e) A ordenação por cidade, preço e área produz a ordem esperada.
    f) Marcar ou desmarcar favorito actualiza a Home e persiste após reload.
    g) Eliminar remove apenas o apartamento escolhido e não afecta os restantes.
    h) A aplicação continua utilizável em desktop e num ecrã mobile.
    i) A consola do browser não apresenta erros durante os fluxos principais.
    j) O README explica como abrir, testar e utilizar a aplicação.
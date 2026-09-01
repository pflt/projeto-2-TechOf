const STORAGE_KEY = "renteaseFlats";
const CHECKED_KEY = "quantosChecked";

function loadFlats () {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
};

function saveFlats (flats) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flats));
};

function loadCheckedAp () {
    const dados = localStorage.getItem(CHECKED_KEY);
    return dados ? JSON.parse(dados) : 0;
};

function saveCheckedAp (quantos) {
    localStorage.setItem(CHECKED_KEY, JSON.stringify(quantos));
};
const createCandidateFormDiv = document.getElementById("create-candidate-form");
const createFormExpandButton = document.getElementById("expand-candidate-form");


const createCandidateForm = `
    <label>Fornavn:</label>
    <input id="create-candidate-first-name" placeholder="Fornavn">
    <label>Efternavn:</label>
    <input id="create-candidate-last-name" placeholder="Efternavn">
    <label>Parti:</label>
    <select id="select-party-create-form"></select>
    <label>Antal stemmer:</label>
    <input id="create-candidate-votes" placeholder="Antal stemmer" type="number">
    <button onclick="removeCandidateForm()">Fortryd</button>
    <button onclick="createCandidate()">Opret</button>
`;

function showCandidateForm() {
    createFormExpandButton.style.display = "none";
    createCandidateFormDiv.innerHTML = createCandidateForm;

    let partyList = [];

    fetch("http://localhost:8080/parties")
    .then(response => response.json())
    .then(parties => {
        parties.map(party => {
            partyList.push(party);
        });
    }).
    then(() => {
        addOptionToSelectElement(partyList);
    })
    .catch(error => console.log(error));
}

function addOptionToSelectElement(partyList) {
    let select = document.getElementById("select-party-create-form");
    let defaultOption = document.createElement("option");
    defaultOption.innerHTML = `<option value = "" disabled selected>Vælg parti</option>`;
    select.appendChild(defaultOption);

    for (let i = 0; i < partyList.length; i++) {
        const option = document.createElement("option");
        option.value = partyList[i].id;
        option.text = partyList[i].name;
        select.appendChild(option);
    }
}

function removeCandidateForm() {
    createFormExpandButton.style.display = "block";
    createCandidateFormDiv.innerHTML = "";
}

function createCandidate() {
    let partyId = document.getElementById("select-party-create-form").value;

    const candidateToCreate = {
        firstName: document.getElementById("create-candidate-first-name").value,
        lastName: document.getElementById("create-candidate-last-name").value,
        votes: document.getElementById("create-candidate-votes").value
    }

    fetch("http://localhost:8080/candidates/" + partyId,{
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(candidateToCreate)
    }).then(response => response.json())
    .then(candidate => {
        createCandidateTableRow(candidate);
        removeCandidateForm();
    }).catch(error => console.log(error));
}

createFormExpandButton.addEventListener("click", showCandidateForm);
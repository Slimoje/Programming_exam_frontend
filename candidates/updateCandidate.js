function updateCandidate(candidate) {
    const tableRowToUpdate = document.getElementById(candidate.id);

    tableRowToUpdate.innerHTML = `
        <td>
            <input id="update-candidate-first-name-${candidate.id}" value="${escapeHTML(candidate.firstName)}">
        </td>
        <td>
            <input id="update-candidate-last-name-${candidate.id}" value="${escapeHTML(candidate.lastName)}">
        </td>
        <td>
            <select id="update-candidate-party-${candidate.id}"></select>
        </td>
        <td>
            <input id="update-candidate-votes-${candidate.id}" value="${escapeHTML(candidate.votes.toString())}">
        </td>
        <td>
            <button id="cancel-update-${candidate.id}">✖</button>
            <button onclick="updateCandidateInBackend(${candidate.id})">✅</button>
       </td>
       <td>
            <button onclick="deleteCandidate(${candidate.id})">❌</button>            
       </td>
    `;

    document.getElementById(`cancel-update-${candidate.id}`).addEventListener("click", () => undoUpdateTableRow(candidate));

    let partyList = [];

    fetch("http://localhost:8080/parties")
    .then(response => response.json())
    .then(parties => {
        parties.map(party => {
            partyList.push(party);
        });
    }).
    then(() => {
        addOptionToUpdateSelectElement(partyList, candidate);
    })
        .catch(error => console.log(error));
}

function addOptionToUpdateSelectElement(partyList, candidate) {
    let select = document.getElementById(`update-candidate-party-${candidate.id}`);
    let currentOption = document.createElement("option");
    currentOption.value = candidate.party.id;
    currentOption.text = candidate.party.name;
    select.appendChild(currentOption);

    for (let i = 0; i < partyList.length; i++) {
        if(currentOption.text != partyList[i].name) {
        const option = document.createElement("option");
        option.value = partyList[i].id;
        option.text = partyList[i].name;
        select.appendChild(option);
        }
    }
}

function undoUpdateTableRow(candidate) {
    const candidateTableRow = document.getElementById(candidate.id);

    constructCandidateTableRow(candidateTableRow, candidate);
}

function updateCandidateInBackend(candidateId) {
    const tableRowToUpdate = document.getElementById(candidateId);
    const partyId = document.getElementById(`update-candidate-party-${candidateId}`).value;
    const party = {
        id: partyId
    };

    const candidateToUpdateWith = {
        firstName: document.getElementById(`update-candidate-first-name-${candidateId}`).value,
        lastName: document.getElementById(`update-candidate-last-name-${candidateId}`).value,
        votes: document.getElementById(`update-candidate-votes-${candidateId}`).value,
        party: party
    };

    fetch("http://localhost:8080/candidates/" + candidateId, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(candidateToUpdateWith)
    })
    .then(response => {
        if (response.status === 200) {
            fetch("http://localhost:8080/candidates/" + candidateId)
            .then(response => response.json())
            .then(candidate => {
                constructCandidateTableRow(tableRowToUpdate, candidate);
            });
        }
    });

}
const candidatesTableBody = document.getElementById("candidate-table-body");
let candidateList;
let filteredCandidates;

fetch("http://localhost:8080/candidates")
.then(response => response.json())
.then(candidates => {
    candidateList = candidates;
    filteredCandidates = candidateList;
    candidates.map(candidate => {
        createCandidateTableRow(candidate);
    });
});

function createCandidateTableRow(candidate) {
    const candidateTableRow = document.createElement("tr");
    candidateTableRow.id = candidate.id;

    candidatesTableBody.appendChild(candidateTableRow);

    constructCandidateTableRow(candidateTableRow, candidate);
}

function constructCandidateTableRow(candidateTableRow, candidate) {
    candidateTableRow.innerHTML = `
        <td>
            <p>${escapeHTML(candidate.firstName)}</p>
        </td>
        <td>
            <p>${escapeHTML(candidate.lastName)}</p>
        </td>
        <td>
            <p>${escapeHTML(candidate.party.name)}</p>
        </td>
        <td>
            <p>${escapeHTML(candidate.votes.toString())}</p>
        </td>
        <td>
            <button id="update-button-${candidate.id}">🥯</button>            
        </td>           
        <td>
            <button onclick="deleteCandidate(${candidate.id})">❌</button>            
        </td>
    `;

    document.getElementById(`update-button-${candidate.id}`).addEventListener("click", () => updateCandidate(candidate));
}

function filterCandidatesByParty() {
    const selectedStatus = document.getElementById("party-select").value;
    candidatesTableBody.innerHTML = "";

    if (selectedStatus === "ALL") {
        filteredCandidates = candidateList;
        candidateList.map(createCandidateTableRow);
    } else {
        filteredCandidates = candidateList.filter(candidate => candidate.party.partyLetters === selectedStatus);
        filteredCandidates.map(createCandidateTableRow);
    }
}

function deleteCandidate(candidateId) {
    fetch("http://localhost:8080/candidates/" + candidateId, {
        method: "DELETE"
    })
    .then(response => {
        if (response.status === 200) {
            document.getElementById(candidateId).remove();
        } else {
            console.log(status);
        }
    });
}

document.getElementById("search").addEventListener("click", filterCandidatesByParty);
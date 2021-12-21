const partyCandidatesTbody = document.getElementById("party-candidates-tbody");
const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const partyId = URLParams.get("partyId");
const partyName = URLParams.get("partyName");


fetch("http://localhost:8080/parties/" + partyId + "/candidates")
.then(response => response.json())
.then(candidates => {
    candidates.map(candidate => {
        createCandidateTableRow(candidate);
    });
});

function createCandidateTableRow(candidate) {
    const candidateTableRow = document.createElement("tr");
    candidateTableRow.id = candidate.id;

    partyCandidatesTbody.appendChild(candidateTableRow);

    candidateTableRow.innerHTML = `
        <td>
            <p>${escapeHTML(candidate.firstName)}</p>
        </td>
        <td>
            <p>${escapeHTML(candidate.lastName)}</p>
        </td>
        <td>
            <p style="text-align: center">${escapeHTML(candidate.votes.toString())}</p>
        </td>
    `;
}

document.getElementById("party-header").innerText = partyName + "s kandidater:";


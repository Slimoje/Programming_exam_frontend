const partyCardsDiv = document.getElementById("parties-div");

fetch("http://localhost:8080/parties")
    .then(response => response.json())
    .then(parties => {
        parties.map(party => {
            createPartyCard(party);
        });
});

function createPartyCard(party) {
    const partyCard = document.createElement("div");
    partyCard.innerHTML = `
        <p class="party-name">${escapeHTML(party.name)}</p>
        <a href="./party.html?partyId=${party.id}&partyName=${party.name}">
        <img src="${party.logo}" style="width: 130px; height: 130px">
        </a>
    `;
    partyCard.className = "party-card-div";
    partyCardsDiv.appendChild(partyCard);
}
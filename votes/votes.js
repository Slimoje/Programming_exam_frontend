let votesInTotal = 0;
const partyList = [];
let aVotes = 0;
let cVotes = 0;
let fVotes = 0;
let oVotes = 0;
let vVotes = 0;
let øVotes = 0;

fetch("http://localhost:8080/parties")
.then(response => response.json())
.then(parties => {
    parties.map(party => {
        partyList.push(party);
    });
});

fetch("http://localhost:8080/candidates")
.then(response => response.json())
.then(candidates => {
    candidates.map(candidate => {
        votesInTotal += candidate.votes;
        for (let i = 0; i < partyList.length; i++) {
            if (candidate.party.id === partyList[i].id) {
                if (candidate.party.partyLetters === "A") {
                    aVotes += candidate.votes;
                } else if (candidate.party.partyLetters === "C") {
                    cVotes += candidate.votes;
                } else if (candidate.party.partyLetters === "F") {
                    fVotes += candidate.votes;
                }else if (candidate.party.partyLetters === "O") {
                    oVotes += candidate.votes;
                }else if (candidate.party.partyLetters === "V") {
                    vVotes += candidate.votes;
                }else if (candidate.party.partyLetters === "Ø") {
                    øVotes += candidate.votes;
                }
            }
        }
    });
    document.getElementById("a-votes").innerText = aVotes;
    document.getElementById("c-votes").innerText = cVotes;
    document.getElementById("f-votes").innerText = fVotes;
    document.getElementById("o-votes").innerText = oVotes;
    document.getElementById("v-votes").innerText = vVotes;
    document.getElementById("ø-votes").innerText = øVotes;

    document.getElementById("a-percentage").innerText = ((aVotes/votesInTotal)*100).toFixed(2) + " %";
    document.getElementById("c-percentage").innerText = ((cVotes/votesInTotal)*100).toFixed(2) + " %";
    document.getElementById("f-percentage").innerText = ((fVotes/votesInTotal)*100).toFixed(2) + " %";
    document.getElementById("o-percentage").innerText = ((oVotes/votesInTotal)*100).toFixed(2) + " %";
    document.getElementById("v-percentage").innerText = ((vVotes/votesInTotal)*100).toFixed(2) + " %";
    document.getElementById("ø-percentage").innerText = ((øVotes/votesInTotal)*100).toFixed(2) + " %";
});





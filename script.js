// Partie consacré au fonctionnement du CRUD et du calcul de moyenne

class Matiere {
    constructor(id, name, note, moyenne) {
        this.id = id;
        this.name = name;
        this.note = note;
        this.moyenne = moyenne;
    }

    setId(value) {
        this.id = value;
    }

    getId() {
        return this.id
    }

    setName(value) {
        this.name = value;
    }

    getName() {
        return this.name;
    }

    setNote(value) {
        this.note = value;
    }

    getNote() {
        return this.note;
    }

    setMoyenne(value) {
        this.moyenne = value;
    }

    getMoyenne() {
        return this.moyenne;
    }
}

var tabMatiere = [];


function getMatiere(idMatiere) {
    for (var i = 0; i <= tabMatiere.length; i++) {
        var matiere = tabMatiere[i];

        for (var property in matiere) {
            if (idMatiere == matiere.getId()) {
                return matiere;
            }
        }
    }
}

function calcMoyenne(idMatiere) {
    let inputNote = document.getElementById("notes").value.split(';');

    var somme = 0;

    for(var i = 0; i <= inputNote.length - 1; i++) {
        var note = parseInt(inputNote[i]);
        somme = somme + note;
    }

    result = somme / inputNote.length;

    return result.toFixed(2);

}


function resetForm() {
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("notes").value = '';
}

function showForm() {
    resetForm();
    document.getElementById('form-matiere').classList.toggle('d-none');

    var idMatiere = tabMatiere.length;

    document.getElementById('id').value = idMatiere + 1;
    document.getElementById('id').readOnly = false;

    console.log(document.getElementById('id').value);
}

// Edit de la matière selon l'id de celle-ci
function editMatiere(idMatiere) {
    let matiere = getMatiere(idMatiere);

    document.getElementById("id").readOnly = true; //disable id input
    document.getElementById("id").value = matiere.getId();
    document.getElementById("name").value = matiere.getName();
    document.getElementById("notes").value = matiere.getNote();

    document.getElementById("form-matiere").classList.remove("d-none");
}

function removeItemArray(array, value) { // Suppression de l'item en fonction de son index dans le tableau
    let index = array.indexOf(value);


    if (index > -1) {
        array.splice(index, 1);
    }

    console.log(array);


    return array;
}

function deleteMatiere(idMatiere) {
    let matiere = getMatiere(idMatiere);

    document.getElementById("matiere" + matiere.getId()).remove();

    removeItemArray(tabMatiere, matiere);

    document.getElementById("form-matiere").classList.add("d-none");
}


function saveMatiere() {
    var matiere;
    var idInput = document.getElementById('id').value;
    var nameInput = document.getElementById('name').value;
    var noteInput = document.getElementById('notes').value;
    var moyenne = calcMoyenne(idInput);

    if (getMatiere(idInput)) { // Si une matière est récupérér ayant comme propriété la valeur de idInput
        matiere = getMatiere(idInput); // Objet contenant la classe Matiere

        matiere.setName(nameInput);
        matiere.setNote(noteInput);
        matiere.setMoyenne(moyenne);
    } else {
        matiere = new Matiere(idInput, nameInput, noteInput, moyenne);
    }

    tabMatiere.push(matiere);
    WriteMatiere(matiere);


    resetForm();
}

function WriteMatiere(matiere) {
    let matiereRow = document.getElementById("matiere" + matiere.getId());
    let tab = document.getElementById("table-matiere");
    let idMatiere = matiere.getId();

    if (!matiereRow) {
        matiereRow = tab.lastElementChild.appendChild(document.createElement("tr"));
        matiereRow.id = "matiere" + idMatiere;
    }

    matiereRow.innerHTML =
        '<td>' + matiere.getName() + '</td>' +
        '<td>' + matiere.getNote() + '</td>' +
        '<td>' + matiere.getMoyenne() + '</td>' +
        '<td>' +
        '<div class="btn-group border-0">' +
        '<button id="edit" type="button" class="btn btn-lg text-light" onclick="editMatiere(\'' + idMatiere + '\')">' +
        '<i class="fas fa-pen"></i>' +
        '</button>' +

        '<button id="delete" type="button" class="btn btn-lg text-light" onclick="deleteMatiere(\'' + idMatiere + '\')">' +
        '<i class="fas fa-trash-alt"></i>' +
        '</button>' +
        '</div>' +
        '</td>';

}

// Fonctions supplémentaires

function showTab(value) {
    document.getElementById(value).classList.remove('hide');
    document.getElementById('homepage').classList.add('hide');
}

function hideTab(value) {
    document.getElementById(value).classList.remove('hide');
    document.getElementById('calc-moyenne').classList.add('hide');
}
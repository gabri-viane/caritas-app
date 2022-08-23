import addicon from "../../../resources/images/plus.png";
import deleteicon from "../../../resources/images/trash.png";
import editicon from "../../../resources/images/pencil.png";
import showicon from "../../../resources/images/list.png";
import useraddicon from "../../../resources/images/user-add.png";

export const families_data = [
    {
        id: 1,
        link: "addfam",
        btn: "Aggiungi",
        icon: addicon,
        text: "Permette di registrare una nuova famiglia a cui assegnare borse."
    }, {
        id: 2,
        btn: "Gestisci",
        link: "handlefam",
        icon: editicon,
        text: "Modifica i dati del dichiarante e della famiglia."
    }, {
        id: 3,
        btn: "Mostra",
        link: "showfam",
        icon: showicon,
        text: "Mostra i dati del dichiarante e della famiglia."
    }, {
        id: 4,
        btn: "Aggiungi Componente",
        link: "addcomp",
        icon: useraddicon,
        text: "Aggiungi un nuovo componente alla famiglia."
    }, {
        id: 5,
        btn: "Rimuovi Componente",
        link: "delcomp",
        icon: deleteicon,
        text: "Rimuovi un componente da una famiglia."
    }, {
        id: 6,
        btn: "Gestisci Componente",
        link: "handlecomp",
        icon: editicon,
        text: "Rimuovi un componente da una famiglia."
    }
];

export const bags_data = [
    {
        id: 1,
        link: "addborsa",
        btn: "Aggiungi",
        icon: addicon,
        text: "Permette di registrare una nuova borsa da assegnare a una famiglia."
    }, {
        id: 2,
        btn: "Gestisci",
        link: "handleborse",
        icon: editicon,
        text: "Modifica i dati delle borse."
    }, {
        id: 3,
        btn: "Mostra",
        link: "showborse",
        icon: showicon,
        text: "Mostra le borse registrate."
    }, {
        id: 4,
        btn: "Rimuovi",
        link: "delborsa",
        icon: deleteicon,
        text: "Rimuovi una borsa da una famiglia."
    }
];
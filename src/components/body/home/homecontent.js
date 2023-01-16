import { fun_CompEditorModal, fun_FamEditorModal, fun_FamShowerModal } from "../famiglia/FamModals";
import { InputIntegerDialog } from "../../../contents/functions/DialogGenerators";
import LoadApp from "../../loadApp";
import { _AddIcon, _AddUserIcon, _DeleteIcon, _EditIcon, _ShowIcon } from "../../../contents/images";

export const families_data = [
    {
        id: 1,
        link: "addfam",
        btn: "Aggiungi",
        action: () => { fun_FamEditorModal(() => { }); },
        icon: _AddIcon,
        text: "Permette di registrare una nuova famiglia a cui assegnare borse."
    }, {
        id: 2,
        btn: "Gestisci",
        link: "handlefam",
        action: () => {
            LoadApp.addModal(InputIntegerDialog("Seleziona famiglia", "Inserisci l'ID Famiglia corrispondente", (idfam) => {
                fun_FamEditorModal(() => { }, idfam);
            }, () => { }, () => { }, 0));
        },
        icon: _EditIcon,
        text: "Modifica i dati del dichiarante e della famiglia."
    }, {
        id: 3,
        btn: "Mostra",
        link: "showfam",
        action: () => {
            LoadApp.addModal(InputIntegerDialog("Seleziona famiglia", "Inserisci l'ID Famiglia corrispondente", (idfam) => {
                fun_FamShowerModal(() => { }, idfam);
            }, () => { }, () => { }, 0));
        },
        icon: _ShowIcon,
        text: "Mostra i dati del dichiarante e della famiglia."
    }, {
        id: 4,
        btn: "Aggiungi Componente",
        link: "addcomp",
        action: () => {
            LoadApp.addModal(InputIntegerDialog("Seleziona famiglia", "Inserisci l'ID Famiglia a cui aggiungere il componente", (idfam) => {
                fun_CompEditorModal(() => { }, idfam, null, false);
            }, () => { }, () => { }, 0));
        },
        icon: _AddUserIcon,
        text: "Aggiungi un nuovo componente alla famiglia."
    }, {
        id: 5,
        btn: "Rimuovi Componente",
        link: "delcomp",
        action: () => { },
        icon: _DeleteIcon,
        text: "Rimuovi un componente da una famiglia."
    }, {
        id: 6,
        btn: "Gestisci Componente",
        link: "handlecomp",
        action: () => { },
        icon: _EditIcon,
        text: "Rimuovi un componente da una famiglia."
    }
];

export const bags_data = [
    {
        id: 1,
        link: "addborsa",
        btn: "Aggiungi",
        action: () => { },
        icon: _AddIcon,
        text: "Permette di registrare una nuova borsa da assegnare a una famiglia."
    }, {
        id: 2,
        btn: "Gestisci",
        link: "handleborse",
        action: () => { },
        icon: _EditIcon,
        text: "Modifica i dati delle borse."
    }, {
        id: 3,
        btn: "Mostra",
        link: "showborse",
        action: () => { },
        icon: _ShowIcon,
        text: "Mostra le borse registrate."
    }, {
        id: 4,
        btn: "Rimuovi",
        link: "delborsa",
        action: () => { },
        icon: _DeleteIcon,
        text: "Rimuovi una borsa da una famiglia."
    }
];
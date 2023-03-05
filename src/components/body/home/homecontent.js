import { fun_CompEditorModal, fun_FamEditorModal, fun_FamShowerModal } from "../famiglia/FamModals";
import { ConfirmDialog, InputChoiceDialog } from "../../../contents/functions/DialogGenerators";
import LoadApp from "../../loadApp";
import { _AddIcon, _AddUserIcon, _DeleteIcon, _EditIcon, _ErrorIcon, _ShowIcon, _SuccessIcon, _WarningIcon } from "../../../contents/images";
import { deleteComponentFamily, getComponentiIDFAMFamily, getDichiarantiFamilies } from "../../../contents/api/capi-family";
import { fun_BorEditorModal } from "../borse/BagModals";
import { deleteBorsa, getAllBorse } from "../../../contents/api/capi-borse";
import { fun_EntryEditorModal, fun_MagEditorModal } from "../magazzino/MagModals";
import { getAllEntrateMagazzino } from "../../../contents/api/capi-magazzino";

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
            getDichiarantiFamilies((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona famiglia", "Seleziona la famiglia corrispondente da modificare", (idfam) => {
                    fun_FamEditorModal(() => { }, idfam);
                }, () => { }, () => { }, dt.query, "Dichiarante", "IDFAM"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Famiglia", "Non è stato possibile caricare le famiglie");
            });
        },
        icon: _EditIcon,
        text: "Modifica i dati del dichiarante e della famiglia."
    }, {
        id: 3,
        btn: "Mostra",
        link: "showfam",
        action: () => {
            getDichiarantiFamilies((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona famiglia", "Inserisci l'ID Famiglia corrispondente", (idfam) => {
                    fun_FamShowerModal(() => { }, idfam);
                }, () => { }, () => { }, dt.query, "Dichiarante", "IDFAM"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Famiglia", "Non è stato possibile caricare le famiglie");
            });
        },
        icon: _ShowIcon,
        text: "Mostra i dati del dichiarante e della famiglia."
    }, {
        id: 4,
        btn: "Aggiungi Componente",
        link: "addcomp",
        action: () => {
            getDichiarantiFamilies((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona famiglia", "Inserisci l'ID Famiglia a cui aggiungere il componente", (idfam) => {
                    fun_CompEditorModal(() => { }, idfam, null, false);
                }, () => { }, () => { }, dt.query, "Dichiarante", "IDFAM"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Famiglia", "Non è stato possibile caricare le famiglie");
            });
        },
        icon: _AddUserIcon,
        text: "Aggiungi un nuovo componente alla famiglia."
    }, {
        id: 5,
        btn: "Rimuovi Componente",
        link: "delcomp",
        action: () => {
            getDichiarantiFamilies((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona famiglia", "Seleziona la Famiglia corrispondente", (idfam) => {
                    //Se confermata la selezione della famiglia
                    getComponentiIDFAMFamily(idfam, (dt2) => {
                        //Se viene caricata l query dei componenti
                        LoadApp.addModal(InputChoiceDialog("Seleziona Componente", "Seleziona il componente da rimuovere", (idcomp) => {
                            //Se viene selezionato il componente da rimuovere chiedere se rimuoverlo
                            LoadApp.addModal(ConfirmDialog("Eliminazione Componente", "Vuoi davvero eliminare il componente?", () => {
                                //Se viene confermata l'eliminazione
                                deleteComponentFamily(idfam, idcomp, () => {
                                    LoadApp.addMessage(_SuccessIcon, "Componenti", "Componente eliminato con successo");
                                }, (dt) => {
                                    LoadApp.addMessage(_ErrorIcon, "Componenti", "Non è stato possibile eliminare il componente");
                                })
                            }))
                        }, () => {
                            //Gestione del no della selezione del componente
                        }, () => {
                            //Gestione all'uscita della selezione del componente
                        }, dt2.query, "Nome", "ID"));
                    }, () => {
                        //Errore caricamento dati
                    });
                }, () => { }, () => { }, dt.query, "Dichiarante", "IDFAM"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Famiglia", "Non è stato possibile caricare le famiglie");
            });
        },
        icon: _DeleteIcon,
        text: "Rimuovi un componente da una famiglia."
    }, {
        id: 6,
        btn: "Gestisci Componente",
        link: "handlecomp",
        action: () => {
            getDichiarantiFamilies((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona famiglia", "Inserisci l'ID Famiglia corrispondente", (idfam) => {
                    fun_FamShowerModal(() => { }, idfam);
                }, () => { }, () => { }, dt.query, "Dichiarante", "IDFAM"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Famiglia", "Non è stato possibile caricare le famiglie");
            });
        },
        icon: _EditIcon,
        text: "Rimuovi un componente da una famiglia."
    }
];

export const bags_data = [
    {
        id: 1,
        link: "addborsa",
        btn: "Aggiungi",
        action: () => {
            fun_BorEditorModal(() => { }, true, null, () => {
                LoadApp.addMessage(_SuccessIcon, "Borse", "La borsa è stata aggiunta");
            }, () => {
                LoadApp.addMessage(_ErrorIcon, "Borse", "La borsa non è stata creata");
            });
        },
        icon: _AddIcon,
        text: "Permette di registrare una nuova borsa da assegnare a una famiglia."
    }, {
        id: 2,
        btn: "Gestisci",
        link: "handleborse",
        action: () => {
            getAllBorse((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona la borsa", "Seleziona la borsa da modificare", (idborsa) => {
                    fun_BorEditorModal(() => { }, true, idborsa);
                }, () => { }, () => { }, dt.query, "Famiglia#DataConsegna", "ID"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Borsa", "Non è stato possibile caricare le borse");
            });
        },
        icon: _EditIcon,
        text: "Modifica i dati delle borse."
    }, {
        id: 3,
        btn: "Mostra",
        link: "showborse",
        action: () => {
            getAllBorse((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona la borsa", "Seleziona la borsa da visualizzare", (idborsa) => {
                    fun_BorEditorModal(() => { }, false, idborsa);
                }, () => { }, () => { }, dt.query, "Famiglia#DataConsegna", "ID"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Borsa", "Non è stato possibile caricare le borse");
            });
        },
        icon: _ShowIcon,
        text: "Mostra le borse registrate."
    }, {
        id: 4,
        btn: "Rimuovi",
        link: "delborsa",
        action: () => {
            getAllBorse((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona la borsa", "Seleziona la borsa da eliminare", (idborsa) => {
                    LoadApp.addModal(ConfirmDialog("Eliminazione borsa", "Vuoi davvero eliminare la borsa?", () => {
                        //Se viene confermata l'eliminazione
                        deleteBorsa(idborsa, () => {
                            LoadApp.addMessage(_SuccessIcon, "Borse", "Borsa eliminata con successo");
                        }, (dt) => {
                            LoadApp.addMessage(_ErrorIcon, "Borse", "Non è stato possibile eliminare la borsa");
                        })
                    }))
                }, () => { }, () => { }, dt.query, "Famiglia#DataConsegna", "ID"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Borsa", "Non è stato possibile caricare le borse");
            });
        },
        icon: _DeleteIcon,
        text: "Rimuovi una borsa da una famiglia."
    }
];

export const mag_data = [
    {
        id: 1,
        link: "addentr",
        btn: "Aggiungi Entrata",
        action: () => {
            fun_EntryEditorModal(() => { }, true, null, null, null, () => {
                LoadApp.addMessage(_SuccessIcon, "Entrate", "L'entrata è stata registrata");
            }, () => {
                LoadApp.addMessage(_ErrorIcon, "Entrate", "L'entrata non è stata creata");
            });
        },
        icon: _AddIcon,
        text: "Permette di registrare una nuova entrata in magazzino."
    }, {
        id: 2,
        btn: "Gestisci Entrata",
        link: "handleentr",
        action: () => {
            getAllEntrateMagazzino((dt) => {
                LoadApp.addModal(InputChoiceDialog("Seleziona l'entrata", "Seleziona l'entrata da modificare", (identr) => {
                    fun_EntryEditorModal(() => { }, true, identr, null, null, () => {
                        LoadApp.addMessage(_SuccessIcon, "Entrate", "L'entrata è stata modificata");
                    }, () => {
                        LoadApp.addMessage(_ErrorIcon, "Entrate", "L'entrata non è stata modificata");
                    })
                }, () => { }, () => { }, dt.query, "Prodotto#Arrivo", "ID"));
            }, () => {
                LoadApp.addMessage(_WarningIcon, "Seleziona Entrata", "Non è stato possibile caricare le entrate");
            });
        },
        icon: _EditIcon,
        text: "Modifica un'entrata precedentemente registrata."
    }, {
        id: 3,
        link: "addprod",
        btn: "Aggiungi Prodotto",
        action: () => {
            fun_MagEditorModal(() => { }, true, null, () => {
                LoadApp.addMessage(_SuccessIcon, "Magazzino", "Il prodotto è stato registrato");
            }, () => {
                LoadApp.addMessage(_ErrorIcon, "Magazzino", "Il prodotto non è stato creato");
            });
        },
        icon: _AddIcon,
        text: "Permette di registrare un nuovo prodotto."
    }
];
// Milestone 2

// A. Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e, cliccando invia (l'icona o anche con enter), il testo viene aggiunto al thread sopra, come messaggio verde.

// B. Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

var nuovoMessaggio = $('#messaggio').keyup(nuovoMessaggio);

function nuovoMessaggio(){
    if(event.keyCode == 13 || event.which == 13){       // se il tasto rilasciato è INVIO
        var contenutoMessaggio = $(this).val();         // memorizzo il valore di input
        nuovo(contenutoMessaggio,'inviato');            // genero il mio messaggio con la fz nuovo
        setTimeout(nuovo('Bella!','ricevuto'),30000);   // genero la risposta automatica con la fz nuovo - NOTA: NON FUNZIONA IL DELAY
    }
}

// ***** funzioni ***** //

// fz per aggiungere uno 0 se l'ora o i minuti hanno una sola cifra
function aggiungiZero(i){
    if(i < 10){                                     // se i è minore di 10 (ha una sola cifra)
        return '0' + i;                             // aggiungi uno 0 davanti
    }
    return i;
}

// fz per generare l'ora
function oraInvio(){
    var ora = new Date();                           // creo l'oggetto
    var h = aggiungiZero(ora.getHours());           // cerco l'ora nell'oggetto - se necessario aggiungo 0 davanti
    var m = aggiungiZero(ora.getMinutes());         // cerco i minuti nell'oggetto - se necessario aggiungo 0 davanti
    return h + ':' + m;
}

// fz per generare un nuovo messaggio (contenuto e classe da definire)
function nuovo(contenuto,classeCss){
    var cloneTemplateMessaggio = $('#template-messaggio .riga-messaggio').clone();  // clono il template del messaggio
    cloneTemplateMessaggio.find('.testo-messaggio').append(contenuto);              // appendo in p il contenuto
    cloneTemplateMessaggio.find('.messaggio').addClass(classeCss);                  // aggiungo la classeCss per personalizzare il css
    cloneTemplateMessaggio.find('.ora-messaggio').append(oraInvio());               // aggiungo l'ora di invio
    $('#conversazione').append(cloneTemplateMessaggio);                             // appendo il messaggio creato in #conversazione
}

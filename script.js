// Milestone 2

// A. Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e, cliccando invia (l'icona o anche con enter), il testo viene aggiunto al thread sopra, come messaggio verde.

// B. Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// mostro l'aeroplanino invece del microfono al click su input #messaggio
$('#messaggio').click(function(){
    $('#strumenti .fa-microphone').addClass('display-none');
    $('#strumenti .fa-paper-plane').removeClass('display-none');
});

// all'invio e al click sull'aeroplanino invio il messaggio e genero una risposta automatica

var invio = false;

$('#strumenti .fa-paper-plane').click(function(){
    invio = true;
})

$('#messaggio').keyup(nuovoMessaggio);

$('#strumenti .fa-paper-plane').click(nuovoMessaggio);

function nuovoMessaggio(){
    if(event.keyCode == 13 || event.which == 13 || invio == true){      // se il tasto rilasciato è INVIO
        var contenutoMessaggio = $('#messaggio').val();                 // memorizzo il valore di input
        if (contenutoMessaggio != ''){                                  // se il contenuto dell'input non è vuoto
            nuovo(contenutoMessaggio,'inviato');                        // genero il mio messaggio con la fz nuovo
            var messaggioRisposta = nuovo('Bella!','ricevuto');
            setTimeout(messaggioRisposta,30000);                        // genero la risposta automatica con la fz nuovo - NOTA: NON FUNZIONA IL DELAY
            $('#messaggio').val('');                                    // pulisco il campo di input
            $('.scambio.active .conversazione').scrollTop(2000);                 // scrollo per vedere subito i nuovi messaggi
        }
        invio = false;
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
    var cloneTemplateMessaggio = $('.scambio.active #template-messaggio .riga-messaggio').clone();  // clono il template del messaggio
    cloneTemplateMessaggio.find('.testo-messaggio').append(contenuto);              // appendo in p il contenuto
    cloneTemplateMessaggio.find('.messaggio').addClass(classeCss);                  // aggiungo la classeCss per personalizzare il css
    cloneTemplateMessaggio.find('.ora-messaggio').append(oraInvio());               // aggiungo l'ora di invio
    $('.scambio.active .conversazione').append(cloneTemplateMessaggio);                             // appendo il messaggio creato in .conversazione
}

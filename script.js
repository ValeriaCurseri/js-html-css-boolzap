// Milestone 2
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e, cliccando invia (l'icona o anche con enter), il testo viene aggiunto al thread sopra, come messaggio verde.
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Suggerimento: Utilizzate il template come vi ho fatto vedere a lezione, ma soprattutto state attenti a trovare l'elemento giusto dove inserire (appendere) i valori ricavati dal campo input.
// In poche parole se il mio template prevede un tag p (possibilmente con una determinata classe) dove inserire del testo, devo trovarlo e poi aggiungere il testo!
// Ricordatevi anche che alla fine il clone va pushato (incollato) dove desiderate.

// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e, cliccando invia (l'icona o anche con enter), il testo viene aggiunto al thread sopra, come messaggio verde.

// 1. all'invio dopo aver digitato nell'input #messaggio, succede qualcosa (fz)

$('#messaggio').keyup(nuovoMessaggio);

// 2. scrivo la fz per generare un nuovo messaggio

function nuovoMessaggio(){
    if(event.keyCode == 13 || event.which == 13){
        // 2.1 memorizzo il valore di #messaggio
        var contenutoMessaggio = $(this).val();
        var cloneMessaggio = $('#template-messaggio .riga-messaggio').clone();
        // 2.3 appendo in p il valore memorizzato
        cloneMessaggio.find('.testo-messaggio').append(contenutoMessaggio);
        // 2.4 aggiungo la classe .inviato per personalizzare il css
        cloneMessaggio.find('.messaggio').addClass('inviato');
        // 4.1 aggiungo l'ora di invio
        cloneMessaggio.find('.ora-messaggio').append(oraInvio());
        // 2.5 appendo il messaggio creato in #conversazione
        $('#conversazione').append(cloneMessaggio);
    }
}

// 3. scrivo la fz per aggiungere uno 0 se l'ora o i minuti hanno una sola cifra

function aggiungiZero(i){
    if(i < 10){
        return '0' + i;
    }
    return i;
}

// 4. scrivo la fz per generare l'ora
function oraInvio(){
    var ora = new Date();
    var h = aggiungiZero(ora.getHours());
    var m = aggiungiZero(ora.getMinutes());
    return h + ':' + m;
}

// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

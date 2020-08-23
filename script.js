$(document).ready(function(){

    // mostro l'aeroplanino invece del microfono al click su input #messaggio
    $('#messaggio').click(function(){
        $('#strumenti .fa-microphone').addClass('display-none');
        $('#strumenti .fa-paper-plane').removeClass('display-none');
    });

    // all'invio e al click sull'aeroplanino invio il messaggio e genero una risposta automatica

    var invio = false;                                                      // variabile sentinella utile per inviare al click

    $('#strumenti .fa-paper-plane').click(function(){
        invio = true;
    })

    $('#messaggio').keyup(nuovoMessaggio);

    $('#strumenti .fa-paper-plane').click(nuovoMessaggio);

    // RICERCA: ricerco il valore dell'input nella colonna #cerca-contatti all'interno degli span con classe .nome della colonna #cronologia-chat. quello che trovo rimane. se non trovo niente scrivo 'La ricerca non ha prodotto alcun risultato'

    $('#cerca-contatti input').keyup(function(event){                           // quando i tasti si sollevano compilando l'input
        var valoreRicerca = $('#cerca-contatti input').val().toLowerCase();     // memorizzo il valore dell'input
        console.log(valoreRicerca);         // DA CANCELLARE
        $('#cronologia-chat .nome').each(function(){                            // per ogni chat presente nella mia cronologia
            var nomeChat = $(this).text().toLowerCase();
            if (nomeChat.includes(valoreRicerca) == false){         // se il nome del mio contatto non contiene il valore dell'input
                $(this).closest('.chat').css('display', 'none');    // non lo mostro
            } else {                                                // se il nome del mio contatto contiene il valore dell'input
                $(this).closest('.chat').css('display', 'flex');   // lo mostro
            }
        })
    })

    // CAROUSEL: cliccando sulle diverse chat nella colonna #cronologia-chat, nella colonna di destra apparirà la chat selezionata (A) e i dettagli del contatto selezionato

    $('#cronologia-chat .chat').click(function(){                                   // 1. al click sulle singole chat
        $('#cronologia-chat .chat.active').removeClass('active');                   // A2. rimuovo la classe active dalla chat che la possiede
        $(this).addClass('active');                                                 // A3. la chat cliccata ottiene la class active
        var chatActiveIndex = $(this).index();                                      // A4. individuo l'index della chat cliccata
        var conversazioneActive = $('#chat .conversazione').eq(chatActiveIndex);    // A5. individuo la conversazione con lo stesso index del pallino cliccato
        $('#chat .conversazione.active').removeClass('active');                     // A6. rimuovo la classe active dalla conversazione che la possiede
        conversazioneActive.addClass('active');                                     // A7. do alla conversazione con lo stesso indice della chat cliccata la class active
        var nome = $('#cronologia-chat .chat.active .nome').text();                 // B8. memorizzo il nome della chat cliccata
        $('#chat .header .nome').text(nome);                                        // B9. lo inserisco nell'header con .text()
        var ora = $('#cronologia-chat .chat.active .ultimo-accesso').text();        // B10. memorizzo l'ora dell'ultima connessione della chat cliccata
        $('#chat .header .ultimo-accesso').text(ora);                               // B11. la inserisco nell'header con .text()
        var img = $('#cronologia-chat .chat.active img').attr('src');    // memorizzo l'attributo src dell'immagine della chat cliccata
        $('#chat .header .img').attr('src', img);    // lo sostituisco all'attributo search già presente nell'header


    });

})

// ***** funzioni ***** //

function nuovoMessaggio(){  // fz per inviare un messaggio
    if(event.keyCode == 13 || event.which == 13 || invio == true){      // se il tasto rilasciato è INVIO
        var contenutoMessaggio = $('#messaggio').val();                 // memorizzo il valore di input
        console.log(contenutoMessaggio);
        if (contenutoMessaggio != ''){                                  // se il contenuto dell'input non è vuoto
            nuovo(contenutoMessaggio,'inviato');                        // genero il mio messaggio con la fz nuovo
            setTimeout(nuovo,3000,'Bella!','ricevuto');                 // genero la risposta automatica con la fz nuovo
            $('#messaggio').val('');                                    // pulisco il campo di input
            $('.conversazione.active').scrollTop(2000);        // scrollo per vedere subito i nuovi messaggi
        }
        invio = false;
    }
}

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
    var cloneTemplateMessaggio = $('.conversazione.active #template-messaggio .riga-messaggio').clone();  // clono il template del messaggio
    cloneTemplateMessaggio.find('.testo-messaggio').append(contenuto);                              // appendo in p il contenuto
    cloneTemplateMessaggio.find('.messaggio').addClass(classeCss);                                  // aggiungo la classeCss per personalizzare il css
    cloneTemplateMessaggio.find('.ora-messaggio').append(oraInvio());                               // aggiungo l'ora di invio
    $('.conversazione.active').append(cloneTemplateMessaggio);                             // appendo il messaggio creato in .conversazione
}

// NOTE:
// scrollTop non funziona benissimo

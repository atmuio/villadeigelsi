<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera i dati dal form
    $nome = htmlspecialchars($_POST['rname']);
    $telefono = htmlspecialchars($_POST['rphone']);
    $data = htmlspecialchars($_POST['rdate']);
    $email = htmlspecialchars($_POST['rparty-size']);
    $messaggio = htmlspecialchars($_POST['radd-info']);

    // Controlla che i campi obbligatori siano compilati
    if (empty($nome) || empty($telefono) || empty($data) || empty($email)) {
        die("Errore: tutti i campi obbligatori devono essere compilati.");
    }

    // Configura i dettagli dell'email
    $to = "secrieruy2k@gmail.com"; // Sostituisci con il tuo indirizzo email
    $subject = "Nuova Richiesta di Prenotazione da $nome";
    $body = "Hai ricevuto una nuova richiesta di prenotazione:\n\n"
          . "Nome: $nome\n"
          . "Telefono: $telefono\n"
          . "Data: $data\n"
          . "Email: $email\n"
          . "Messaggio: $messaggio\n";

    $headers = "From: $email\r\n"
             . "Reply-To: $email\r\n"
             . "Content-Type: text/plain; charset=utf-8\r\n";

    // Invia l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "La tua prenotazione è stata inviata con successo!";
    } else {
        echo "Si è verificato un errore nell'invio della prenotazione. Riprova.";
    }
} else {
    echo "Metodo non supportato.";
}
?>



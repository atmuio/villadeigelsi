/* ===================================================================
 * Villa dei Gelsi | Form Validation
 * ------------------------------------------------------------------- */


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingForm");
    const nameInput = document.getElementById("rname");
    const phoneInput = document.getElementById("rphone");
    const dateInput = document.getElementById("rdate");
  
    // Nascondi inizialmente tutti i messaggi di errore
    document.querySelectorAll(".error-message").forEach((el) => {
      el.style.display = "none";
    });
  
    // Funzione per mostrare errori
    const showError = (input, message) => {
      let errorElement = input.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains("error-message")) {
        // Se il messaggio di errore non esiste accanto all'input, lo crea
        errorElement = document.createElement("span");
        errorElement.className = "error-message";
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      }
      errorElement.textContent = message;
      errorElement.style.display = "block";
      input.classList.add("error");
    };
  
    // Funzione per rimuovere errori
    const clearError = (input) => {
      const errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.textContent = "";
        errorElement.style.display = "none";
      }
      input.classList.remove("error");
    };
  
    // Validazione in tempo reale per il nome (solo lettere e spazi)
    nameInput.addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, ""); // Permette solo lettere e spazi
    });
  
    // Validazione in tempo reale per il telefono (numeri e simboli specifici)
    phoneInput.addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/[^0-9+\-\s]/g, ""); // Permette solo numeri, +, - e spazi
    });
  
    // Aggiunta automatica degli slash nella data (gg/mm/aaaa)
    dateInput.addEventListener("input", (event) => {
      let value = event.target.value.replace(/[^0-9]/g, ""); // Rimuove tutto tranne numeri
      if (value.length > 2 && value.length <= 4) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      } else if (value.length > 4) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
      }
      event.target.value = value;
    });
  
    // Validazione al momento dell'invio del form
    form.addEventListener("submit", (event) => {
      let isValid = true;
  
      // Validazione per il nome
      if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nameInput.value)) {
        showError(nameInput, "Il nome può contenere solo lettere e spazi.");
        isValid = false;
      } else {
        clearError(nameInput);
      }
  
      // Validazione per il numero di telefono
      if (!/^\+?[0-9\s\-]+$/.test(phoneInput.value)) {
        showError(phoneInput, "Il numero di telefono può contenere solo numeri, +, - e spazi.");
        isValid = false;
      } else {
        clearError(phoneInput);
      }
  
      // Validazione per la data
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateInput.value)) {
        showError(dateInput, "Inserisci una data valida nel formato gg/mm/aaaa.");
        isValid = false;
      } else {
        clearError(dateInput);
      }
  
      // Blocca l'invio se ci sono errori
      if (!isValid) {
        event.preventDefault();
      }
    });
  });
  
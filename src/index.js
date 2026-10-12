import {SimpleChatEngine} from "./chat-engine/simple.js";
import {LLMChatEngine}    from "./chat-engine/llm.js";
import MarkdownIt         from "https://unpkg.com/markdown-it@15.0.2/dist/browser/markdown-it.esm.min.mjs";

/**
 * Warten, bis die Seite komplett geladen wurde und dann erst die Initialisierungen
 * im JavaScript vornehmen. Sonst funktionieren die DOM-Zugriffe nicht.
 */
window.addEventListener("DOMContentLoaded", () => {
    // Wichtige HTML-Elemente besorgen
    let messagesElement = null;     // TODO: Element "#chat-area .messages" stattdessen zuweisen
    let inputElement = null;        // TODO: Element "#chat-area input" stattdessen zuweisen

    document.querySelector("html").addEventListener("click", () => inputElement.focus());

    // Aktuell aktive Chat Engine
    let engine = null;
    let md = new MarkdownIt();

    /**
     * Hilfsfunktion zur Ausgabe einer Chatnachricht.
     *
     * @param {Boolean} user true = Benutzer, false = Chatbot
     * @param {String} message Text der Chatnachricht
     */
    function postMessage(user, message) {
        // TODO: Neues <div>-Element erzeugen.
        // TODO: CSS-Klasse "message" zuweisen.
        // TODO: CSS-Klasse "user" zuweisen, wenn local === true, sonst "bot" (z.B. mit ?:-Operator).
        // TODO: Inhalt des <div>-Elements mit dem Nachrichtentext belegen: md.render(message)

        // TODO: <div>-Element an messagesElement anhängen
        messagesElement.scrollTop = messagesElement.scrollHeight;

        // TODO: <div>-Element zurückgeben
    }

    // Startnachricht anzeigen
    postMessage(false, "Bitte Chat Engine auswählen:\n\n - `*simple` = Einfache Chat Engine\n - `*llm` = Generatives Sprachmodell\n");

    /**
     * Nachricht bei ENTER abschicken und Antwort vom Chatbot generieren.
     */
    inputElement.addEventListener("keyup", async event => {
        if (event.key == "Enter") {
            // Benutzernachricht anzeigen
            let userMessage = event.target.value;
            // TODO: Vom Benutzer eingegebene Nachricht anzeigen lassen

            // Eingabefeld leeren
            event.target.value = "";
            event.target.disabled = true;

            // Antwortnachricht erzeugen und anzeigen
            let answerDiv = postMessage(false, "");

            let callback = text => {
                answerDiv.innerHTML = md.render(text);
                messagesElement.scrollTop = messagesElement.scrollHeight;
            }

            switch (userMessage.toUpperCase()) {
                case "*SIMPLE":
                    engine = new SimpleChatEngine();
                    await engine.init(callback);
                    break;
                case "*LLM":
                    engine = new LLMChatEngine();
                    await engine.init(callback);
                    break;
                default:
                    if (engine) {
                        // TODO: Engine aufrufen, um eine Antwort zu generieren und anzuzeigen
                    } else {
                        callback("Keine Chat Engine geladen!");
                    }
            }

            // Eingabefeld wieder aktivieren
            event.target.disabled = false;
            event.target.focus();
        }
    });
});

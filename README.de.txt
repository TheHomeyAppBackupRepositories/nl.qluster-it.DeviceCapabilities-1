Neu: Chronographs und Better Logic Library variablen können jetzt ohne Flows direkt in AVD-Feldern reflektiert werden.

Neu: API-Aufruf zum Aktualisieren von AVD-Feldern.

Neu: Exportieren und importieren Sie Flows und/oder Advanced Virtual Devices von anderen Homey-Benutzern.
Importieren Sie über Vorlagen über App-Einstellungen, AVD-Reparatur oder beim Erstellen von AVDs.

Ebenfalls neu: Vollständig anpassbares virtuelles Gerät (AVD) mit einzigartiger textueller Statusanzeige!
Beispiele finden Sie im entsprechenden Thread im Community Forum.

Erstellen Sie ein Gerät und konfigurieren Sie es selbst:
* Textstatus, den Sie als Statusindikator auf der Gerätekachel in der mobilen App auswählen können, einstellbar über Flows.
* Benutzerdefinierte hochladbare Symbole können als Fähigkeits-Symbole festgelegt werden.
* Gerätekacheln können wie ein Schalter genutzt werden (Kachel bleibt hell/dunkel nachdem sie angeklickt wurde). Oder nutzen Sie die Kachel (hell/dunkel) als Statusindikator aus einem Flow heraus.
* 10 Nummern, Texte, Ja/Nein, Tasten und Kameras können add_devices sein.
* Ausblenden der Gerätekachel-Schaltfläche.

Und

Flowkarte zum Abrufen des Benutzers und des Clients aus den Einblicken von vor x Minuten (kann vorläufig Null sein).
Beispiel: Abrufen des Temperaturwertes vom Wohnzimmer von vor 30 Minuten.

Oder

Legen Sie die Fähigkeiten der Geräte pro Zone fest. Öffnen oder schließen Sie beispielsweise alle Vorhänge in einer bestimmten Zone, einschließlich (oder nicht) der Unterzonen, einer bestimmten Marke oder eines bestimmten Gerätetyps.
"Hört" auch auf Fähigkeiten für die es keine Auslöser vom App-Entwickler gibt, und gibt Ihnen Token mit dem Benutzer und dem Client (App) zurück, der den Fähigkeitswert-Wert aktiviert/geändert hat.
Und eine Bedingung die in der Lage ist, eine Fähigkeit festzulegen und auf einen bestimmten "Fehler" zu warten.

Jetzt auch eine neue Aktionskarte, die den Wert einer Fähigkeit von einem Gerät von vor [numberof] Minuten abruft (einschließlich des Benutzers und des Clients der den Wert geändert hat).

Und eine Karte "App hat gestartet" (Wenn...) sowie eine Karte "App läuft" (Und...).

Beispiel: Setzen Sie in der Zone "Zuhause" einschließlich Unterzonen (Ja) curtain.windowcoverings_set auf 0.
Dadurch werden alle Vorhänge im gesamten Zuhause geschlossen. Wenn Sie curtain.windowcoverings_set auf 1 setzen werden alle Vorhänge geöffnet.

Beispiel: "Abhören" (beobachten) von Vacuumcleaner1 für bin_full.
Der Flow wird ausgelöst, wenn bei einem Gerät namens Vacuumcleaner1 die Capability bin_full geändert wird.
Prüfen Sie den Wert auf "Wahr" und senden Sie eine Benachrichtigung an Ihr Telefon wenn der Staubsaugerbehälter voll ist.

Beispiel: Setzen Sie SamsungFrameTV.onoff auf "Wahr" und warten Sie auf den Fehler: Ist bereits eingeschaltet...
Der Ablauf wird fortgesetzt, nachdem der Fernseher eingeschaltet wurde. Es gibt also keine Verzögerungen mehr beim Warten auf das Einschalten des Fernsehers oder der Kaffeemaschine.

Beispiel: Rufen Sie den Temperaturwert vom Wohnzimmer von vor 30 Minuten ab.
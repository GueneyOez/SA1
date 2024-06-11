## Klone das Repository von GitHub:


git clone https://github.com/GueneyOez/SA1.git

cd SA1

git checkout test

## Starte die PostgreSQL-Datenbankinstanz:

Du kannst entweder PostgreSQL lokal auf deinem Rechner installieren oder einen PostgreSQL-Docker-Container ausführen. Hier ist der Befehl, um einen PostgreSQL-Docker-Container auszuführen:

docker container run --name sa1 -e POSTGRES_PASSWORD=admin -d -p 5432:5432 postgres

## Erstelle die Datenbankobjekte:

Navigiere zur Wurzelanwendung deines Projekts (SA1). In diesem Projekt solltest du ein SQL-Skript haben, das die Datenbankobjekte erstellt. Führe dieses Skript aus:


docker container cp create_database.sql sa1:/
docker container exec -it postgresdb bash
psql -U postgres --file create_database.sql

## (Optional) Aktualisiere die Datenbankkonfigurationen in application.properties:

Öffne die Datei src/main/resources/application.properties und aktualisiere die Datenbank-URL, den Benutzernamen und das Passwort entsprechend deiner Konfiguration. Zum Beispiel:

properties

spring.datasource.url=jdbc:postgresql://localhost:5432/jodel
spring.datasource.username=postgres
spring.datasource.password=admin

## Führe die Spring Boot-Anwendung aus:

Führe den folgenden Befehl aus, um deine Anwendung zu starten:

bash

./gradlew bootRun

## Starte React

cd webapp-frontend

npm install

npm start

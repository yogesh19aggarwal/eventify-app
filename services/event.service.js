import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentialsPath = path.join(__dirname, "../config/credentials.json");
const tokenPath = path.join(__dirname, "../config/token.json");

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
const token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

oAuth2Client.setCredentials(token);

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

export { calendar };

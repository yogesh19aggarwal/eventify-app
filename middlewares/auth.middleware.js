import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentialsPath = path.join(__dirname, "../config/credentials.json");
const tokenPath = path.join(__dirname, "../config/token.json");

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
const { client_id, client_secret, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

export function isAuthenticated(req, res, next) {
  if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
    oAuth2Client.setCredentials(token);

    if (new Date(token.expiry_date) < new Date()) {
      res.status(401).json({ error: "Unauthorized! Please log in." });
    }

    next();
  } else {
    console.log("No token found. User must log in.");
    res.status(401).json({ error: "Unauthorized! Please log in." });
  }
}
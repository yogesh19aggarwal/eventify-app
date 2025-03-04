import { oAuth2Client, saveToken, removeToken } from "../services/auth.service.js";

const login = (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar"],
    });

    res.json({ authUrl });
};

const generateToken = async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).json({ error: "No code provided!" });

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        saveToken(tokens);

        console.log("Token stored successfully!");
        res.json({ message: "Login successful!", tokens });
    } catch (error) {
        console.error("Error retrieving access token:", error.message);
        res.status(500).json({ error: "Authentication failed!" });
    }
};

const logout = (req, res) => {
    removeToken();
    res.json({ message: "User logged out successfully!" });
};

export { login, generateToken, logout };

const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("C:/Users/hp/Desktop/truck/truck"));

app.post("/api/contact", (req, res) => {
    const { name, phone, message } = req.body;

    console.log("New contact message:");
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Message:", message);

    res.json({
        message: `Thanks, ${name} — your message was received.`
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Morenjo server is running on http://localhost:${PORT}`);
});
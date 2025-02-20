import app from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`[Info] Server running at http://localhost:${PORT}`);
});

// lib/server.ts

import app from "./app";
const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
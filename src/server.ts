import { app } from "./app";
import { environment } from "./environment";

app.listen(environment.PORT, (): void => console.log("Server running"));

import { Application } from "./deps.ts";
import { router } from "./src/routes/product.routes.ts";

const app = new Application();

app.use(router.routes());

app.listen({ port: 3000 });
console.log(`Server on http://localhost:3000/`);
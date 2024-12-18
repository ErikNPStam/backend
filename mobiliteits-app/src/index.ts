/**
 * @author Luka Piersma
 *
 * The index file where the app is created.
 */

import { AppBuilder } from "./creation/builders/app.builder";
import { Routes } from "./creation/enums/routes";

const PORT = parseInt(process.env.PORT_HTTP || '');

const appBuilder = AppBuilder.getInstance();
appBuilder.setPort(PORT);
appBuilder.addRouter(Routes.DEFAULT);
appBuilder.addRouter(Routes.USER);
appBuilder.addRouter(Routes.ADMIN);

const app = appBuilder.buildApp();
app.attachCors();
app.attachHeaders();
app.attachEncoder();
app.attachRouters();
app.listen();

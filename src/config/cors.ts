import * as cors from "cors";

const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    methods: "GET,POST,OPTIONS,PUT,PATCH,DELETE",
    origin: "*"
};
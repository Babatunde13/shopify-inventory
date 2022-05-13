import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import itemsRouter from './src/routes/items.routes';
import warehouseRouter from './src/routes/warehouse.routes';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to Shopify Inventory Backend API",
    data: {},
    status: true
  });
});

app.use('/items', itemsRouter)
app.use('/warehouse', warehouseRouter)

app.use("*", (err: any, req: Request, res: Response) => {
  console.log(
    `${err.status || 500} - ${req.method} - ${err.message}  - ${
      req.originalUrl
    } - ${req.ip}`
  );
  return res.status(404).json({
    message: "Resource not found",
    status: false
  })
});

app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (isCelebrateError(error)) {
    const errorMessage =
      error.details.get("body") ||
      error.details.get("query") ||
      error.details.get("params");
    const message = errorMessage!.message.replace(/"/g, "");
    return res.status(400).json({
      errors: message,
      status: false
    });
  }
  next();
});


export default app;


import { productRouter } from './controller/routes/productRoute';
import { userRouter } from './controller/routes/userRoute';
import { app } from './controller/app';

app.use("/product", productRouter)
app.use("/user", userRouter)
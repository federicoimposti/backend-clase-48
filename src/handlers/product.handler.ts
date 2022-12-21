import { Context, helpers } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
import { Products } from "../types/product.types.ts";

const DB_PRODUCTS: Products[] = [];

export const findAll = async (ctx: Context) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: findAll handler`);

        ctx.response.body = await {code: '00', data: DB_PRODUCTS};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const findProduct = async (ctx: Context) =>{
    try {
        const { productId } = helpers.getQuery(ctx, {mergeParams: true});
        const product = await DB_PRODUCTS.find((u) => u.id == productId);

        if (product) {
            ctx.response.body = await {code: '00', data: product};
        } else {
            ctx.response.body = await {code: '01', msg: `Producto con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const createProduct = async (ctx: Context ) => {
    try {
        ctx.response.status = 201;
        logger.debug(`status: ${ctx.response.status} method: createproduct handler`);

        const { name, description, price, id} = await ctx.request.body().value;
       
       
        const product: Products = {
            id,
            name,
            description,
            price
        }
        DB_PRODUCTS.push(product)

        ctx.response.body = await {code: '00', data: product};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const updateProduct = async (ctx: Context ) => {
    try {
        ctx.response.status = 202;
        logger.debug(`status: ${ctx.response.status} method: updateProduct handler`);

        const { productId } = helpers.getQuery(ctx, {mergeParams: true});
        const productIndex = await DB_PRODUCTS.findIndex((u) => u.id == productId);

        if (productIndex) {
            const { id, name, description, price } = await ctx.request.body().value;
            DB_PRODUCTS.splice(productIndex, 1, {id: productId, name, description, price});
           
            ctx.response.body = {code: '00', data: {id: productId, name, description, price}}
        } else {
            ctx.response.body = {code: '01', msg: `Product con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {msg: error};
    }
}

export const deleteProduct = async (ctx: Context ) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: deleteproduct handler`);

        const { productId } = helpers.getQuery(ctx, {mergeParams: true});
        const productIndex = await DB_PRODUCTS.findIndex((u) => u.id == productId);

        if (productIndex) {
            DB_PRODUCTS.splice(productIndex, 1);

            ctx.response.body = {code: '00', msg: `Producto con id ${productId} eliminado`}
        } else {
            ctx.response.body = {code: '01', msg: `Producto con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {msg: error};
    }
}
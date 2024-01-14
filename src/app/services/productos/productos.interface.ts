import { Insumo } from "../insumos/insumos.interface"

export interface Producto {
    _id: string,
    nombre: string,
    descripcion: string,
    detallePreparacion: string,
    precio: number,
    rubro: {
        _id: string,
        nombre: string
    },
    articulos: {
        cantidad: number,
        articulo: Insumo
    }[]
}

export interface CreateProductoPayload {
    nombre: string,
    descripcion: string,
    detallePreparacion: string,
    precio: number,
    rubro: string,
    articulos: {
        cantidad: number,
        articulo: string
    }[]
}

export interface UpdateProductoPayload {
    _id: string | undefined,
    nombre: string,
    descripcion: string,
    detallePreparacion: string,
    precio: number,
    rubro: string,
    articulos: {
        cantidad: number,
        articulo: string
    }[]
}
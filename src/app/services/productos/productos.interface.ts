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
        articulo: {
            _id: string,
            nombre: string,
            denominacion: string
        } | string
    }
}
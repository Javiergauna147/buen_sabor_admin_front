export interface Insumo {
    _id: string,
    nombre: string,
    denominacion: string,
    descripcion: string,
    marca: string,
    stock: number,
    stockMinimo: number,
    stockMaximo: number
    requiereRefrigeracion: boolean,
    rubro?: Rubro
}


interface Rubro {
    _id: string,
    nombre: string
}
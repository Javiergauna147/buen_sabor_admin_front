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


export interface createInsumoPayload {
    nombre: string,
    denominacion: string,
    descripcion: string,
    marca: string,
    stock: number,
    stockMinimo: number,
    stockMaximo: number
    requiereRefrigeracion: boolean,
    rubro: string | undefined
}

interface Rubro {
    _id: string,
    nombre: string
}
export interface GetAllAdministratorResponse {
    _id: string,
    cliente: {_id: string, email: string},
    estado: {_id: string, nombre: string},
    productos: {cantidad: number, producto: {_id: string, nombre: string}}[],
    precio: number
}
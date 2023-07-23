export interface UsuarioResponse {
    ok: boolean,
    usuario: Usuario,
    token: string
}

export interface Usuario {
    _id: string,
    nombre: string,
    apellid: string,
    email: string,
    telefono: string,
    rol: string,
    domicilios: Domicilio[]
}

export interface Domicilio {
    calle: string,
    numero: number,
    localidad: string
}

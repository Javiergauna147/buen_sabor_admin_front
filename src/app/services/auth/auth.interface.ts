export interface UsuarioResponse {
    ok: boolean,
    usuario: Usuario,
    token: string
}

export interface Usuario {
    _id?: string,
    email: string,
    password?: string,
    rol?: string,
}

export interface Domicilio {
    calle: string,
    numero: number,
    localidad: string
}

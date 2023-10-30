import { Insumo } from "src/app/services/insumos/insumos.interface";

export interface InsumoTabla {
    insumo: Insumo | undefined,
    cantidad: number
}
import { IAppConfig } from "../../Contexts";

export interface ICalcularParams {
    tempoHora?: number;
    tempoMin?: number;
    peso: number;
    lucroPercentual: number;
    valorAdicional?: number;
    quantidade: number;
}

interface IParams {
    config: IAppConfig;
    data: ICalcularParams;
}

export interface ICalcularResult {
    custoTempo: number;
    custoMaterial: number;
    custoBase: number;
    valorFinal: number;
    valorPorcentagem: number;
    precoUnidade: number;
}

export const calcularPreco3d = ({ data, config }: IParams): ICalcularResult => {

    let custoTempo = 0;
    if (!!data.tempoMin && data.tempoMin > 0)
        custoTempo = data.tempoMin * config.custoMinuto;

    if (!!data.tempoHora && data.tempoHora > 0)
        custoTempo += (data.tempoHora * 60) * config.custoMinuto;

    let custoMaterial = 0;
    if (!!data.peso && data.peso > 0)
        custoMaterial = data.peso * (config.custoKG / 1000);

    const custoBase = custoTempo + custoMaterial;

    let valorFinal = custoBase;
    let valorPorcentagem = 0;

    if (!!data.lucroPercentual && data.lucroPercentual > 0) {

        valorPorcentagem = custoBase * (data.lucroPercentual / 100)

        valorFinal =
            custoBase +
            valorPorcentagem +
            (data.valorAdicional ?? 0);
    }

    let precoUnidade = valorFinal;

    if (!!data.quantidade && data.quantidade > 0)
        precoUnidade = valorFinal / data.quantidade;

    return {
        custoBase,
        valorFinal,
        precoUnidade,
        custoMaterial,
        custoTempo,
        valorPorcentagem,
    };
}
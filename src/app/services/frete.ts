import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface OpcaoFrete {
  regiao: string;
  prazo: string;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class FreteService {

  constructor() {}

  calcularFrete(cep: string): Observable<OpcaoFrete | null> {
    const cepLimpo = cep.replace('-', '');
    if (!/^\d{8}$/.test(cepLimpo)) {
      return of(null);
    }

    const prefixo = cepLimpo.substring(0, 2);
    let opcao: OpcaoFrete | null = null;

    if (['30','31','32','33','34'].includes(prefixo)) {
      opcao = { regiao: 'Sudeste (MG)', prazo: '2 dias úteis', valor: 15 };
    } else if (['01','02','03','04','05'].includes(prefixo)) {
      opcao = { regiao: 'Sudeste (SP)', prazo: '3 dias úteis', valor: 20 };
    } else if (['20','21','22','23','24'].includes(prefixo)) {
      opcao = { regiao: 'Sudeste (RJ)', prazo: '3 dias úteis', valor: 22 };
    } else if (['80','81','82','83'].includes(prefixo)) {
      opcao = { regiao: 'Sul', prazo: '4 dias úteis', valor: 30 };
    } else if (['70','71','72','73'].includes(prefixo)) {
      opcao = { regiao: 'Centro-Oeste', prazo: '5 dias úteis', valor: 35 };
    } else if (['60','61','62','63'].includes(prefixo)) {
      opcao = { regiao: 'Norte', prazo: '7 dias úteis', valor: 40 };
    } else if (['40','41','42','43','44'].includes(prefixo)) {
      opcao = { regiao: 'Nordeste', prazo: '6 dias úteis', valor: 38 };
    } else {
      opcao = { regiao: 'Brasil', prazo: '8 dias úteis', valor: 45 };
    }

    return of(opcao);
  }
}


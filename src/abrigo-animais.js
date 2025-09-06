// Dados dos animais no abrigo.
const ANIMAIS_DATA = {
  Rex:    { tipo: "cão",    brinquedos: ["RATO", "BOLA"] },
  Mimi:   { tipo: "gato",   brinquedos: ["BOLA", "LASER"] },
  Fofo:   { tipo: "gato",   brinquedos: ["BOLA", "RATO", "LASER"] },
  Zero:   { tipo: "gato",   brinquedos: ["RATO", "BOLA"] },
  Bola:   { tipo: "cão",    brinquedos: ["CAIXA", "NOVELO"] },
  Bebe:   { tipo: "cão",    brinquedos: ["LASER", "RATO", "BOLA"] },
  Loco:   { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
};

const BRINQUEDOS_VALIDOS = new Set([
    "RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"
]);
const NOMES_ANIMAIS_VALIDOS = new Set(Object.keys(ANIMAIS_DATA));

// Auxiliares de validação

// REGRA 1 e 2: Verifica a ordem dos brinquedos.
function checaOrdemBrinquedos(brinquedosPessoa, brinquedosAnimal) {
  let ultimoIndex = -1;
  for (const brinquedo of brinquedosAnimal) {
    const indexAtual = brinquedosPessoa.indexOf(brinquedo, ultimoIndex + 1);
    if (indexAtual === -1) {
      return false;
    }
    ultimoIndex = indexAtual;
  }
  return true;
}

// REGRA 6: Verifica os brinquedos do Loco.
function checaBrinquedosLoco(brinquedosPessoa, brinquedosLoco) {
    return brinquedosLoco.every(brinquedo => brinquedosPessoa.includes(brinquedo));
}

// Classe principal.
class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Processa as entradas.
    const animaisConsiderados = ordemAnimais.split(',');
    const brinquedosP1 = brinquedosPessoa1.split(',');
    const brinquedosP2 = brinquedosPessoa2.split(',');

    // Validação de animais.
    const temAnimalInvalido = animaisConsiderados.some(a => !NOMES_ANIMAIS_VALIDOS.has(a));
    const temAnimalDuplicado = new Set(animaisConsiderados).size !== animaisConsiderados.length;
    if (temAnimalInvalido || temAnimalDuplicado) {
        return { erro: "Animal inválido" };
    }

    // Validação de brinquedos.
    const temBrinquedoInvalido = [...brinquedosP1, ...brinquedosP2].some(b => !BRINQUEDOS_VALIDOS.has(b));
    const temBrinquedoDuplicado = new Set(brinquedosP1).size !== brinquedosP1.length || new Set(brinquedosP2).size !== brinquedosP2.length;
    if (temBrinquedoInvalido || temBrinquedoDuplicado) {
        return { erro: "Brinquedo inválido" };
    }

    // Salvar os animais adotados por cada pessoa.
    const adotadosP1 = [];
    const adotadosP2 = [];
    const resultados = {};

    for (const nomeAnimal of animaisConsiderados) {
      const animalData = ANIMAIS_DATA[nomeAnimal];
      
      // REGRA 5: Verifica se a pessoa já atingiu o limite de 3 animais.
      let p1PodeAdotar = adotadosP1.length < 3;
      let p2PodeAdotar = adotadosP2.length < 3;

      // Regra para cada tipo de animal.
      if (animalData.tipo === 'jabuti') {
        if (p1PodeAdotar) p1PodeAdotar = checaBrinquedosLoco(brinquedosP1, animalData.brinquedos);
        if (p2PodeAdotar) p2PodeAdotar = checaBrinquedosLoco(brinquedosP2, animalData.brinquedos);
      } else { // cão ou gato
        if (p1PodeAdotar) p1PodeAdotar = checaOrdemBrinquedos(brinquedosP1, animalData.brinquedos);
        if (p2PodeAdotar) p2PodeAdotar = checaOrdemBrinquedos(brinquedosP2, animalData.brinquedos);
      }
      
      // REGRA 4: Destino animais.
      if (p1PodeAdotar && p2PodeAdotar) {
        resultados[nomeAnimal] = `${nomeAnimal} - abrigo`;
      } else if (p1PodeAdotar) {
        resultados[nomeAnimal] = `${nomeAnimal} - pessoa 1`;
        adotadosP1.push(nomeAnimal);
      } else if (p2PodeAdotar) {
        resultados[nomeAnimal] = `${nomeAnimal} - pessoa 2`;
        adotadosP2.push(nomeAnimal);
      } else {
        resultados[nomeAnimal] = `${nomeAnimal} - abrigo`;
      }
    }

    // REGRA 6.2: Validação final do Loco. (Companhia)
    if (animaisConsiderados.includes('Loco') && resultados['Loco'].includes('pessoa')) {
        const adotanteDoLoco = resultados['Loco'].includes('pessoa 1') ? adotadosP1 : adotadosP2;
        if (adotanteDoLoco.length <= 1) { // Se o adotante só tem o Loco.
            const index = adotanteDoLoco.indexOf('Loco');
            if (index > -1) {
                adotanteDoLoco.splice(index, 1);
            }
            resultados['Loco'] = 'Loco - abrigo';
        }
    }

    // Formata a saída final.
    const listaFinal = animaisConsiderados.map(nome => resultados[nome]).sort();
    return { lista: listaFinal };
  }
}


// MANTER ESSA LINHA INTACTA
export { AbrigoAnimais as AbrigoAnimais };
# Desafio Técnico: Abrigo de Animais

> Solução em JavaScript para um desafio de lógica de negócios, focado em algoritmos, manipulação de dados e desenvolvimento orientado a testes (TDD).

Este repositório contém a minha solução para um desafio técnico proposto, que envolve a criação de um sistema para determinar a adoção de animais de um abrigo com base em um conjunto complexo de regras.

---

### 🎯 O Desafio

O objetivo era implementar a lógica na classe `AbrigoAnimais`, dentro do método `encontraPessoas`. A função deveria processar as listas de brinquedos de duas pessoas candidatas e uma lista de animais a serem considerados, retornando o destino final de cada animal (pessoa 1, pessoa 2, ou abrigo) com base em 6 regras de negócio principais:

1.  **Ordem dos Brinquedos:** Um adotante precisa ter os brinquedos favoritos do animal na ordem correta.
2.  **Brinquedos Intercalados:** A presença de outros brinquedos na lista do adotante é permitida, desde que a ordem seja mantida.
3.  **Ciúmes dos Gatos:** Gatos não "dividem" seus brinquedos (regra interpretada a partir dos testes).
4.  **Empate:** Se ambas as pessoas podem adotar um animal, ele permanece no abrigo.
5.  **Limite de Adoção:** Uma pessoa não pode adotar mais de três animais.
6.  **Regra do "Loco":** O jabuti Loco não se importa com a ordem dos brinquedos, mas precisa ser adotado junto com outro animal pela mesma pessoa.

Além disso, a solução deveria incluir validação de entradas (animais e brinquedos duplicados/inválidos) e retornar a lista de resultados em ordem alfabética.

---

### 🛠️ Minha Abordagem e Solução

Para resolver o desafio, estruturei o código de forma modular e clara, focando em funções puras e um fluxo de estado bem definido.

-   **Estrutura de Dados:** Centralizei as informações dos animais em um objeto `ANIMAIS_DATA` para fácil acesso e usei `Set`s para validações de brinquedos e nomes de animais, otimizando a performance.
-   **Funções Auxiliares:** Isolei cada regra de negócio complexa em sua própria função (`checaOrdemBrinquedos`, `checaBrinquedosLoco`), mantendo o método principal `encontraPessoas` limpo e legível.
-   **Validação de Entradas:** Implementei verificações no início da função para garantir a integridade dos dados e retornar os erros solicitados imediatamente.
-   **Lógica de Adoção Sequencial:** O núcleo da solução é um loop que processa os animais na ordem de chegada. Ele mantém o "estado" das adoções (quantos animais cada pessoa já tem) e usa esse estado para tomar decisões sobre os animais seguintes, garantindo que regras como o limite de 3 adoções sejam respeitadas corretamente.
-   **Desenvolvimento Orientado a Testes (TDD):** Utilizei o conjunto de testes fornecido com Jest como guia principal para interpretar as regras de negócio (especialmente a ambígua "regra dos gatos") e validar a implementação a cada passo.

---

### 🚀 Instalando e Validando a Solução

Este projeto utiliza Node.js e Jest para validação.

**1. Pré-requisitos**
-   [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
-   npm (geralmente instalado com o Node.js)

**2. Baixando o Código**
Primeiro, clone este repositório para a sua máquina local:
```bash
git clone https://github.com/BenitesG/desafio-BenitesG-2025.git
cd desafio-BenitesG-2025
```

**3. Instalação das Dependências**
Com o código baixado, navegue até a pasta do projeto e instale as dependências necessárias:

```bash
npm install
```

**4. Executando os Testes**
A solução é considerada correta e validada quando todos os testes no arquivo src/abrigo-animais.test.js passam com sucesso.
```bash
npm test
```
A solução está correta quando todos os testes fornecidos no arquivo src/abrigo-animais.test.js passarem pelos testes com sucesso.

### 💻 Tecnologias Utilizadas

-   **Linguagem:** JavaScript (ES6+)
-   **Ambiente de Execução:** Node.js
-   **Framework de Testes:** Jest

# Scrapping Filmes Vencedores do Oscar 2010 - 2024

Este projeto é um robô automatizado que captura informações de filmes vencedores do Oscar no período de 2010 a 2024. Ele usa o Selenium WebDriver para navegar pela web, Javascript para a manipulação dos dados e o PostgreSQL para armazenar os dados capturados. As informações armazenadas incluem o nome do filme, o ano de lançamento, a quantidade de prêmios ganhos, e a quantidade de indicações.

## Funcionalidades

- Captura automática de filmes vencedores do Oscar entre os anos de 2010 a 2024.
- Armazena os dados em um banco de dados PostgreSQL.
- As informações capturadas incluem: nome do filme, ano, número de prêmios e indicações.

## Tecnologias Utilizadas

- Node.js: Para executar o código JavaScript no servidor.
- Selenium WebDriver: Para automatizar a navegação e captura de dados.
- PostgreSQL: Para armazenamento dos dados capturados.
- dotenv: Para configuração segura de variáveis de ambiente.

## Dependências do projeto

- Selenium WebDriver: Para navegar automaticamente no site e capturar as informações.
- pg: Para realizar operações com o banco de dados PostgreSQL.
- dotenv: Para carregar variáveis de ambiente sensíveis, como credenciais do banco de dados.

## Passo a passo clonagem e instalação de dependências

Siga as instruções abaixo na devida ordem:

git clone https://github.com/claussen100/Node_Selenium.git

cd Node_Selenium

npm install

npm install selenium-webdriver pg dotenv

## Criando e configurando seu banco de dados

-- Table: public.award_winning_films



-- DROP TABLE IF EXISTS public.award_winning_films;


CREATE TABLE IF NOT EXISTS public.award_winning_films

(
    id serial PRIMARY KEY,
    film text NOT NULL,
    year integer NOT NULL,
    awards integer NOT NULL,
    nominations integer NOT NULL
);


## Criando o arquivo .env

Agora, crie um arquivo chamado ".env" na raiz de seu projeto e insira os dados abaixo no arquivo, substituindo os valores de exemplo, pelos dados do seu banco.

DB_USER=seu_usuario

DB_PASSWORD=sua_senha

DB_DATABASE=nome_do_banco

DB_HOST=localhost

DB_PORT=5432


## Finalizando

Este é um projeto simples, desenvolvido como um treinamento para dar os primeiros passos no mundo do Scrapping e da manipulação destes dados, para um banco de dados.

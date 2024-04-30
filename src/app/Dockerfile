# Utiliza a imagem oficial do Node.js versão 18 com Alpine Linux, que é leve e adequada para muitos projetos
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /src/app/api

# Copia os arquivos de definição de dependências primeiro (para aproveitar o cache do Docker se não houver mudanças nas dependências)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o resto do código-fonte do projeto para o diretório de trabalho
COPY . .

# Copia o arquivo .env para o container (supondo que o .env esteja na raiz do projeto, ajuste o caminho conforme necessário)
COPY .env ./

# Expõe a porta 3000 para permitir o acesso externo à aplicação
EXPOSE 3307

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]

1.  Inicie o projeto -mkdir fastify-api
cd fastify-api
npm init -y

✅ 2. Instale as dependências

npm install fastify
npm install -D typescript tsx @types/node

✅ 3. Configure o TypeScript

npx tsc --init
npm install -D @types/node
npm install tsx

8. Rodando o servidor

npx tsx src/server.ts

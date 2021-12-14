# Projeto-Literacritico

Usuário de Exemplos = 
  Critico (Administrador)

    Email: Rubens@123
    Senha: 1234
    
  Usuário padrão:

    Email: batman@forever
    Senha: EuSouBatman

  Outros exemplos de usuários e dados iniciais estão no arquivo: /literacritico-back/helpers/primeirosRegistros.js
  Eu fiz algumas operações um pouco diferente das especificações do projeto, um usuário não logado não tem acesso aos posts, apenas as páginas estáticas. Ao criar um conta ele é definido para ser usuário padrão, onde tem acessos às postagens e livros. Aas operações de escluir,editar e criar estão restritas ao Criticos, um conta de Critico só pode ser criado por um Critico. Se isso for um problema posso retirar.

  Sobre o banco:
    Existem três entidades: 
   - User 
  - Book
  - Review
    
    Review liga com Book e User e ambas tem tem um campo array de review, onde é feito um push no hora de adicionar uma nova review.
    
    É possivel listar as reviews referente a algum livro na pagina "Livros", 
    pretendo fazer isso com Usuários tambem.

Observações:
  - Para Rodar o projeto é necessatio entrar em ambas as pastas (literacritico-front e literacritico-back), abrir um terminal em cada uma e instalar as dependencias com "npm install" nas duas pastas, para rodar: no front usar "npm start" e no back usar "docker-compose up"
  - Eu não entendo 100% ainda essa tecnologia do Docker, então se o "docker-compose up" não funcionar, utilize o "npm start" na pasta do back
  - Se for alterar alguma porta precisar chegar ambos arquivos .env
  - Na barra sidebar da página Home esta duplicado, pretendo corrigir isso se tiver uma fase de "Recuperação", assim como pretendo melhorar o visual
  - O formulário de contato envia o email para o valor passado no campo "Email" para facilitar nos testes
  

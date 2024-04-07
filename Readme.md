# BookWise

## Sistema de Gerenciamento de Biblioteca Escolar

Desenvolvimento de um sistema de gerenciamento de biblioteca escolar para registro, busca e controle de livros e alunos, promovendo eficiência e organização

### Casos de Uso:
- [ ] Registrar Novo Livro
- [ ] Atualizar Informações do Livro
- [ ] Excluir Livro do Sistema
- [ ] Buscar Livro por Título, Autor ou ISBN
- [ ] Verificar Disponibilidade de Livro
- [ ] Registrar Novo Aluno
- [ ] Atualizar Informações do Aluno
- [ ] Excluir Aluno do Sistema
- [ ] Registrar Empréstimo de Livro
- [ ] Registrar Devolução de Livro
- [ ] Adicionar Aluno à Black List
- [ ] Buscar Alunos na Black List
- [ ] Buscar emprestimos pendententes

### Requisitos Funcionais:
- [x] Registrar Novo Livro
    - [x] O Usuario deve fornecer informações como título, autor, ISBN, gênero e quantidade
- [ ] Buscar Livros por Título, Autor ou ISBN
    - [ ] O Usuário pode buscar livros por título, autor ou ISBN
    - [ ] O Usuário deve visualizar detalhes de cada livro, como disponibilidade e quantidade
- [ ] Registrar Novo Aluno
    - [ ] O Usuário devem fornecer informações como nome, matricula, turma
    - [ ] A Matricula deve ser única
- [ ] Atualizar Informações do Aluno
    - [ ] O usuário deve fornecer a matricula do aluno e as informações atualizadas
    - [ ] Não deve atualizar a matricula do aluno
    - [ ] Não deve atualizar aluno que não existe no sistema
- [ ] Excluir Aluno do Sistema
    - [ ] O Usuario deve fornecer a matricula do aluno a ser excluído
    - [ ] Não deve excluir alunos que possuem livros emprestados
- [ ] Registrar Empréstimo de Livro
    - [ ] O usuario deve fornecer o ID do aluno e o ID do livro emprestado
    - [ ] Não deve emprestar livros que não estão disponíveis
    - [ ] Não deve emprestar livros para alunos que já tem livro emprestado
    - [ ] Não deve emprestar livros para alunos que estão na black list com data de validade ativa
    - [ ] Não deve emprestar livros para alunos que estiveram 5 vezes na black list
    - [ ] Deve registrar a data de empréstimo
    - [ ] Deve registrar a data que o livro deve ser devolvido, após 7 dias
- [ ] Registrar Devolução de Livro
    - [ ] Deve registrar a data de devolução do livro
    - [ ] Deve adicionar aluno a lista de alunos que devolveram livros atrasados (black list)
- [ ] Adicionar Aluno à Black List
    - [ ] Sistema deve adicionar alunos que devolveram livros atrasados à black list no ato da devolução
    - [ ] Deve registrar a data de inclusão na black list
    - [ ] Deve registrar o id do empresimo que originou a inclusão na black list
    - [ ] Deve informar a data de validade da inclusão na black list (14 dias)
- [ ] Buscar Alunos na Black List
    - [ ] O sistema deve retornar uma lista de alunos que estão na black list com data de validade ativa
    - [ ] Os usuários podem visualizar detalhes de cada aluno, como data de inclusão e data de validade e informação do emprestimo que originou a inclusão
- [ ] Buscar emprestimos pendententes
    - [ ] Os bibliotecários podem visualizar detalhes de cada emprestimo, como data de emprestimo e data de devolução, aluno e livro emprestado
- [ ] Verificar Disponibilidade de Livro
    - [ ] Usuario deve informar id do livro
    - [ ] Sistema deve retornar a quantidade disponível do livro

### Requisitos Não Funcionais:
- **Segurança**: O acesso ao sistema deve ser protegido por autenticação, garantindo que apenas bibliotecários autorizados possam realizar operações de modificação e exclusão.
- **Usabilidade**: A interface do usuário deve ser intuitiva e fácil de usar, mesmo para usuários sem experiência técnica.
- **Compatibilidade**: O sistema deve ser compatível com diferentes dispositivos e navegadores, garantindo uma experiência consistente para todos os usuários.
- **Manutenibilidade**: O código do sistema deve ser bem estruturado e documentado, facilitando futuras atualizações e manutenções.
- **Escalabilidade**: O sistema deve ser projetado para ser escalável, permitindo que ele cresça conforme a demanda sem comprometer o desempenho.

### Reposiotry
- [ ] BookRespository
    - [ ] save(Book) => void
- [ ] StudentRepository
- [ ] UserRepository

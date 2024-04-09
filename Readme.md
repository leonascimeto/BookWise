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
- [ ] Buscar emprestimos pendententes

### Requisitos Funcionais:
- [x] Registrar Novo Livro
    - [x] O Usuario deve fornecer informações como título, autor, ISBN, gênero e quantidade
    - [x] O ISBN deve ser único
- [x] Buscar Livros por Título, Autor ou ISBN
    - [x] O Usuário pode buscar livros por título, autor ou ISBN
- [x] Registrar Novo Aluno
    - [x] O Usuário devem fornecer informações como nome, matricula
    - [x] A Matricula deve ser única
- [x] Registrar Empréstimo de Livro
    - [x] O usuario deve fornecer o ID do aluno e o ID do livro emprestado
    - [x] Não deve emprestar livros que não estão disponíveis
    - [x] Não deve emprestar livros para alunos que já tem livro emprestado
    - [x] Não deve emprestar livros para alunos que estão na black list com data de validade ativa
    - [x] Não deve emprestar livros para alunos que estiveram 5 vezes na black list
    - [x] Deve registrar a data de empréstimo
    - [x] Deve registrar a data que o livro deve ser devolvido, após 7 dias
- [x] Registrar Devolução de Livro
    - [x] Deve registrar a data de devolução do livro
    - [x] Deve adicionar aluno a ban list por 14 dias caso o livro seja devolvido após a data de devolução
- [x] Buscar emprestimos pendententes
    - [x] Os bibliotecários podem visualizar detalhes de cada emprestimo, como data de emprestimo e data de devolução, aluno e livro emprestado

### Requisitos Não Funcionais:
- **Segurança**: O acesso ao sistema deve ser protegido por autenticação, garantindo que apenas bibliotecários autorizados possam realizar operações de modificação e exclusão.
- **Usabilidade**: A interface do usuário deve ser intuitiva e fácil de usar, mesmo para usuários sem experiência técnica.
- **Compatibilidade**: O sistema deve ser compatível com diferentes dispositivos e navegadores, garantindo uma experiência consistente para todos os usuários.
- **Manutenibilidade**: O código do sistema deve ser bem estruturado e documentado, facilitando futuras atualizações e manutenções.
- **Escalabilidade**: O sistema deve ser projetado para ser escalável, permitindo que ele cresça conforme a demanda sem comprometer o desempenho.

### Reposiotry
- [ ] BookRespository
    - [ ] save(Book) => void
    - [ ] findById(id: String) => Book
    - [ ] search(value: String) => Book[]
    - [ ] existsISBN(isbn: String) => boolean
- [ ] StudentRepository
    - [ ] save(Student) => void
    - [ ] findById(id: String) => Student
    - [ ] matriculaExists(matricula: String) => boolean
- [ ] BanListRepository
    - [ ] save(BanList) => void
    - [ ] findById(id: String) => BanList
    - [ ] findByStudent(studentId: Student) => BanList
    - [ ] existsLend(lendId: string) => boolean

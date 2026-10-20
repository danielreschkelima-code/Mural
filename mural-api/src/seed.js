const db = require('./database.js');
 
// Modelos usados para gerar a carga inicial: [título, tipo, descrição]
const modelos = [
  ['Estágio em Desenvolvimento Web', 'estagio',
    'Apoio no desenvolvimento de sistemas com HTML, CSS e JavaScript.'],
  ['Estágio em Suporte Técnico', 'estagio',
    'Atendimento a usuários e manutenção de computadores.'],
  ['Estágio em Banco de Dados', 'estagio',
    'Criação de consultas SQL e apoio na modelagem de dados.'],
  ['Estágio em Testes de Software', 'estagio',
    'Execução de testes manuais e registro de defeitos.'],
  ['Estágio em Redes de Computadores', 'estagio',
    'Apoio na configuração e monitoramento da rede interna.'],
  ['Estágio em Design de Interfaces', 'estagio',
    'Criação de protótipos de telas no Figma.'],
  ['Estágio em Desenvolvimento Mobile', 'estagio',
    'Apoio no desenvolvimento de aplicativos Android.'],
  ['Estágio em Análise de Dados', 'estagio',
    'Organização de planilhas e criação de painéis.'],
  ['Curso de Python para Iniciantes', 'curso',
    'Lógica de programação com Python, do zero.'],
  ['Curso de Git e GitHub', 'curso',
    'Controle de versão na prática, com projetos em equipe.'],
  ['Curso de React', 'curso',
    'Componentes, estado e consumo de APIs com React.'],
  ['Curso de SQL Essencial', 'curso',
    'Consultas, filtros, junções e agrupamentos.'],
  ['Curso de Inglês Técnico para TI', 'curso',
    'Leitura de documentação e vocabulário da área.'],
  ['Curso de Lógica de Programação', 'curso',
    'Algoritmos, variáveis, condições e laços.'],
  ['Curso de Excel Avançado', 'curso',
    'Fórmulas, tabelas dinâmicas e gráficos.'],
  ['Curso de Segurança da Informação', 'curso',
    'Boas práticas de senhas, backups e privacidade.'],
  ['Semana Acadêmica de Informática', 'evento',
    'Palestras, oficinas e apresentação de projetos.'],
  ['Hackathon de Soluções Urbanas', 'evento',
    '24 horas para criar soluções para a cidade.'],
  ['Feira de Estágios e Empregos', 'evento',
    'Empresas da região apresentando vagas.'],
  ['Oficina de Currículo e Entrevista', 'evento',
    'Dicas práticas para processos seletivos.'],
  ['Palestra: Carreira em Tecnologia', 'evento',
    'Profissionais contam suas trajetórias na área.'],
  ['Mostra de Projetos Integradores', 'evento',
    'Apresentação dos projetos das turmas.'],
  ['Maratona de Programação', 'evento',
    'Competição de resolução de problemas em equipe.'],
  ['Encontro de Mulheres na Computação', 'evento',
    'Debates e rodas de conversa sobre a área.']
];
 
const instituicoes = [
  'TechSul Sistemas', 'Agência Pampa Digital', 'Cooperativa Vale Verde',
  'Instituto Aprender Mais', 'Prefeitura Municipal', 'Rede Escola Aberta',
  'Clube de Programação Restinga', 'Startup Rota Certa'
];
 
const modalidades = ['presencial', 'online', 'hibrido'];
 
// Converte uma data para o formato AAAA-MM-DD usando o horário local
function formatarData(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
 
// Prazo relativo a hoje: valores negativos geram oportunidades já encerradas
function prazoDaqui(dias) {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  return formatarData(data);
}
 
const inserir = db.prepare(`
  INSERT INTO oportunidades (titulo, tipo, instituicao, modalidade, prazo, link, descricao)
  VALUES (@titulo, @tipo, @instituicao, @modalidade, @prazo, @link, @descricao)
`);
 
const popular = db.transaction(() => {
  db.exec('DELETE FROM oportunidades');
  db.exec("DELETE FROM sqlite_sequence WHERE name = 'oportunidades'");
 
  for (let i = 0; i < 60; i++) {
    const [titulo, tipo, descricao] = modelos[i % modelos.length];
    inserir.run({
      titulo,
      tipo,
      descricao,
      instituicao: instituicoes[i % instituicoes.length],
      modalidade: modalidades[i % modalidades.length],
      prazo: prazoDaqui(((i * 37) % 120) - 30),
      link: i % 4 === 0 ? null : `https://exemplo.com/inscricao/${i + 1}`
    });
  }
});
 
popular();
 
const { total } = db.prepare('SELECT COUNT(*) AS total FROM oportunidades').get();
console.log(`Carga inicial concluída: ${total} oportunidades cadastradas.`);
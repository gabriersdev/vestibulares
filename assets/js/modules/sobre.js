const apresentarDadosProjeto = (dados_do_projeto, novas_funcionalidades) => {
  // Exibindo dados
  console.groupCollapsed(`${dados_do_projeto['Project name'] ?? 'Projeto'}, Version ${dados_do_projeto.Version ?? '-'}`);
  console.table(dados_do_projeto);
  console.groupEnd();

  console.groupCollapsed('New features');
  novas_funcionalidades.toSorted((a, b) => a.localeCompare(b)).forEach((feature) => { console.info(`${feature}`); });
  console.groupEnd();
  // Fim da apresentação do projeto
};

// Apresentação do Projeto no console
let dados_do_projeto = {
  Hostname: new URL(window.location).hostname,
  Origin: new URL(window.location).origin,
  Status: 'Active',
};

const novas_funcionalidades = [
  '# Início do projeto!',
  'Adicionado busca de vestibulares por tipo ou localidade',
  'Adicionamos busca por nome do vestibular',
  'Implementado ferramenta de inscrição (apenas teste)',
  'Incluimos função para criar link de lembrete no Google Calendar',
];

// Carregando dados do arquivo de manifest.json
export default async () => {
  // Import manifest.json no diretório raiz do projeto
  await fetch('manifest.json')
  .then((response) => response.json())
  .then((manifest) => {
    const dados_manifest = {
      'Project name': manifest.name,
      Developer: manifest.developer,
      Version: manifest.version,
      'Release Date': manifest.release_date,
    };
    dados_do_projeto = ({ ...dados_manifest, ...dados_do_projeto });

    Object.freeze(novas_funcionalidades);
    Object.freeze(dados_do_projeto);

    apresentarDadosProjeto(dados_do_projeto, novas_funcionalidades);
    return true;
  })
  .catch((error) => {
    console.info('Não foi possível carregar o arquivo de manifest.json.');
    console.error(error);
    return false;
  });
};

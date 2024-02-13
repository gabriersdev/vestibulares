const action = () => {
  console.log('Ação...');
};

const createLinkGoogleCalendar = (data) => {
  const calendarProps = {
    initDate: moment(data['subscription-start']).format('YYYYMMDD') || moment().format('YYYYMMDD'),
    // Adição de 1 dia necessária para o Google Calendar interpretar a data corretamente
    finishDate: moment(data['subscription-end']).add(1, 'days').format('YYYYMMDD') || moment().format('YYYYMMDD'),
    text: `Inscrição para Vestibular da ${data.name} - ${data['short-name']}`,
    details: `Vestibular da ${data.name}`,
    // TODO - Implementar localização da faculdade via CEP (?)
    location: 'Belo Horizonte - MG',
  };

  return encodeURI(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${calendarProps.initDate}/${calendarProps.finishDate}&details=${calendarProps.details}&location=${calendarProps.location}&text=${calendarProps.text}`);
};

const searchElementExibition = (event) => {
  let searched = event.target.value.trim().toLowerCase();
  const area = document.querySelector('.results-search-element-exibition');

  if (area !== undefined) {
    return null;
  }

  const universities = [
    'Universidade Federal de Tocantins',
    'Universidade Federal de Alagoas',
    'Universidade Federal da Bahia',
    'Universidade Federal de Campina Grande',
    'Universidade Federal do Ceará',
    'Universidade Federal do Espírito Santo',
    'Universidade Federal de Goiás',
    'Universidade Federal Fluminense',
    'Universidade Federal de Juiz de Fora',
    'Universidade Federal de Minas Gerais',
    'Universidade Federal do Pará',
    'Universidade Federal da Paraíba',
    'Universidade Federal do Paraná',
    'Universidade Federal de Pernambuco',
    'Universidade Federal do Rio Grande do Norte',
    'Universidade Federal do Rio Grande do Sul',
    'Universidade Federal do Rio de Janeiro',
    'Universidade Federal de Santa Catarina',
    'Universidade Federal de Santa Maria',
    'Universidade Federal Rural de Pernambuco',
    'Universidade Federal Rural do Rio de Janeiro',
    'Universidade Federal de Roraima',
    'Universidade Federal de São Paulo',
    'Universidade Federal de Lavras',
    'Universidade Federal de Rondônia',
    'Universidade do Rio de Janeiro',
    'Universidade Amazonas',
    'Universidade Brasília',
    'Universidade Maranhão',
    'Universidade Rio Grande',
    'Universidade Federal de Uberlândia',
    'Universidade Federal Acre',
    'Universidade Federal Mato Grosso',
    'Universidade Federal Ouro Preto',
    'Universidade Federal Pelotas',
    'Universidade Federal Piauí',
    'Universidade Federal São Carlos',
    'Universidade Federal Sergipe',
    'Universidade Federal Viçosa',
    'Universidade Federal Mato Grosso do Sul',
    'Universidade Federal Amapá',
  ];

  const replaceAccents = [
    {
      org: 'ç',
      rep: 'c',
    },
    {
      org: 'á',
      rep: 'a',
    },
    {
      org: 'à',
      rep: 'a',
    },
    {
      org: 'ã',
      rep: 'a',
    },
    {
      org: 'â',
      rep: 'a',
    },
    {
      org: 'é',
      rep: 'e',
    },
    {
      org: 'è',
      rep: 'e',
    },
    {
      org: 'ê',
      rep: 'e',
    },
    {
      org: 'í',
      rep: 'i',
    },
    {
      org: 'ó',
      rep: 'o',
    },
    {
      org: 'ô',
      rep: 'o',
    },
    {
      org: 'ú',
      rep: 'u',
    },
  ];

  const replaceAccentsOfWord = (word) => {
    let wordSanitezed = word;
    replaceAccents.forEach((replace) => wordSanitezed = wordSanitezed.replaceAll(replace.org, replace.rep));
    return wordSanitezed;
  };

  if (searched && searched.length > 0) {
    searched = replaceAccentsOfWord(searched);

    const consults = universities.filter((university) => replaceAccentsOfWord(university).toLowerCase().substring(0, searched.length) === searched || replaceAccentsOfWord(university).toLowerCase().split(' ').includes(searched) || replaceAccentsOfWord(university).toLowerCase().includes(searched));

    if (consults && consults.length > 0) {
      $(area).find('.list-group').html('');
      // Show
      consults.toSorted((a, b) => a.localeCompare(b)).toSpliced(3).forEach((consult) => {
        $(area).find('.list-group').append(`<a href="#" class="list-group-item list-group-item-action">${consult}</a>`);
        $(area).show(300);
      });
    } else {
      // Hide
      $(area).hide(300);
      $(area).find('.list-group').html('');
    }
  } else {
    // Hide
    $(area).hide(300);
    $(area).find('.list-group').html('');
  }
};

const searchVestibulares = () => {
  // Para pesquisar por tipo e local
  const value = 'tipo:publica local: Belo Horizonte';
  const valueHasLocal = value.match(/local:\s*[\wÀ-ú\s]+/gi);
  const valueHasTipo = value.match(/tipo:\s*(p[u|ú]blica|particular)+/gi);

  if (valueHasLocal) {
    let sanitized = valueHasLocal[0];
    if (sanitized.match(/tipo/gi)) sanitized = sanitized.replace(/tipo/gi, '').trim();
    // console.log(sanitized.replace(/local:/gi, '').trim());
  }

  if (valueHasTipo) {
    let sanitized = valueHasTipo[0];
    if (sanitized.match(/local/gi)) sanitized = sanitized.replace(/local/gi, '').trim();
    // console.log(sanitized.replace(/tipo/gi, '').trim());
  }
};

export default {
  action,
  createLinkGoogleCalendar,
  searchElementExibition,
  searchVestibulares,
};

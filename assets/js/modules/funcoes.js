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
    location: data.local || 'Brasil',
  };

  return encodeURI(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${calendarProps.initDate}/${calendarProps.finishDate}&details=${calendarProps.details}&location=${calendarProps.location}&text=${calendarProps.text}`);
};

const searchElementExibition = (event, database) => {
  const searched = event.target.value.trim().toLowerCase();
  const area = document.querySelector('.results-search-element-exibition');

  if (searched.length > 0 && database.length > 0) {
    // const results = database.filter((item) => item.name.toLowerCase().includes(searched));
    // area.innerHTML = '';
  }
};

const searchVestibulares = (value, database) => {
  // Para pesquisar por tipo e local
  const valueHasLocal = value.toLowerCase().match(/local:\s*[\wÀ-ú\s]+/gi);
  let valueLocalSanitized;

  const valueHasTipo = value.toLowerCase().match(/tipo:\s*(p(u|ú)blica|particular)+/gi);
  let valueTipoSanitized;

  let results = [];

  if (valueHasLocal) {
    let sanitized = valueHasLocal[0];
    if (sanitized.match(/local/gi)) sanitized = sanitized.replace(/local:\s*/gi, '').trim();
    valueLocalSanitized = sanitized;

    try {
      // database.filter((item) => item.local.toLowerCase().match(/\b[\wÀ-ú\s]*\b/gi).filter((m) => m.length > 0).includes(valueLocalSanitized));
    } catch (error) {
      console.info('Um erro ocorreu ao tentar filtrar por localidade. Erro: %s', error);
    }
  }

  if (valueHasTipo) {
    let sanitized = valueHasTipo[0];
    if (sanitized.match(/tipo/gi)) sanitized = sanitized.replace(/tipo:\s*|/gi, '').trim();
    sanitized = sanitized.replace(/tipo/gi, '').trim();
    valueTipoSanitized = sanitized === 'publica' ? 'pública' : 'particular';
    try {
      // database.filter((item) => item.type.toLowerCase().includes(sanitized === 'publica' ? 'pública' : 'particular'));
    } catch (error) {
      console.info('Um erro ocorreu ao tentar filtrar por tipo. Erro: %s', error);
    }
  }

  try {
    if (valueLocalSanitized && valueTipoSanitized) {
      results = results.concat(database.filter((item) => item.local.toLowerCase().match(/\b[\wÀ-ú\s]*\b/gi).filter((m) => m.length > 0).includes(valueLocalSanitized) && item.type.toLowerCase().includes(valueTipoSanitized)));
    } else if (valueLocalSanitized) {
      results = results.concat(database.filter((item) => item.local.toLowerCase().match(/\b[\wÀ-ú\s]*\b/gi).filter((m) => m.length > 0).includes(valueLocalSanitized)));
    } else if (valueTipoSanitized) {
      results = results.concat(database.filter((item) => item.type.toLowerCase().includes(valueTipoSanitized)));
    }
  } catch (error) {
    console.info('Um erro ocorreu ao tentar filtrar. Erro: %s', error);
  }

  return results;
};

const setInfoModalConfirm = (data) => {
  const modal = $('#modal-confirm-redirect');
  $('#modal-search').modal('hide');

  if (modal.length === 1) {
    $(modal).find('.card-body h4.title').text(`Você será direcionado para o site da ${data['short-name'] || 'Faculdade'}`);
    $('#modal-confirm-redirect [data-id]').attr('data-id', data.id);

    if (data['subscription-link'].trim() === '#' || data['subscription-link'].trim() === '') {
      $(modal).find('.actions [data-ref="confirmed"]').attr('disabled', true);
    }

    $(modal).modal('show');
  } else {
    Swal.alert({ title: 'Modal não encontrado', icon: 'error' });
  }
};

export default {
  action,
  createLinkGoogleCalendar,
  searchElementExibition,
  searchVestibulares,
  setInfoModalConfirm,
};

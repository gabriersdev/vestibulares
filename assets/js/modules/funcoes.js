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
    } else {
      results = database.filter((item) => item.name.toLowerCase().trim().substring(0, value.trim().length) === value.toLowerCase().trim() || item.name.toLowerCase().trim().includes(value.toLowerCase().trim()));
    }
  } catch (error) {
    console.info('Um erro ocorreu ao tentar filtrar. Erro: %s', error);
  }

  return results;
};

const setInfoModalConfirm = (data, actionReturn) => {
  const modal = $('#modal-confirm-redirect');
  $('#modal-search').modal('hide');

  if (modal.length === 1) {
    $(modal).find('.card-body h4.title').text(`Você será direcionado para o site da ${data['short-name'] || 'Faculdade'}`);
    $('#modal-confirm-redirect [data-id]').attr('data-id', data.id);

    if (data['subscription-link'].trim() === '#' || data['subscription-link'].trim() === '') {
      $(modal).find('.actions [data-ref="confirmed"]').attr('disabled', true);
    }

    if (actionReturn) {
      $(modal).find('.actions [data-bs-dismiss="modal"]').attr('onclick', actionReturn);
    } else {
      $(modal).find('.actions [data-bs-dismiss="modal"]').removeAttr('onclick');
    }

    $(modal).modal('show');
  } else {
    Swal.alert({ title: 'Modal não encontrado', icon: 'error' });
  }
};

const loadAllExams = ({ card_no_exams, card }, vestibules) => {
  $('.card[aria-hidden="true"]').remove();

  const destaqueCards = $('.cards[data-type-exams="destaque"]');
  const examsDestaque = vestibules.filter((exam) => exam.destaque === true).sort((a, b) => new Date(a['subscription-end']).getTime() - new Date(b['subscription-end']).getTime());

  const todosExamsCards = $('.cards[data-type-exams="todos"]');
  const todosExams = vestibules.sort((examA, examB) => examA.name.localeCompare(examB.name));

  if (destaqueCards.length === 1) {
    $(destaqueCards).find('.card').remove();
    // $(destaqueCards).find('.card[aria-hidden="true"]').remove();
    if (examsDestaque.length > 0) {
      examsDestaque.forEach((exam) => {
        destaqueCards.append(card(exam));
      });
    } else {
      destaqueCards.append(card_no_exams.trim());
    }
  }

  if (todosExamsCards.length >= 1) {
    $(todosExamsCards).find('.card').remove();
    if (examsDestaque.length > 0) {
      // $(todosExamsCards).find('.card[aria-hidden="true"]').remove();
      todosExams.forEach((exam) => {
        todosExamsCards.append(card(exam));
      });
    } else {
      todosExamsCards.append(card_no_exams.trim());
    }
  }
};

export default {
  action,
  createLinkGoogleCalendar,
  searchElementExibition,
  searchVestibulares,
  setInfoModalConfirm,
  loadAllExams,
};

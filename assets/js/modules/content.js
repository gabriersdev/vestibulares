import { capitalize } from './utilitarios.js';

const card_default = `
<div class="card">
  <div class="card-header">
    <span>Faculdade</span>
    <span data-visual-tooltip title="Vestibular em destaque" data-custom-tooltip="tooltip-dark"><i class="bi bi-stars"></i></span>
  </div>
  <div class="card-body">
    <h4 class="card-title">UFMG</h4>
    <div class="characteristics">
      <ul class="characteristics-list">
        <li class="item difficult">
          <span data-visual-tooltip title="Nota de avaliação do MEC" data-custom-tooltip="tooltip-dark">Nota: 4.5</span>
        </li>
        <li class="item data-calendar">
          <span>Inscrições até 27/02</span>
        </li>
      </ul>
      <ul class="characteristics-list">
        <li class="item type-school">
          <span>Pública</span>
        </li>
        <li class="item location">
          <span>Belo Horizonte - MG</span>
        </li>
      </ul>
    </div>
    <div class="characteristics-actions">
      <button type="button" class="btn btn-success">Inscrever</button>
      <button type="button" class="btn btn-dark">Lembrete</button>
    </div>
  </div>
</div>`;

const card = (data) => `
  <div class="card" data-id="${data.id}">
    <div class="card-header">
      <span>Faculdade</span>
      ${data.destaque ? '<span data-visual-tooltip title="Vestibular em destaque" data-custom-tooltip="tooltip-dark"><i class="bi bi-stars"></i></span>' : ''}
    </div>
    <div class="card-body">
      <h4 class="card-title" data-visual-tooltip data-custom-tooltip="tooltip-dark" title="${data.name}">${data.name}</h4>
      <div class="characteristics">
        <ul class="characteristics-list">
          <li class="item difficult">
            <span data-visual-tooltip title="Nota de avaliação do MEC" data-custom-tooltip="tooltip-dark">Nota: ${data['avaliation-mec'] || 'Não definida'}</span>
          </li>
          <li class="item data-calendar">
            <span>Inscrições até ${moment(data['subscription-end']).format('DD/MM')}</span>
          </li>
        </ul>
        <ul class="characteristics-list">
          <li class="item type-school">
            <span>${capitalize(data.type)}</span>
          </li>
          <li class="item location">
            <span>Belo Horizonte - MG</span>
          </li>
        </ul>
      </div>
      <div class="characteristics-actions">
        <button type="button" onclick="subscribeInVestibular(this)" data-id="${data.id}" class="btn btn-success">Inscrever</button>
        <button type="button" onclick="createAlarmSubscription(this)" data-id="${data.id}" class="btn btn-dark">Lembrete</button>
      </div>
    </div>
  </div>`;

const card_no_results = `
<div class="card card-info zero-results">
<div class="card-body">
  <img src="./assets/img/error.png" class="img" alt="">

  <div class="info">
    <h3 class="title">Não localizamos resultados para a sua busca</h3>
    <p class="description">Busque outro termo, localidade ou tipo de instituição</p>
  </div>
</div>
</div>`;

export {
  card_default,
  card,
  card_no_results,
};

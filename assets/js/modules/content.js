import { capitalize } from './utilitarios.js';

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

const card_no_exams = `
<div class="card card-info zero-results">
<div class="card-body">
  <img src="./assets/img/fail.png" class="img" alt="">

  <div class="info">
    <h3 class="title">Não encontramos vestibulares por aqui</h3>
    <p class="description">Quem sabe mais tarde...</p>
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

const card_load = `
<div class="card" aria-hidden="true">
<div class="card-header placeholder-glow">
  <span class="placeholder col-6 mt-1 mb-1"></span>
</div>
<div class="card-body">
  <h3 class="card-title placeholder-glow">
    <span class="placeholder col-10"></span>
  </h3>
  <p class="card-text placeholder-glow">
    <span class="placeholder col-3"></span>
    <span class="placeholder col-5"></span><br>
    <span class="placeholder col-6"></span>
    <span class="placeholder col-3"></span><br>
  </p>
  <p class="card-text placeholder-glow">
    <span class="placeholder col-1"></span>
    <span class="placeholder col-4"></span><br>
    <span class="placeholder col-1"></span>
    <span class="placeholder col-8"></span>
  </p>
  <div class="d-flex" style="gap: 0.4rem">
    <a class="btn btn-success disabled placeholder col-5" aria-disabled="true"></a>
    <a class="btn btn-secondary disabled placeholder col-5" aria-disabled="true"></a>
  </div>
</div>
</div>`;

export {
  card,
  card_default,
  card_no_exams,
  card_no_results,
  card_load,
};

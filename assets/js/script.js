import exibirDadosProjeto from './modules/sobre.js';
import {
  atualizarDatas,
  criarTooltips, popovers, range, tooltips,
} from './modules/utilitarios.js';
import dados from './modules/dados.js';
import fns from './modules/funcoes.js';
import { card, card_default, card_load } from './modules/content.js';

(() => {
  let database;

  document.querySelectorAll('[data-recarrega-pagina]').forEach((botao) => {
    botao.addEventListener('click', () => {
      window.location.reload();
    });
  });

  function atribuirLinks() {
    const linkElementos = document.querySelectorAll('[data-link]');

    linkElementos.forEach((link) => {
      if (link.dataset.link && dados.links.find((e) => e.id === link.dataset.link)) {
        link.setAttribute('href', dados.links.find((e) => e.id === link.dataset.link).link);
        link.setAttribute('rel', 'noopener noreferrer');
      } else {
        console.warn('O link não foi implementado.');
      }

      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  function atribuirAcoes(e) {
    const acoes = {
      acao: fns.action,
      searchElementExibition: fns.searchElementExibition,
    };

    const attribute = (elemento) => {
      if (elemento.dataset.action) {
        switch (elemento.dataset.action) {
          case 'acao':
          $(elemento).on('click', () => {
            acoes.acao();
          });
          break;

          case 'contribute':
          break;

          case 'active-search-vestibulares':
          $(elemento).on('click', (event) => {
            event.preventDefault();
            const modal = $('#modal-search');
            $(modal).modal('show');
            setTimeout(() => {
              $(modal).find('input[type=search]').focus();
            }, 500);
          });
          break;

          case 'search-element-exibition':
          $(elemento).on('input', (event) => {
            acoes.searchElementExibition(event);
          });
          break;

          case 'report-error':
          break;

          default:
          console.log(elemento.dataset.action);
          console.warn('A ação não foi implementada.');
          break;
        }
      }
    };

    if (e) {
      attribute(e);
    } else {
      const elementos = document.querySelectorAll('[data-action]');
      elementos.forEach((elemento) => {
        attribute(elemento);
      });
    }
  }

  window.addEventListener('load', () => {
    $('.overlay').hide();
    exibirDadosProjeto();
  });

  window.addEventListener('DOMContentLoaded', () => {
    const mode = 0; // 0 - Desenvolvimento, 1 - Teste, 3 - Produção
    tooltips();
    popovers();
    atribuirLinks();
    atribuirAcoes();
    criarTooltips();
    atualizarDatas();

    const loadFuncionsPage = () => {
      criarTooltips();
      atualizarDatas();
    };

    // Teste
    const carregarDadosDeTeste = () => {
      const replicateCount = 9;

      range({ max: replicateCount }).forEach(() => {
        $('.cards').append(card_default.trim());
      });

      $('#search-vestibulares').on('input', (event) => {
        const value = $(event.target).val().trim();

        if (value.length === 0) {
          return null;
        }
      });
    };

    if (mode === 1) {
      carregarDadosDeTeste();
      loadFuncionsPage();
    } else {
      // Add. card de carregamento
      $('.cards').append(card_load.trim());

      fetch('/assets/js/modules/database.json')
      .then((response) => response.json())
      .then(({ vestibules }) => {
        database = vestibules;
        $('.cards .card[aria-hidden="true"]').remove();
        vestibules.toSorted((a, b) => a.name.localeCompare(b.name)).forEach((exam) => {
          $('.cards').append(card(exam));
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        loadFuncionsPage();
      });
    }
  });

  window.subscribeInVestibular = (btn) => {
    const modal = $('#modal-confirm-redirect');
    const btnId = btn.dataset.id;
    const cardId = btn.closest('.card').dataset.id;

    if (btn && modal.length === 1 && (btnId === cardId) && ![btnId, cardId].includes(undefined)) {
      const itemDatabase = database[btnId - 1];
      if (itemDatabase) {
        // TODO - Implementar orientação para click nos botões do modal
        $(modal).modal('show');
      } else {
        //
      }
    }
  };

  window.createAlarmSubscription = (btn) => {
    const btnId = btn.dataset.id;
    const cardId = btn.closest('.card').dataset.id;

    if (btn && (btnId === cardId) && ![btnId, cardId].includes(undefined)) {
      const itemDatabase = database[btnId - 1];

      if (itemDatabase) {
        const link = fns.createLinkGoogleCalendar(itemDatabase);
        if (link) window.open(link, '_blank', 'noopener noreferrer');
      }
    }
  };
})();

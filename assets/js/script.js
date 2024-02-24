import exibirDadosProjeto from './modules/sobre.js';
import {
  atualizarDatas,
  criarTooltips, popovers, range, tooltips,
} from './modules/utilitarios.js';
import dados from './modules/dados.js';
import fns from './modules/funcoes.js';
import {
  card, card_default, card_load, card_no_exams, card_no_results,
} from './modules/content.js';

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

          case 'select-exibition':
          $(elemento).on('click', (event) => {
            // Alternar entre os cards de destaque e todos
            if (event.target.dataset.ref === 'destaque' || event.target.dataset.ref === 'todos') {
              const destaqueCards = $('section#elements-exibition .cards[data-type-exams="destaque"]');
              const todosCards = $('section#elements-exibition .cards[data-type-exams="todos"]');

              if (destaqueCards.length === 1 && todosCards.length === 1) {
                $(destaqueCards).toggleClass('none');
                $(todosCards).toggleClass('none');
              }
            }
          });
          break;

          case 'search-element-exibition':
          $(elemento).on('input', (event) => {
            acoes.searchElementExibition(event, database);
          });
          break;

          case 'report-error':
          $(elemento).on('click', () => {
            if (['Informação incorreta', 'Inscrição encerrada', 'Link quebrado', 'Outro'].includes(elemento.dataset.ref)) {
              const [buttonID, cardID] = [elemento.closest('.dropdown').querySelector('button').dataset.id, elemento.closest('.modal-content').dataset.id];

              if (buttonID === cardID && database.find((item) => parseInt(item.id, 10) === parseInt(buttonID, 10))) {
                try {
                  window.open(`mailto:devgabrielribeiro@gmail.com?subject=${elemento.dataset.ref} - Vestibular ${`00000${buttonID}`.slice(-5)}&body=Olá, encontrei um erro no vestibular ${`00000${buttonID}`.slice(-5)} e gostaria de reportar.`, '_blank', 'noopener noreferrer');
                } catch (error) {
                  Swal.fire({ title: 'Um erro ocorreu ao tentar reportar o erro', icon: 'error' });
                }
              }
            }
          });
          break;

          case 'search-vestibulares':
          $(elemento).on('submit', (event) => {
            event.preventDefault();
            const value = event.target.querySelector('input[type=search]').value.trim();
            const area = $('#modal-search .search-elements-exibition .cards');

            if (value) {
              const vestibulares = fns.searchVestibulares(value, database);
              $(area).find('.card:not(.card-info)').remove();
              $(area).find('.card.zero-results').remove();

              if (vestibulares.length > 0) {
                vestibulares.forEach((exam) => {
                  $(area).append(card(exam));
                  // Carregar tooltips
                  criarTooltips();
                  tooltips();
                });
              } else {
                // if ($(area).find(''))
                $(area).append(card_no_results);
              }
            } else {
              // Carregar novamente os conteúdos iniciais
              fns.loadAllExams({ card_no_exams, card }, database);
            }
          });
          break;

          case 'search-ref':
          $(elemento).on('click', (event) => {
            event.preventDefault();
            const modal = $('#modal-search');
            const inputSearch = $('#modal-search input[type=search]');

            if (event.target.dataset.ref.match(/(Faculdades Públicas|Federal|Em destaque)/)) {
              switch (event.target.dataset.ref) {
                case 'Faculdades Públicas':
                $(inputSearch).val('tipo:publica');
                inputSearch.closest('form').submit();
                $(modal).modal('show');
                break;
                case 'Federal':
                // TODO - Implementar
                $(inputSearch).val('tipo:federal');
                inputSearch.closest('form').submit();
                $(modal).modal('show');
                break;
                case 'Em destaque':
                //
                const btnCheckDestaque = $('#btn-check-destaque')[0];

                if (btnCheckDestaque.checked) {
                  btnCheckDestaque.click();
                }

                window.scrollTo({ top: btnCheckDestaque.offsetTop - $('.navbar.left')[0].offsetHeight, behavior: 'smooth' });
                break;
                default:
                //
                break;
              }
            } else {
              //
            }
          });
          break;

          default:
          console.warn('A ação %s não foi implementada.', elemento.dataset.action);
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

      fetch('./assets/js/modules/database.json')
      .then((response) => response.json())
      .then(({ vestibules }) => {
        database = vestibules;
        fns.loadAllExams({ card_no_exams, card }, vestibules);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        loadFuncionsPage();
      });
    }
  });

  window.subscribeInVestibular = (btn) => {
    const btnId = btn.dataset.id;
    const cardId = btn.closest('.card').dataset.id;
    let actionReturn;

    // Verifica se o botão de inscrição é de um card do modal
    if (btn.closest('.modal')) {
      actionReturn = `$('#modal-search').modal('show'); setTimeout(window.scrollTo({ top: ${btn.closest('.card').offsetTop}, behavior: 'smooth' }), 1000);`;
    }

    if (btn && (btnId === cardId) && ![btnId, cardId].includes(undefined)) {
      const itemDatabase = database.find((item) => parseInt(item.id, 10) === parseInt(btnId, 10));
      if (itemDatabase) {
        // TODO - Implementar orientação para click nos botões do modal
        fns.setInfoModalConfirm(itemDatabase, actionReturn);
      } else {
        //
      }
    }
  };

  window.createAlarmSubscription = (btn) => {
    const btnId = btn.dataset.id;
    const cardId = btn.closest('.card').dataset.id;

    if (btn && (btnId === cardId) && ![btnId, cardId].includes(undefined)) {
      const itemDatabase = database.find((item) => parseInt(item.id, 10) === parseInt(btnId, 10));

      if (itemDatabase) {
        const link = fns.createLinkGoogleCalendar(itemDatabase);
        if (link) window.open(link, '_blank', 'noopener noreferrer');
      }
    }
  };
})();

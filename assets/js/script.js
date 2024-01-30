import exibirDadosProjeto from './modules/sobre.js';
import { criarTooltips, popovers, range, tooltips } from './modules/utilitarios.js';
import dados from './modules/dados.js';
import fns from './modules/funcoes.js';

import { card } from './modules/content.js';

(() => {
  // hljs.highlightAll();
  
  // Confirmar saída da página
  window.onbeforeunload = (evento) => {
    // Tem coisa pra salvar
    if (Array.from($('input, textarea')).filter((e) => e.value.trim().length > 0).length > 0) {
      // evento.preventDefault();
    } else {
      // Não tem coisa pra salvar
    }
  };

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
  
  function atribuirAcoes() {
    const elementos = document.querySelectorAll('[data-action]');
    
    const acoes = {
      acao: fns.action,
    };
    
    elementos.forEach((acao) => {
      switch (acao.dataset.action) {
        case 'acao':
          $(acao).on('click', () => {
            acoes.acao();
          });
        break;

        case 'contribute':
        break;

        case 'active-search':
        break;
        
        default:
          console.warn('A ação não foi implementada.');
        break;
      }
    });
  }
  
  window.addEventListener('load', () => {
    $('.overlay').hide();
    exibirDadosProjeto();
    atribuirLinks();
    atribuirAcoes();
    criarTooltips();
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    tooltips();
    popovers();

    // Teste
    const replicateCount = 9;
    
    range({max: replicateCount}).forEach((e) => {
      $('.cards').append(card.trim())
    })
  });

  setTimeout(() => {
    $('#modal-confirm-redirect').modal('show');
  })

})();

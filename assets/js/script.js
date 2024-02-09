import exibirDadosProjeto from './modules/sobre.js';
import {
  criarTooltips, popovers, range, tooltips, 
} from './modules/utilitarios.js';
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
    
    elementos.forEach((elemento) => {
      switch (elemento.dataset.action) {
        case 'acao':
        $(elemento).on('click', () => {
          acoes.acao();
        });
        break;
        
        case 'contribute':
        break;
        
        case 'active-search':
        break;
        
        case 'search-element-exibition':
        $(elemento).on('input', (event) => {
          let searched = event.target.value.trim().toLowerCase();
          const area = $('.results-search-element-exibition');
          
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
        });
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
    
    range({ max: replicateCount }).forEach(() => {
      $('.cards').append(card.trim());
    });
  });
  
  setTimeout(() => {
    // $('#modal-confirm-redirect').modal('show');
  }, 500);
})();

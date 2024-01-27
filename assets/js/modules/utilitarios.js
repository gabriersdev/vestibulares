const isEmpty = (valor) => {
  try {
    if (typeof valor === 'string') {
      return valor === undefined || valor === null || valor.trim().length <= 0;
    } if (Array.isArray(valor)) {
      return valor.length <= 0;
    } if (typeof valor === 'object' && valor !== null && valor !== undefined) {
      return Object.keys(valor).length <= 0;
    }
    return valor === undefined || valor === null;
  } catch (error) {
    throw new Error('Ocorreu um erro ao verificar se o %s é vazio. Error: %s', typeof valor, error);
  }
};

const capitalize = (valor) => valor.charAt(0).toUpperCase() + valor.substr(1, valor.length);

const atualizarDatas = () => {
  const dataAtual = new Date();
  document.querySelectorAll('[data-ano-atual]').forEach((area) => {
    area.textContent = `${dataAtual.getFullYear()}`;
  });
};

const controleFechamentoModal = () => {
  const modais = document.querySelectorAll('.modal');
  modais.forEach((modal) => {
    const btnFecha = modal.querySelector('[data-modal-fecha]');
    btnFecha.addEventListener('click', () => {
      $(`#${modal.id}`).modal('hide');
    });
  });
};

function sanitizarString(string) {
  let string_replace = '';

  if (typeof string === 'string') {
    const substituir = [
      {
        original: '-',
        subst: '',
      },
      {
        original: '(',
        subst: '',
      },
      {
        original: ')',
        subst: '',
      },
      {
        original: ' ',
        subst: '',
      },
    ];

    substituir.forEach((substituicao) => {
      string_replace = string.replace(substituicao.original, substituicao.subst);
    });

    return string_replace.trim();
  } 
    console.log('O tipo do parâmetro passado não é uma string.');
    return null;
}

function tooltips(element) {
  if ([null, undefined].includes(element)) {
    $('[data-bs-toggle="tooltip"]').tooltip();
  } else {
    $(element).tooltip();
  }
}

function popovers() {
  $(document).ready(() => {
    $('[data-bs-toggle="popover"]').popover();
  });
}

async function SwalAlert(tipo, icon, title, text, mensagem) {
  const tipoLC = tipo.toLowerCase().trim();
  if (tipoLC === 'confirmacao') {
    const dialog = await Swal.fire({
      icon,
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      focusCancel: true,
    });

    return new Promise((resolve) => {
      resolve({ isConfirmed: dialog.isConfirmed });
    });
  }

  if (tipoLC === 'aviso') {
    Swal.fire({
      icon,
      title,
      text,
    });
  } else if (tipoLC === 'error') {
    Swal.fire({
      icon,
      title,
      text,
      footer: mensagem,
    }); 
  }
}

function resizeTextArea(textarea) {
  // Créditos https://www.instagram.com/reel/CrdgXF3AECg/
  const inital = getComputedStyle(textarea).getPropertyValue('height');
  const initialHeight = parseInt(inital, 10);
  textarea.addEventListener('input', () => {
    textarea.style.height = `${initialHeight}px`;
    const { scrollHeight } = textarea;
    const newHeight = textarea.scrollHeight - initialHeight;
    textarea.style.height = `${newHeight < scrollHeight ? scrollHeight : newHeight}px`;
  });
}

const copiar = async (valor) => {
  await navigator.clipboard.writeText(valor);
};

function verificarCPF(cpf) {
  let resultado = false;
  const CPF_replaced = cpf.replace(/\D/g, '');
  
  switch (cpf) {
    case '00000000000':
    case '11111111111':
    case '22222222222':
    case '33333333333':
    case '44444444444':
    case '55555555555':
    case '66666666666':
    case '77777777777':
    case '88888888888':
    case '99999999999':
      return false;
    default: 
    if (CPF_replaced.toString().length !== 11 || /^(\d)\1{10}$/.test(CPF_replaced)) return false;
    resultado = true;
    [9, 10].forEach((j) => {
      let soma = 0; 
      let r;
      CPF_replaced.split(/(?=)/).splice(0, j).forEach((e, i) => {
        soma += parseInt(e, 10) * ((j + 2) - (i + 1));
      });
      r = soma % 11;
      r = (r < 2) ? 0 : 11 - r;
      if (r !== parseInt(CPF_replaced.substring(j, j + 1), 10)) resultado = false;
    });
  }
  
  return resultado;
}

function zeroEsquerda(quantidadeZeros, valor) {
  let zeros;

  for (let i = 0; i < quantidadeZeros; i += 1) {
    zeros += '0';
  }

  return (zeros + valor).slice(-quantidadeZeros);
}

function desanitizarStringURL(string) {
  if (!isEmpty(string)) {
    return string.replaceAll('-', ' ').replaceAll('%20', ' ');
  }
  return '';
}

function sanitizarStringParaURL(string) {
  if (!isEmpty(string)) {
    return string.trim().toLowerCase().replaceAll(' ', '-');
  }
  return '';
}

function sanitizarNumeros(string) {
  if (!isEmpty(string)) {
    return string.replace(/\D/g, '');
  }
  return '';
}

const criarEBaixarArquivo = (conteudo, nome_arquivo, ext) => {
  try {
    const blob = new Blob([`${JSON.parse(conteudo)}`], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${nome_arquivo.toUpperCase()}.${ext}`);
  } catch (error) {
    console.warn('Framework File Saver necessário');
    throw new Error(error);
  }
};

const capturarDadosURL = (parametro) => {
  try {
    const parametros = new URLSearchParams(new URL(window.location).searchParams);

    if (isEmpty(parametro) && parametros.size > 0) {
      const saida = new Object();

      parametros.forEach((value, key) => {
        saida[key] = value;
      });

      return saida;
    }
    return parametros.get(parametro);
  } catch (error) {
    throw new Error('Ocorreu um erro ao capturar os parâmetros passados na URL. Error: %s', error);
  }
};

const converterParaMesBRL = (numero) => {
  try {
    const numero_parsed = parseInt(numero, 10);
    if (typeof numero_parsed === 'number') {
      let mes = null;
      switch (numero_parsed + 1) {
        case 1: mes = 'janeiro'; break;
        case 2: mes = 'fevereiro'; break;
        case 3: mes = 'março'; break;
        case 4: mes = 'abril'; break;
        case 5: mes = 'maio'; break;
        case 6: mes = 'junho'; break;
        case 7: mes = 'julho'; break;
        case 8: mes = 'agosto'; break;
        case 9: mes = 'setembro'; break;
        case 10: mes = 'outubro'; break;
        case 11: mes = 'novembro'; break;
        case 12: mes = 'dezembro'; break;
        default: mes = 'janeiro'; break;
      }

      return mes;
    }
    return null;
  } catch (error) {
    console.warn('O valor informado não é um número');
    return null;
  }
};

const format = (string, composicao) => {
  let string_replace = string;
  if (string.includes('{}')) {
    if (Array.isArray(composicao)) {
      for (let i = 0; i <= (composicao.length - 1); i += 1) {
        if (composicao[i] !== null && composicao[i] !== undefined) {
          string_replace = string_replace.replace('{}', composicao[i]);
        }
      }
      return string;
    } if (!Number.isNaN(composicao)) {
      return string.replace('{}', composicao);
    }
    throw new Error('Parâmetro de composição não informado');
  } else {
    return string;
  }
};

const mult = (str, multiplicador) => {
  let ret = str;
  if (multiplicador !== undefined && typeof parseInt(multiplicador, 10) === 'number' && !isEmpty(str)) {
    for (i = 1; i < multiplicador; i += 1) {
      ret += str;
    }
  }
  return ret;
};

function mascararValores(input) {
  // Créditos https://stackoverflow.com/questions/62894283/javascript-input-mask-currency

  if (isEmpty(input.value)) {
    input.value = 'R$ 0,00';
  }

  input.addEventListener('input', () => {
    const value = input.value.replace('.', '').replace(',', '').replace(/\D/g, '');

    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100);

    if (Number.isNaN(result) && result === 'NaN') {
      input.value = 'R$ 0,00';
    } else {
      input.value = `R$ ${result}`;
    }
  });
  input.removeAttribute('maxlength');
}

const tratamentoCampos = (input) => {
  $(document).ready(() => {
    switch (input.dataset.input) {
      case 'cpf':
        $(input).mask('000.000.000-00', { reverse: true });
        break;

      case 'cep':
        $(input).mask('00000-000', { reverse: true });
        break;

      case 'data_nascimento':
        $(input).mask('00/00/0000');
        break;

      case 'telefone':
        $(input).mask('(00) 00000-0000');
        break;

      case 'id-fid':
        $(input).mask('000000');
        break;

      case 'id-valor-imovel':
        mascararValores(input);
        break;

      case 'matricula':
        $(input).mask('0000000');
        break;

      default:
        break;
    }

    switch (input.dataset.mask) {
      case 'money':
        mascararValores(input);
        break;
      
        default:
          break;
    }
  });
};

const range = ({ min = 0, max, scale = 0 }) => {
  const ret = new Array();

  if (max !== 0 && scale !== 0) {
    if (scale >= 1 && min < max) {
      for (let i = min; i < max; i += scale) {
        ret.push(i);
      }
    } else if (scale < 0 && min < max) {
      for (let i = min; i < max; i -= scale) {
        ret.push(i);
      }
    }
    return ret;
  }
  return max;
};

const between = (value, initial, end) => value >= initial && value <= end;

const componenteCopiar = async () => {
  $('[data-component-copy]').each((index, element) => {
    const [buttonCopy, originCopy, propertyCopy] = [element.querySelector('[data-element="origin-copy"'), element.querySelector('[data-action="button-copy"]'), element.dataset.propertyCopy];
    if (!isEmpty(originCopy) && !isEmpty(buttonCopy)) {
      $(buttonCopy).on('click', (event) => {
        event.preventDefault();
        return new Promise((resolve, reject) => {
          try {
            switch (propertyCopy) {
              case 'textContent':
              case 'innerHTML':
              case 'outerHTML':
              case 'value':
                resolve(copiar(originCopy.getAttribute(propertyCopy)));
                break;
              default:
                resolve(copiar(originCopy.getAttribute('value')));
                break;
            }
          } catch (error) {
            reject(error);
          }
        });
      });
    } else {
      console.log('Um dos elementos necessários para o funcionamento do componente não foi definido.');
    }
  });
};

const setAttributes = (element, params) => {
  if (Object.keys(params).length >= 1 && !Array.isArray(params)) {
    try {
      let param = '';
      for (param in params) {
        if (!isEmpty(params[param])) {
          element.setAttribute(param, params[param]);
        } 
      }
    } catch (error) {
      throw new Error('Um erro ocorreu.', error);
    }
  } else if (Array.isArray(params) && params.length === 2) {
    try {
      if (!isEmpty(params[1])) {
        element.setAttribute(params[0], params[1]);
      } 
    } catch (error) {
      throw new Error('Um erro ocorreu.', error);
    }
  }

  return element;
};

const createElement = (element, params) => {
  let element_treated = element;
  if (params !== null && params !== undefined) {
    element_treated = setAttributes(element, params);
  }

  return element_treated;
};

const criarTooltips = () => {
  if (Array.from($('[data-visual-tooltip]')).length > 0) {
    $('[data-visual-tooltip]').each((index, e) => {
      setAttributes(e, {
        'data-bs-toggle': 'tooltip',
        'data-bs-placement': 'top',
        'data-bs-custom-class': `${e.dataset.customTooltip || ''}`,
      });
      tooltips(e);
    });
  }
};

const BRLToFloat = (value) => {
  const value_treated = value;
  return parseFloat(value_treated.replace('R$ ', '').replaceAll('.', '').replace(',', '.'));
};

const FloatToBRL = (value) => {
  const value_treated = value;
  return value_treated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export {
  isEmpty,
  capitalize,
  atualizarDatas,
  controleFechamentoModal,
  sanitizarString,
  tooltips,
  popovers,
  SwalAlert,
  resizeTextArea,
  copiar,
  verificarCPF,
  zeroEsquerda,
  desanitizarStringURL,
  sanitizarStringParaURL,
  sanitizarNumeros,
  criarEBaixarArquivo,
  capturarDadosURL,
  converterParaMesBRL,
  format,
  mult,
  tratamentoCampos,
  mascararValores,
  range,
  between,
  componenteCopiar,
  createElement,
  setAttributes,
  criarTooltips,
  BRLToFloat,
  FloatToBRL,
};

import { isNil } from 'ramda';

export const groupBy = (conversions, property, typeOfGroup) => {
  return conversions.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    if (property === 'mode') {
      //if (typeOfGroup === "primitives") {
      acc[key] = { value: obj.value };
      // } else if (typeOfGroup === "semantic") {
      //   acc[key] = { "value": obj.primitivo };
      // }
    } else {
      acc[key].push(obj);
    }
    return acc;
  }, {});
};

export const nestGroupsBy = (arr, properties, typeOfGroup) => {
  properties = Array.from(properties);
  if (properties.length === 1) {
    return groupBy(arr, properties[0], typeOfGroup);
  }
  const property = properties.shift();
  var grouped = groupBy(arr, property);
  for (let key in grouped) {
    grouped[key] = nestGroupsBy(grouped[key], Array.from(properties), typeOfGroup);
  }
  return grouped;
};

export const transformData = (data, typeOfGroup) => {
  const transformedData = nestGroupsBy(
    data,
    ['group', 'component', 'element', 'category', 'concept', 'property', 'variant', 'state', 'scale', 'mode'],
    typeOfGroup
  );

  return transformedData;
};

export const mapTokensToOutput = data => {
  const tokenMap = {};

  data.forEach(item => {
    const inputToken = item.Name;

    // substitui hífen por ponto, exceto para "line-height" e "z-index"
    const outputToken = inputToken
      .replace(/^spds-[^-]+-/, '')
      .split('-')
      .map((part, index, arr) => {
        if ((part === 'line' && arr[index + 1] === 'height') || (part === 'z' && arr[index + 1] === 'index')) {
          return part + '-' + arr[index + 1];
        } else if (index > 0 && (arr[index - 1] === 'line' || arr[index - 1] === 'z')) {
          return null;
        }
        return part;
      })
      .filter(part => part !== null)
      .join('.');

    tokenMap[inputToken] = outputToken;
  });

  return tokenMap;
};

export const convertPrimitivesToOutput = data => {
  const tokenMap = mapTokensToOutput(data);
  const output = {};

  data.forEach(item => {
    const outputKey = tokenMap[item.Name];

    if (outputKey) {
      const keys = outputKey.split('.');

      let nivelAtualProp = output;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!nivelAtualProp[keys[i]]) {
          nivelAtualProp[keys[i]] = {};
        }
        nivelAtualProp = nivelAtualProp[keys[i]];
      }

      nivelAtualProp[keys[keys.length - 1]] = {
        value: item['[Global] Valor'],
      };
    }
  });

  return output;
};

export const convertSemanticsToOutput = data => {
  const tokenMap = mapTokensToOutput(data);
  const output = {};

  data.forEach(item => {
    const outputKey = tokenMap[item.Name];

    if (outputKey) {
      const keys = outputKey.split('.');

      let nivelAtualProp = output;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!nivelAtualProp[keys[i]]) {
          nivelAtualProp[keys[i]] = {};
        }
        nivelAtualProp = nivelAtualProp[keys[i]];
      }

      const primitiveTokenName = removePrefixAndDots(item['[Global] Path']);
      nivelAtualProp[keys[keys.length - 1]] = {
        value: primitiveTokenName,
      };
    }
  });

  return output;
};

export const convertComponentsToOutput = data => {
  const tokenMap = mapTokensToOutput(data);
  const output = {};

  data.forEach(item => {
    const outputKey = tokenMap[item.Name];

    if (outputKey) {
      const keys = outputKey.split('.');

      let nivelAtualProp = output;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!nivelAtualProp[keys[i]]) {
          nivelAtualProp[keys[i]] = {};
        }
        nivelAtualProp = nivelAtualProp[keys[i]];
      }

      let finalPath = '';
      const containsGlobalPath = item['[Global] Path'].length > 1;

      if (containsGlobalPath) {
        finalPath = item['[Global] Path'];
      } else {
        const pathSplit = item['[Bayon] Path'].split(',');
        finalPath = pathSplit[pathSplit.length - 2];
      }

      const primitiveTokenName = removePrefixAndDots(finalPath, 'component');
      nivelAtualProp[keys[keys.length - 1]] = {
        value: primitiveTokenName,
      };
    }
  });

  return output;
};

const removePrefixAndDots = (tokenName, typeOfGroup) => {
  let newTokenName = tokenName.replaceAll('spds-gl-', '');

  if (typeOfGroup === 'component') {
    if (newTokenName.includes(',')) {
      newTokenName = newTokenName.split(',')[1];
    }
  }

  newTokenName = newTokenName.replaceAll(/-/g, '.');

  const excecoes = {
    'line.height': 'line-height',
    'z.index': 'z-index',
    'deep.orange': 'deep-orange',
  };

  // Reverte as substituições de hífen para 'line-height' e 'z-index', precisamos adaptar essa lógica para outros casos
  for (const [key, value] of Object.entries(excecoes)) {
    newTokenName = newTokenName.replace(key, value);
  }

  return `{${newTokenName}}`;
};

export const exportData = (newArray, typeOfGroup) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(newArray))}`;
  const link = document.createElement('a');
  link.href = jsonString;
  link.download = `${typeOfGroup}.json`;
  link.click();
};

export const cleanData = conversions => {
  conversions.forEach(token => {
    let tipoVariavel;

    if (token['semantico']) {
      tipoVariavel = 'semantico';
    } else if (token['primitivo']) {
      if (token['primitivo'] === '#N/A') {
        tipoVariavel = 'value';
      } else {
        tipoVariavel = 'primitivo';
      }
    }

    if (tipoVariavel !== 'value') {
      token['oldValue'] = token['value'];
      const idx = 8;
      // const idx = token[tipoVariavel].indexOf(token["category"]);
      let newValueClean = token[tipoVariavel].slice(idx).replaceAll('-', '.');
      let newValue = newValueClean.replace('line.height', 'line-height');
      token['value'] = `{${newValue}}`;
    }
  });

  return conversions;
};

export const removeBlankSpaces = obj => {
  if (Array.isArray(obj)) {
    return obj.map(removeBlankSpaces);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      if (key.trim() !== '') {
        acc[key] = removeBlankSpaces(obj[key]);
      } else {
        if (typeof obj[key] === 'object') {
          const nestedObj = removeBlankSpaces(obj[key]);
          Object.assign(acc, nestedObj);
        }
      }
      return acc;
    }, {});
  }
  return obj;
};

//Cria o array da lista de opções do Select/autocomplete
export const transformOptionListItens = (list, categoria, designSystem) => {
  const newListOptions = list?.map(function (optionItem) {
    let valueOption;
    const nameDS = isNil(designSystem) ? 'Global' : designSystem;

    if (categoria === "Semântico") {
      valueOption = optionItem[`[${nameDS}] Valor`]?.[0];
    } else {
      valueOption = optionItem[`[${nameDS}] Valor`]
    }

    return {
      "id": optionItem["id"],
      "label": optionItem["Name"],
      "value": valueOption,
      [categoria === "Semântico" && "primitivo"]: optionItem[`[${nameDS}] Primitivo`]?.[0]
    }
  });
  return newListOptions;
}
const specialDataIdentifiers = {
  1: 'size',
  2: 'script',
  3: 'servertiming',
  4: 'linkAttr',
  5: 'dataNamespaced',
};

const getSpecialData = (specialData = []) => specialData.reduce((all, item) => {
  const specialDataType = specialDataIdentifiers[item[0]];
  const specialDataValue = item.substring(1);

  if (specialDataType === 'size') {
    all[specialDataType] = parseInt(specialDataValue, 36);
  } else if (specialDataType === 'script') {
    const data = parseInt(specialDataValue, 10);
    const scriptAttributes = {
      scriptAsync: 0x1,
      scriptDefer: 0x2,
      scriptBody: 0x4,
    };

    const matchScriptAttribute = (
      value,
      attribute,
    ) => (value & scriptAttributes[attribute]) // eslint-disable-line no-bitwise
        === scriptAttributes[attribute];

    all.scriptAsync = matchScriptAttribute(data, 'scriptAsync');
    all.scriptDefer = matchScriptAttribute(data, 'scriptDefer');
    all.scriptBody = matchScriptAttribute(data, 'scriptBody');
  }

  return all;
}, {});

module.exports = { getSpecialData };

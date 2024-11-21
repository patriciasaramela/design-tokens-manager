import airtable from 'airtable';
const base = new airtable({ apiKey: `${import.meta.env.VITE_AIRTABLE_API_KEY}` }).base(
  `${import.meta.env.VITE_AIRTABLE_BASE_DADOS_PAINEL}`
);

export const FetchRecordsSemanticos = designSystem => {
  return new Promise((resolve, reject) => {
    const records = [];
    const fields = [
      'Name',   
      'Type',
      'Description',
      'Novo',
      'Created',
      '[Global] Primitivo',
      '[Global] Path',
      `[Global] Git`,
      '[Global] Valor',
      `[${designSystem}] Primitivo`,
      `[${designSystem}] Path`,
      `[${designSystem}] Git`,
      `[${designSystem}] Valor`,
    ]
    base('Semântico')
      .select({
        fields: fields,
        view: designSystem,
        sort: [{ field: '[Global] Valor', direction: 'asc' }],
      })
      .eachPage(
        function page(records_, fetchNextPage) {
          const processedRecords = records_.map(e => e._rawJson).map(e => e.fields);
          const idRecords = records_.map(e => e.id);

          processedRecords.forEach((record, index) => {
            let newRecord = record;
            newRecord.id = idRecords[index];
            records.push(newRecord);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(records);
        }
      );
  });
};

export const FetchRecordsPrimitivos = designSystem => {
  return new Promise((resolve, reject) => {
    const records = [];
    const fields = ['Name', `[${designSystem}] Valor`, '[Global] Valor', 'Type', 'Description', `[${designSystem}] Git`, `[Global] Git`, 'Novo', 'Created'];
    base('Primitivo')
      .select({
        fields: fields,
        sort: [{ field: '[Global] Valor', direction: 'asc' }],
      })
      .eachPage(
        function page(records_, fetchNextPage) {
          const processedRecords = records_.map(e => e._rawJson).map(e => e.fields);
          const idRecords = records_.map(e => e.id);

          processedRecords.forEach((record, index) => {
            let newRecord = record;
            newRecord.id = idRecords[index];
            records.push(newRecord);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(new Error('Erro na requisição dos primitivos: ' + err.message));
            return;
          }
          resolve(records);
        }
      );
  });
};

export const FetchRecordsComponents = (componente, designSystem) => {
  return new Promise((resolve, reject) => {
    const records = [];
    const filtro = `componente = "${componente}"`;
    const fields = ['Name', `[${designSystem}] Valor`, '[Global] Valor', 'Type', 'Description', '[Global] Path', `[${designSystem}] Path`, `[${designSystem}] Git`, `[Global] Git`, 'Novo', 'Created']
    base('Componente')
      .select({
        fields: fields,
        filterByFormula: filtro,
        sort: [{ field: '[Global] Valor', direction: 'asc' }],
      })
      .eachPage(
        function page(records_, fetchNextPage) {
          const processedRecords = records_.map(e => e._rawJson).map(e => e.fields);
          const idRecords = records_.map(e => e.id);

          processedRecords.forEach((record, index) => {
            let newRecord = record;
            newRecord.id = idRecords[index];
            records.push(newRecord);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(records);
        }
      );
  });
};

export const FetchComponentsNames = designSystem => {
  return new Promise((resolve, reject) => {
    const records = [];
    base('Componente')
      .select({
        fields: ['Componente'],
        filterByFormula: "NOT({Componente} = '')",
        // view: designSystem,
        sort: [{ field: 'Componente', direction: 'asc' }],
      })
      .eachPage(
        function page(records_, fetchNextPage) {
          const processedRecords = records_.map(e => e._rawJson).map(e => e.fields);
          processedRecords.forEach(record => {
            if (!records.some(r => r === record["Componente"].toLowerCase())) {
              records.push(record["Componente"].toLowerCase());
            }
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(records);
        }
      );
  });
};

export const CreateRecordToken = (categoria, value) => {
  base(categoria).create([
    {
      "fields": value
    }
  ], function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });
};
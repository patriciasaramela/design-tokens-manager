import airtable from 'airtable';

const base = new airtable({ apiKey: `${import.meta.env.VITE_AIRTABLE_API_KEY}` }).base(
  `${import.meta.env.VITE_AIRTABLE_BASE_DADOS_PAINEL}`
);

export const FetchConfig = () => {
  const processConfig = data => {
    const config = {};

    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (!config[key]) {
          config[key] = [];
        }
        config[key].push(item[key]);
      });
    });

    return { config };
  };

  return new Promise((resolve, reject) => {
    const records = [];
    let finalData = null;

    base('config')
      .select({
        fields: ['replace', 'DS'],
        sort: [{ field: 'DS', direction: 'asc' }],
      })
      .eachPage(
        function page(records_, fetchNextPage) {
          const processedRecords = records_.map(e => e._rawJson).map(e => e.fields);

          processedRecords.forEach((record, index) => {
            let newRecord = record;
            records.push(newRecord);
          });

          const data = processConfig(records);
          finalData = data;

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(finalData);
        }
      );
  });
};

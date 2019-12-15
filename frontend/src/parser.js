const restructure = data => {
  const newData = data.map(question => {
    const choices = question.stat.qcm.data;
    const qcm = [];
    for (const name in choices) {
      qcm.push({ name, count: choices[name] });
    }

    return {
      code: question.code,
      qcm,
      numeric: question.stat.numeric
    };
  });

  return newData;
};

export { restructure };

exports.paginate = query => {
  const page = query?.page ? parseInt(query.page, 10) : 1;
  const limit = query?.limit ? parseInt(query.limit, 10) : 10;
  const offset = (page - 1) * limit;
  return {
    limit: limit,
    offset: offset,
  };
};

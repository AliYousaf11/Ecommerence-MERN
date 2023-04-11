class ApiFeature {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  // query str the will gives us keyword
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter
  filter() {
    // keyword catergory = laptop
    const queryFilter = { ...this.querystr };
    const removeFileds = ["keyword", "page", "limit"];
    removeFileds.forEach((item) => delete queryFilter[item]);

    let queryStr = JSON.stringify(queryFilter);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeature;

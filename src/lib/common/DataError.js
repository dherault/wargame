class DataError extends Error {
  constructor(message, data) {
    super(`${message}\n${JSON.stringify(data, null, 2)}`)
  }
}

export default DataError
class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default DatabaseError;

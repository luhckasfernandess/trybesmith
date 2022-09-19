import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/productsInterface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;

    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );

    const [dataInserted] = result;
    const { insertId: id } = dataInserted;

    return { id, ...product };
  }

  public async getAllProducts(): Promise<IProduct[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Products');

    const [rows] = result;

    return rows as IProduct[];
  }
}
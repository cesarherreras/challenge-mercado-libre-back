import mysql from 'mysql';
import { NewsModel } from '../models/news.model';


export class MysqlService {
    constructor() { }

    public static getConnection(): any {

        return new Promise((resolve, reject) => {
            let connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '63481600',
                database: 'news_db',
                port: 3306
            });
            connection.connect(function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve(connection);
                    console.log('Conexion correcta.');
                }
            });
        });
    }

    public static saveNewsInDb(newA: NewsModel) {

        return new Promise(async (resolve, reject) => {
            let connection = await this.getConnection();
            const query = `INSERT INTO news (title, url, image) VALUES ('${newA.title}', '${newA.url}', '${newA.image}')`;
            connection.query(query, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public static getNews(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let connection = await this.getConnection();
            const query = 'SELECT * FROM news';
            await connection.query(query, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

    }
}


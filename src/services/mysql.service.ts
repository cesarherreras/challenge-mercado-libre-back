import mysql from 'mysql';
import { NewsModel } from '../models/news.model';


export class MysqlService {

    constructor() { }

    private static getConnection(): any {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'news_db',
                port: 3306
            });
            connection.connect(error => {
                if (error) {
                    reject(error);
                } else {
                    resolve(connection);
                }
            });
        });
    }

    public static saveNewsInDb(newA: NewsModel[]) {
        return new Promise(async (resolve, reject) => {
            const connection = await this.getConnection();
            const dataToDb = Buffer.from(JSON.stringify(newA), 'utf-8').toString('base64');
            const query = `INSERT INTO cache_news (cache) VALUES ('${dataToDb}')`;
            connection.query(query, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public static getCache(): Promise<{news: [], saveTime: Date}> {
        return new Promise(async (resolve, reject) => {
            const connection = await this.getConnection();
            const query = 'SELECT * FROM cache_news';
            await connection.query(query, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    const resultValidated = this.validateResponse(result);
                    resolve(resultValidated);
                }
            });
        });
    }

    public static deleteCache(){
        return new Promise(async (resolve, reject) => {
            const connection = await this.getConnection();
            const query = 'DELETE FROM cache_news';
            connection.query(query, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    private static validateResponse(result: any): any{
        if(result.length !== 0){
            const dataDecodedBlob = Buffer.from(result[0].cache, 'base64').toString('utf-8');
            const news = JSON.parse(Buffer.from(dataDecodedBlob, 'base64').toString('utf-8'));
            return {news, saveTime: result[0].timestamp};
        }else{
            return undefined;
        }
    }
}


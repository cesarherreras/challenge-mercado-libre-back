import fetch from 'node-fetch';
import { NewsModel } from '../models/news.model';
import { MysqlService } from "../services/mysql.service";

export class NewsService {
    constructor() { }

    public static getNews(): Promise<NewsModel[]> {
        return new Promise(async (resolve, reject) => {
            const infoNewsFromDb = await MysqlService.getNews();
            if (infoNewsFromDb.length !== 0) {
                console.log('Devuelve la cache');
                resolve(infoNewsFromDb);
            } else {
                console.log('Llama el servicio');
                fetch('https://test.spaceflightnewsapi.net/api/v2/articles?_limit=40')
                    .then(response => response.json())
                    .then(data => {
                        const newsList = data.map((item: any) => {
                            const newsData = {
                                title: item.title,
                                url: item.url,
                                image: item.imageUrl
                            }
                            MysqlService.saveNewsInDb(newsData);
                            return newsData;
                        });
                        resolve(newsList);
                    }).catch(() => {
                        reject({ statusCode: 500, message: 'Error obteniendo noticias' });
                    });
            }
        })
    }
}

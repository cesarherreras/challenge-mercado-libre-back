import fetch from 'node-fetch';
import { NewsModel } from '../models/news.model';
import { MysqlService } from '../services/mysql.service';

export class NewsService {

    public static MINUTES_NOT_ALLOWED = 5;
    constructor() { }

    public static getNews(): Promise<NewsModel[] | undefined> {
        return new Promise(async (resolve, reject) => {
            const infoNewsFromDb = await MysqlService.getCache();
            const minutesBetweenDates = infoNewsFromDb ? this.getMinutesBetweenDates(new Date().getTime(), new Date(infoNewsFromDb.saveTime).getTime()) : this.MINUTES_NOT_ALLOWED;
            console.log('Minutes:', minutesBetweenDates);
            if (minutesBetweenDates < this.MINUTES_NOT_ALLOWED) {
                console.log('Devuelve la cache');
                resolve(infoNewsFromDb?.news);
            } else {
                console.log('Llama el servicio');
                this.getDataFromApi().then(async (newsList) => {
                    await MysqlService.deleteCache();
                    MysqlService.saveNewsInDb(newsList);
                    resolve(newsList);
                }).catch(() => {
                    reject({ statusCode: 500, message: 'Error obteniendo noticias' });
                });
            }
        });
    }

    public static getMinutesBetweenDates(firstMinutes: number, secondMinutes: number): number{
        return Math.floor(((firstMinutes - secondMinutes) / 60000));
    }

    public static getDataFromApi(): Promise<NewsModel[]>{
        return new Promise((resolve) => {
            fetch('https://test.spaceflightnewsapi.net/api/v2/articles?_limit=40')
            .then(response => response.json())
            .then(data => {
                const newsList = data.map((item: any) => {
                    const newsData = {
                        title: item.title,
                        url: item.url,
                        image: item.imageUrl
                    };
                    return newsData;
                });
                resolve(newsList);
            });
        });
    }
}

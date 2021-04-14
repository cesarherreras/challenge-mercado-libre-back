import { Router } from 'express';
import { NewsService } from '../services/news.service';
const NewsController = Router();

NewsController.get('/news', async (req, res) => {
    try {
        const data = await NewsService.getNews();
        res.send(data);
    }catch(error){
        res.status(error.statusCode).send(error.message);
    }
});

export default NewsController;

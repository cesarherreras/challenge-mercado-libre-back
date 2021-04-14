# ChallengeMercadoLibreBackend

Este repositorio corresponde al backend hecho con node js para el challenge de mercado libre.

## Pasos para ejecutar el proyecto

1. Instalar node js
2. Instalar Mysql Workbench
3. Crear BD
```sql
CREATE SCHEMA `news_db` DEFAULT CHARACTER SET utf8 ;
```
4. Crear tabla
```sql
CREATE TABLE `news_db`.`cache_news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cache` BLOB NULL,
  `timestamp` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
```
5. Clonar el proyecto
```sh
git clone https://github.com/tatianaserrano/challenge-mercado-libre-back.git
```
6. Ejecutar el proyecto
```sh
npm start
```

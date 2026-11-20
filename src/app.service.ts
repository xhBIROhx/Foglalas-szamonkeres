import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise'
import Foglalas from './Foglalas.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reservations13e',
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getFoglalasok() {
    const [results] = await mysqlConnection.execute("SELECT name,email,startDate,guests FROM reservations;")
    return results as Foglalas[]
  }

  async newFoglalas(foglalas: Foglalas) {
    await mysqlConnection.execute("INSERT INTO reservations (name,email,startDate,guests) VALUES (?,?,?,?)", [foglalas.name, foglalas.email, foglalas.startDate, foglalas.guests])
  }
}

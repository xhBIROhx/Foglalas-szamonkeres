import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import type Foglalas from './Foglalas.js';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHello() {
    return {
      title: 'Foglalások',
      foglalasokSzama: (await this.appService.getFoglalasok()).length
    }
  }


  @Post()
  @Render('index')
  async newRule(@Body() body: Foglalas) {
    const emailRegex = /.@./i;
    let errors = [];

    if (!emailRegex.test(body.email)) {
      errors.push("Email must be correct.")
    }
    if (new Date(body.startDate) <= new Date()) {
      errors.push("Date must be a future date.")
    }
    if (body.guests < 1 || body.guests > 10) {
      errors.push("The guest number must be withing bounds.")
    }

    if (errors.length > 0) {
      return {
        errors,
        title: 'Foglalások',
        foglalasokSzama: (await this.appService.getFoglalasok()).length
      }
    }else {
      await this.appService.newFoglalas(body);
      return {
        success: "Új foglalás leadva",
        title: 'Foglalások',
        foglalasokSzama: (await this.appService.getFoglalasok()).length
      }
    }
  }
}

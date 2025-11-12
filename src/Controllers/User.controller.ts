import { Body, Controller, Post } from '@nestjs/common';

@Controller('/users')
export class UserController {
  @Post('/create')
  async createUser(@Body() user) {
    
    

  }
}

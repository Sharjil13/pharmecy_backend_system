import { Body, Controller, Post, Req } from '@nestjs/common';
import { createTenantDTO } from './TenantDTO/CreateTenantDTO';
import { TenantService } from './Tenant.Service';

@Controller('/tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/create')
  async createTenant(@Body() data: createTenantDTO, @Req() req) {
    const createTenant = await this.tenantService.createTenant(data, req.user);
    return createTenant;
  }
}

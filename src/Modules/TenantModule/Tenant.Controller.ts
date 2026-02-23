import { Body, Controller, Post, Req } from '@nestjs/common';
import { createTenantDTO } from './TenantDTO/CreateTenantDTO';
import { TenantService } from './Tenant.Service';
import { SkipRoles } from 'src/Common/Guards/skip-roles.decorator';

@Controller('/tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/create')
  @SkipRoles()
  async createTenant(@Body() data: createTenantDTO, @Req() req) {
    const createTenant = await this.tenantService.createTenant(data, req.user);
    return createTenant;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModel } from 'src/Models/Tent.Model';
import { TenantController } from './Tenant.Controller';
import { TenantService } from './Tenant.Service';

@Module({
  imports: [TypeOrmModule.forFeature([TenantModel])],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}

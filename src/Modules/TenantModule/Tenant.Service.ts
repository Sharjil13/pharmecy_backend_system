import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantModel } from 'src/Models/Tent.Model';
import { DataSource, Repository } from 'typeorm';
import { createTenantDTO } from './TenantDTO/CreateTenantDTO';
import { UserModel } from 'src/Models/User.Model';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantModel)
    private readonly tentRepository: Repository<TenantModel>,
    private readonly dataSource: DataSource,
  ) {}

  async createTenant(
    data: createTenantDTO,
    user: UserModel,
  ): Promise<TenantModel> {
    if (user && user.tenantId) {
      throw new Error('User already belongs to a tenant');
    }
    return await this.dataSource.transaction(async (manager) => {
      // 1️⃣ Create tenant
      const tenant = manager.create(TenantModel, data);
      const savedTenant = await manager.save(tenant);

      // 2️⃣ Update user with new tenantId and role
      const userEntry = await manager.findOne(UserModel, {
        where: { id: user.id },
      });
      if (!userEntry) {
        throw new Error('User not found');
      }
      userEntry.tenantId = savedTenant.id;
      userEntry.role = 'owner';
      await manager.save(userEntry);
      return savedTenant;
    });
  }
}

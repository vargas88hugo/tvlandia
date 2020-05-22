import { Repository, EntityRepository, DeleteResult } from 'typeorm';

import { Technician } from './technician.entity';

@EntityRepository(Technician)
export class TechnicianRepository extends Repository<Technician> {
  async getAllTechnicians(): Promise<Technician[]> {
    return await this.find({});
  }

  async findTechnician(id: number): Promise<Technician> {
    return await this.findOne(id);
  }

  async saveTechnician(cechnician: Technician): Promise<void> {
    cechnician.save();
  }

  async deleteTechnician(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }
}

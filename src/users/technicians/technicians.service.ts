import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { TechniciansRepository } from './technicians.repository';
import { Technician } from './technician.entity';
import { TechnicianStatus } from './helpers/technician-status.enum';
import { AuthCredentialsDto } from '../clients/dto/auth-client-credentials.dto';
import { hashPassword } from 'src/common/hash-password';
import { SignInTechnicianDto } from './dto/signin-technician.dto';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(TechniciansRepository)
    private techniciansRepository: TechniciansRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { name, phone, email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const technician = new Technician();

    technician.name = name;
    technician.phone = phone;
    technician.email = email;
    technician.status = TechnicianStatus.IDLE;
    technician.password = await hashPassword(password, salt);
    technician.salt = salt;

    if (await this.techniciansRepository.findOne({ email })) {
      throw new ConflictException(
        `Technician with email ${email} already exists.`,
      );
    }
    await this.techniciansRepository.saveTechnician(technician);

    return `New technician with email ${email} has been created.`;
  }

  async signIn(
    signInTechnicianDto: SignInTechnicianDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.validateUserPassword(signInTechnicianDto);

    if (!email) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async getAllTechnicians(): Promise<Technician[]> {
    let technicians = await this.techniciansRepository.getAllTechnicians();
    technicians = technicians.map(technician => {
      delete technician.tickets;
      delete technician.password;
      delete technician.salt;
      return technician;
    });
    return technicians;
  }

  async getTechnicianById(id: number) {
    const found = await this.techniciansRepository.findTechnician(id);

    if (!found) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return found;
  }

  async deleteTechnicianById(id: number): Promise<string> {
    const result = await this.techniciansRepository.deleteTechnician(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Technician with id ${id} not found.`);
    }

    return `Technician with id ${id} has been deleted.`;
  }

  async validateUserPassword(
    signInTechnicianDto: SignInTechnicianDto,
  ): Promise<string> {
    const { email, password } = signInTechnicianDto;
    const technician = await this.techniciansRepository.findOne({ email });

    if (technician && (await technician.validatePassword(password))) {
      return technician.email;
    }

    return null;
  }
}

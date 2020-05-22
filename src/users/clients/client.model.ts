import { UserInterface } from 'src/users/clients/user.model';

export interface ClientInterface extends UserInterface {
  status: ClientStatus;
}

export enum ClientStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
}

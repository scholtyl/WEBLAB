import { UserDTO } from "./DTOs/userDTO";

export class User
{
  constructor(dto: UserDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.lastTraining = dto.lastTraining ? new Date(dto.lastTraining) : undefined;
  }

    id?: string;
    name?: string;
    lastTraining?: Date
    isAdmin?: boolean
}

export interface MachineDTO {
  id: number;
  name: string;
  lastTraining?: string | undefined;
  lastWeight?: number | undefined;
  isActive?: boolean | undefined;
}

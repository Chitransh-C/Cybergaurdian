import { labRepository } from './lab.repository.js';

export class LabService {
  constructor(labRepo = labRepository) {
    this.labRepo = labRepo;
  }

  async recordCommandLog(logDto) {
    return this.labRepo.logCommand(logDto);
  }

  async getCommandHistory(limit = 50) {
    return this.labRepo.getRecentLogs(limit);
  }
}

export const labService = new LabService();
export default labService;

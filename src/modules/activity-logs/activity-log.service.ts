import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActivityLog } from "./activity-log.entity";
import { Repository } from "typeorm";

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private acivityLogRepository: Repository<ActivityLog>) {
    }

    getAllLogs() {
        return this.acivityLogRepository.find()
    }

    saveLog(log: ActivityLog) {
        return this.acivityLogRepository.save(log)
    }
}
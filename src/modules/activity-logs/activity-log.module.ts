import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityLog } from "./activity-log.entity";
import { ActivityLogController } from "./activity-log.controller";
import { ActivityLogService } from "./activity-log.service";

@Module({
    imports: [TypeOrmModule.forFeature([ActivityLog])],
    controllers: [ActivityLogController],
    providers: [ActivityLogService]
})
export class ActivityLogModule {}
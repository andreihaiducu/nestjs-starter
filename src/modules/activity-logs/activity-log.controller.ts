import { UseGuards, Controller, Get, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ActivityLogService } from "./activity-log.service";
import { ActivityLog } from "./activity-log.entity";
import { ApiResponse, ApiUseTags } from "@nestjs/swagger";

@ApiUseTags("Activity Logs")
@UseGuards(AuthGuard('jwt'))
@Controller('activity_log')
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) {}
   
    @ApiResponse({
		status: 201,
		description: "Returns all logs from database"
	})
	@ApiResponse({
		status: 400,
		description: "Bad Request"
	})
	@ApiResponse({
		status: 401,
		description: "Unauthorized"
	})
    @Get()
    getAll(){
        return this.activityLogService.getAllLogs()
    }

    @ApiResponse({
		status: 201,
		description: "Creates new log in database"
	})
    @Post()
    saveLog(@Body() log: ActivityLog) {
        this.activityLogService.saveLog(log)
    }
}
import { ReflectMetadata } from '@nestjs/common';

export const Roles = (role: string) => ReflectMetadata('role', role);
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PartnersModule } from './partners/partners.module';
import { ChatModule } from './chat/chat.module';
import { HealthModule } from './health/health.module';
import { validateEnv } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    PrismaModule,
    AuthModule,
    OrganizationsModule,
    PartnersModule,
    ChatModule,
    HealthModule,
  ],
})
export class AppModule {}

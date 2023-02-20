import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/ormconfig';
import { ConselhoModule } from './conselho/conselho.module';
import { EmailEnviadoModule } from './email-enviado/email-enviado.module';
import { EmailModule } from './email/email.module';
@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    ConselhoModule, 
    EmailModule, 
    EmailEnviadoModule,
    MailerModule.forRootAsync({
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get('MAIL_HOST'),
        secure: false,
        auth: {
          user: config.get('MAIL_USER'),
          pass: config.get('MAIL_PASS'),
        },
      },
      defaults: {
        from: `"No Reply" <${config.get('MAIL_FROM')}>`,
      }
    }),
    inject: [ConfigService],
  })
  ]
})
export class AppModule {}

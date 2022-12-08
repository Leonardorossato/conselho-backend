import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/ormconfig';
import { ConselhoModule } from './conselho/conselho.module';
import { EmailModule } from './email/email.module';
import { EmailEnviadoModule } from './email-enviado/email-enviado.module';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    ConselhoModule, 
    EmailModule, 
    EmailEnviadoModule,
    MailerModule.forRootAsync({
    useFactory: async (config: ConfigService): Promise<any> => ({
      transport: {
        host: config.get('MAIL_HOST'),
        secure: false,
        auth: {
          email: config.get('MAIL_EMAIL'),
          name: config.get('MAIL_NOME'),
        },
      },
      defaults: {
        from: `"No Reply" <${config.get('MAIL_FROM')}>`,
      },
      template: {
        dir: join(__dirname, './email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
    })
  ]
})
export class AppModule {}

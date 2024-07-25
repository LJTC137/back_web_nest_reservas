/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constans';
import { PayloadInterface } from '../payload.interface';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: Repository<UsuarioEntity>,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });
    }

    async validate(payload: PayloadInterface) {
        const { correo, identificacion } = payload
        const usuario = await this.authRepository.findOne({ where: [{ identificacion: identificacion }, { correo: correo }] });
        if(!usuario) return new UnauthorizedException(new MessageDto('Credenciales incorrectas'))
        return payload;
    }
}